import { useState, useCallback } from 'react';
import { BrowserProvider, Contract, parseEther } from 'ethers';
import { useAppKitAccount, useAppKitProvider } from '@reown/appkit/react';
import { CHOW_FAST_CONTRACT, TRANSACTION_FEE } from '../../config/contracts';

export function useChowFastOrder() {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider('eip155');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Get contract instance with signer
   */
  const getContract = useCallback(async () => {
    if (!walletProvider) {
      throw new Error('Wallet not connected');
    }

    const ethersProvider = new BrowserProvider(walletProvider as any);
    const signer = await ethersProvider.getSigner();

    return new Contract(
      CHOW_FAST_CONTRACT.address,
      CHOW_FAST_CONTRACT.abi,
      signer
    );
  }, [walletProvider]);

  /**
   * Get contract instance without signer (for read-only operations)
   */
  const getReadOnlyContract = useCallback(async () => {
    if (!walletProvider) {
      throw new Error('Wallet not connected');
    }

    const ethersProvider = new BrowserProvider(walletProvider as any);

    return new Contract(
      CHOW_FAST_CONTRACT.address,
      CHOW_FAST_CONTRACT.abi,
      ethersProvider
    );
  }, [walletProvider]);

  /**
   * Create an order on-chain using Stylus contract
   * Note: Stylus contract uses separate arrays instead of array of structs
   */
  const createOrder = useCallback(async (
    items: Array<{ productId: string; productName: string; price: number; quantity: number }>,
    deliveryInfo: string
  ) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    setError(null);

    try {
      // Separate arrays for Stylus contract
      const productIds: string[] = [];
      const productNames: string[] = [];
      const prices: bigint[] = [];
      const quantities: bigint[] = [];

      // Calculate subtotal
      let subtotal = 0n;

      items.forEach(item => {
        productIds.push(item.productId);
        productNames.push(item.productName);
        const itemPrice = parseEther(item.price.toString());
        const itemQuantity = BigInt(item.quantity);
        prices.push(itemPrice);
        quantities.push(itemQuantity);
        subtotal += itemPrice * itemQuantity;
      });

      // Calculate total (subtotal + transaction fee)
      const fee = parseEther(TRANSACTION_FEE);
      const total = subtotal + fee;

      // Get contract instance
      const contract = await getContract();

      // Send transaction with separate arrays (Stylus contract signature)
      const tx = await contract.create_order(
        productIds,
        productNames,
        prices,
        quantities,
        subtotal,
        deliveryInfo,
        {
          value: total,
        }
      );

      console.log('Transaction sent:', tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed:', receipt);

      setLoading(false);
      return {
        success: true,
        transactionHash: tx.hash,
        receipt,
      };
    } catch (err: any) {
      console.error('Error creating order:', err);
      const errorMessage = err.reason || err.message || 'Failed to create order';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  }, [isConnected, address, getContract]);

  /**
   * Get order details by ID
   */
  const getOrder = useCallback(async (orderId: number) => {
    try {
      const contract = await getReadOnlyContract();
      const order = await contract.get_order(orderId);

      // Stylus contract returns tuple: (buyer, subtotal, transactionFee, total, timestamp, status, deliveryInfo, itemCount)
      return {
        orderId: orderId.toString(),
        buyer: order[0],
        subtotal: order[1].toString(),
        transactionFee: order[2].toString(),
        total: order[3].toString(),
        timestamp: Number(order[4]),
        status: Number(order[5]),
        deliveryInfo: order[6],
        itemCount: Number(order[7]),
      };
    } catch (err: any) {
      console.error('Error getting order:', err);
      throw new Error(err.message || 'Failed to get order');
    }
  }, [getReadOnlyContract]);

  /**
   * Get all orders for current user
   */
  const getUserOrders = useCallback(async () => {
    if (!isConnected || !address) {
      return [];
    }

    try {
      const contract = await getReadOnlyContract();
      const orderIds = await contract.get_user_orders(address);
      return orderIds.map((id: bigint) => Number(id));
    } catch (err: any) {
      console.error('Error getting user orders:', err);
      throw new Error(err.message || 'Failed to get user orders');
    }
  }, [isConnected, address, getReadOnlyContract]);

  /**
   * Cancel an order (within 5 minutes)
   */
  const cancelOrder = useCallback(async (orderId: number) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setLoading(true);
    setError(null);

    try {
      const contract = await getContract();
      const tx = await contract.cancel_order(orderId);

      console.log('Cancel transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Order cancelled:', receipt);

      setLoading(false);
      return {
        success: true,
        transactionHash: tx.hash,
        receipt,
      };
    } catch (err: any) {
      console.error('Error cancelling order:', err);
      const errorMessage = err.reason || err.message || 'Failed to cancel order';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  }, [isConnected, address, getContract]);

  /**
   * Get contract transaction fee
   */
  const getTransactionFee = useCallback(async () => {
    try {
      const contract = await getReadOnlyContract();
      const fee = await contract.get_transaction_fee();
      return fee.toString();
    } catch (err: any) {
      console.error('Error getting transaction fee:', err);
      return parseEther(TRANSACTION_FEE).toString();
    }
  }, [getReadOnlyContract]);

  return {
    // State
    loading,
    error,
    isConnected,
    address,

    // Functions
    createOrder,
    getOrder,
    getUserOrders,
    cancelOrder,
    getTransactionFee,
  };
}
