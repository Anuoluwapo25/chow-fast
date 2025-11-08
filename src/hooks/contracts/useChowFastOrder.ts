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
      const tx = await contract.createOrder(
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
   * Get order details by transaction hash
   * Fetches the OrderCreated event from the transaction receipt
   */
  const getOrderByTxHash = useCallback(async (txHash: string) => {
    try {
      const contract = await getReadOnlyContract();
      const provider = contract.runner?.provider;

      if (!provider) {
        throw new Error('Provider not available');
      }

      // Get transaction receipt
      const receipt = await provider.getTransactionReceipt(txHash);

      if (!receipt) {
        throw new Error('Transaction not found');
      }

      // Parse logs to find OrderCreated event
      const orderCreatedEvent = receipt.logs
        .map(log => {
          try {
            return contract.interface.parseLog({
              topics: [...log.topics],
              data: log.data
            });
          } catch {
            return null;
          }
        })
        .find(event => event?.name === 'OrderCreated');

      if (!orderCreatedEvent) {
        throw new Error('OrderCreated event not found in transaction');
      }

      // Extract order data from event
      const args = orderCreatedEvent.args;

      return {
        orderId: args.order_id.toString(),
        buyer: args.buyer,
        total: args.total.toString(),
        timestamp: Number(args.timestamp),
        deliveryInfo: args.delivery_info,
        items: args.product_ids.map((id: string, index: number) => ({
          productId: id,
          productName: args.product_names[index],
          price: args.prices[index].toString(),
          quantity: Number(args.quantities[index]),
        })),
      };
    } catch (err: any) {
      console.error('Error fetching order:', err);
      throw new Error(err.message || 'Failed to fetch order details');
    }
  }, [getReadOnlyContract]);

  /**
   * Get all orders for current user
   * NOTE: Simplified Stylus contract doesn't have getUserOrders function
   * Filter OrderCreated events by buyer address instead
   */
  const getUserOrders = useCallback(async () => {
    console.warn('getUserOrders not available in simplified contract. Filter events instead.');
    return [];
  }, []);

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
      const tx = await contract.cancelOrder(orderId);

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
   * NOTE: Simplified contract doesn't have getTransactionFee function
   * Returns hardcoded value from config
   */
  const getTransactionFee = useCallback(async () => {
    return parseEther(TRANSACTION_FEE).toString();
  }, []);

  return {
    // State
    loading,
    error,
    isConnected,
    address,

    // Functions
    createOrder,
    getOrderByTxHash,
    cancelOrder,
    getTransactionFee,
  };
}
