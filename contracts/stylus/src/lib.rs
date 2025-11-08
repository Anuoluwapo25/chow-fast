//!
//! ChowFast Order Management Smart Contract
//!
//! Arbitrum Stylus implementation - Optimized for size
//! Core payment/refund logic identical to Solidity
//! Uses events for data retrieval (reduces contract size)
//!

#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
#![cfg_attr(not(any(test, feature = "export-abi")), no_std)]

#[macro_use]
extern crate alloc;

use alloc::string::String;
use alloc::vec::Vec;

use alloy_sol_types::sol;
use stylus_sdk::{
    alloy_primitives::{Address, U256, U8},
    contract,
    prelude::*,
};

// Constants
const TRANSACTION_FEE: U256 = U256::from_limbs([10000000000000u64, 0, 0, 0]); // 0.00001 ether
const FIVE_MINUTES: u64 = 300; // 300 seconds

// Order status enum
#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum OrderStatus {
    Pending = 0,
    Paid = 1,
    Confirmed = 2,
    Completed = 3,
    Cancelled = 4,
}

// Storage layout - minimal for size optimization
sol_storage! {
    #[entrypoint]
    pub struct ChowFastOrder {
        address owner;
        uint256 order_counter;

        // Core order data (no strings!)
        mapping(uint256 => address) order_buyers;
        mapping(uint256 => uint256) order_totals;
        mapping(uint256 => uint256) order_timestamps;
        mapping(uint256 => uint8) order_statuses;
    }
}

// Comprehensive events (store string data here)
sol! {
    event OrderCreated(
        uint256 indexed order_id,
        address indexed buyer,
        uint256 total,
        uint256 timestamp,
        string delivery_info,
        string[] product_ids,
        string[] product_names,
        uint256[] prices,
        uint256[] quantities
    );

    event OrderStatusUpdated(
        uint256 indexed order_id,
        uint8 new_status,
        uint256 timestamp
    );

    event PaymentReceived(
        uint256 indexed order_id,
        address indexed buyer,
        uint256 amount
    );

    event FundsWithdrawn(
        address indexed owner,
        uint256 amount
    );
}

#[public]
impl ChowFastOrder {
    /// Initialize contract
    pub fn init(&mut self) {
        if !self.owner.get().is_zero() {
            return;
        }
        self.owner.set(self.vm().msg_sender());
        self.order_counter.set(U256::ZERO);
    }

    /// Create order - IDENTICAL to Solidity functionality
    #[payable]
    pub fn create_order(
        &mut self,
        item_product_ids: Vec<String>,
        item_product_names: Vec<String>,
        item_prices: Vec<U256>,
        item_quantities: Vec<U256>,
        subtotal: U256,
        delivery_info: String,
    ) -> Result<U256, Vec<u8>> {
        // Validation
        if item_product_ids.is_empty() {
            return Err(b"No items".to_vec());
        }

        if item_product_ids.len() != item_product_names.len()
            || item_product_ids.len() != item_prices.len()
            || item_product_ids.len() != item_quantities.len()
        {
            return Err(b"Array length mismatch".to_vec());
        }

        if subtotal == U256::ZERO {
            return Err(b"Zero subtotal".to_vec());
        }

        if delivery_info.is_empty() {
            return Err(b"No delivery info".to_vec());
        }

        // Calculate total
        let total_amount = subtotal + TRANSACTION_FEE;

        if self.vm().msg_value() < total_amount {
            return Err(b"Insufficient payment".to_vec());
        }

        // Increment counter
        let mut counter = self.order_counter.get();
        counter += U256::from(1);
        self.order_counter.set(counter);
        let new_order_id = counter;

        // Store minimal data
        let sender = self.vm().msg_sender();
        let timestamp = U256::from(self.vm().block_timestamp());

        self.order_buyers.setter(new_order_id).set(sender);
        self.order_totals.setter(new_order_id).set(total_amount);
        self.order_timestamps.setter(new_order_id).set(timestamp);
        self.order_statuses.setter(new_order_id).set(U8::from(OrderStatus::Paid as u8));

        // Emit comprehensive event with ALL data
        log(self.vm(), OrderCreated {
            order_id: new_order_id,
            buyer: sender,
            total: total_amount,
            timestamp,
            delivery_info,
            product_ids: item_product_ids,
            product_names: item_product_names,
            prices: item_prices,
            quantities: item_quantities,
        });

        log(self.vm(), PaymentReceived {
            order_id: new_order_id,
            buyer: sender,
            amount: self.vm().msg_value(),
        });

        // Refund excess
        if self.vm().msg_value() > total_amount {
            let refund = self.vm().msg_value() - total_amount;
            self.vm().transfer_eth(sender, refund)?;
        }

        Ok(new_order_id)
    }

    /// Update status (owner only)
    pub fn update_order_status(&mut self, order_id: U256, new_status: U8) -> Result<(), Vec<u8>> {
        if self.vm().msg_sender() != self.owner.get() {
            return Err(b"Only owner".to_vec());
        }

        if order_id == U256::ZERO || order_id > self.order_counter.get() {
            return Err(b"Order not found".to_vec());
        }

        let current_status = self.order_statuses.get(order_id);
        if current_status == U8::from(OrderStatus::Cancelled as u8) {
            return Err(b"Cancelled".to_vec());
        }

        self.order_statuses.setter(order_id).set(new_status);

        log(self.vm(), OrderStatusUpdated {
            order_id,
            new_status: new_status.to(),
            timestamp: U256::from(self.vm().block_timestamp()),
        });

        Ok(())
    }

    /// Cancel order (buyer only, 5 min window) - IDENTICAL to Solidity
    pub fn cancel_order(&mut self, order_id: U256) -> Result<(), Vec<u8>> {
        if order_id == U256::ZERO || order_id > self.order_counter.get() {
            return Err(b"Order not found".to_vec());
        }

        let buyer = self.order_buyers.get(order_id);
        if self.vm().msg_sender() != buyer {
            return Err(b"Only buyer".to_vec());
        }

        let status = self.order_statuses.get(order_id);
        if status != U8::from(OrderStatus::Paid as u8) {
            return Err(b"Can only cancel paid".to_vec());
        }

        // Check 5 minute window
        let timestamp = self.order_timestamps.get(order_id);
        let current_time = U256::from(self.vm().block_timestamp());
        let time_diff = if current_time > timestamp {
            current_time - timestamp
        } else {
            U256::ZERO
        };

        if time_diff > U256::from(FIVE_MINUTES) {
            return Err(b"Time expired".to_vec());
        }

        // Update status
        self.order_statuses.setter(order_id).set(U8::from(OrderStatus::Cancelled as u8));

        // Refund
        let total = self.order_totals.get(order_id);
        self.vm().transfer_eth(buyer, total)?;

        log(self.vm(), OrderStatusUpdated {
            order_id,
            new_status: OrderStatus::Cancelled as u8,
            timestamp: current_time,
        });

        Ok(())
    }

    /// Withdraw balance (owner only)
    pub fn withdraw(&mut self) -> Result<(), Vec<u8>> {
        if self.vm().msg_sender() != self.owner.get() {
            return Err(b"Only owner".to_vec());
        }

        let balance = self.vm().balance(contract::address());
        if balance == U256::ZERO {
            return Err(b"No funds".to_vec());
        }

        let owner_addr = self.owner.get();
        self.vm().transfer_eth(owner_addr, balance)?;

        log(self.vm(), FundsWithdrawn {
            owner: owner_addr,
            amount: balance,
        });

        Ok(())
    }

    /// Transfer ownership
    pub fn transfer_ownership(&mut self, new_owner: Address) -> Result<(), Vec<u8>> {
        if self.vm().msg_sender() != self.owner.get() {
            return Err(b"Only owner".to_vec());
        }

        if new_owner.is_zero() {
            return Err(b"Invalid address".to_vec());
        }

        self.owner.set(new_owner);
        Ok(())
    }

    /// Get owner
    pub fn owner(&self) -> Address {
        self.owner.get()
    }

    /// Get order counter
    pub fn get_total_orders(&self) -> U256 {
        self.order_counter.get()
    }
}
