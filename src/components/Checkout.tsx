import { useState } from 'react';
import { CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useCart } from '../hooks/useCart';
import { useChowFastOrder } from '../hooks/contracts/useChowFastOrder';
import { Input } from './ui/input';
import { formatEthPrice } from '../utils/formatPrice';
import { TRANSACTION_FEE } from '../config/contracts';

interface CheckoutProps {
  onConfirm: (txHash: string) => void;
}

export default function Checkout({ onConfirm }: CheckoutProps) {
  const { items, getTotalPrice } = useCart();
  const { isConnected, address, error, createOrder } = useChowFastOrder();

  const [deliveryInfo, setDeliveryInfo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');

  const transactionFee = parseFloat(TRANSACTION_FEE);
  const total = getTotalPrice() + transactionFee;

  const handleConfirmPayment = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!deliveryInfo.trim()) {
      alert('Please enter your delivery information');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setSubmitting(true);
    setTxStatus('pending');

    try {
      // Prepare order items
      const orderItems = items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      // Create order on-chain using Stylus contract
      const result = await createOrder(orderItems, deliveryInfo);

      if (result.success) {
        setTxHash(result.transactionHash);
        setTxStatus('success');

        // Show success message for 2 seconds then call onConfirm
        setTimeout(() => {
          onConfirm(result.transactionHash);
        }, 2000);
      }
    } catch (err: any) {
      console.error('Error creating order:', err);
      setTxStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-primary">
                {formatEthPrice(item.product.price * item.quantity)} ETH
              </p>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">{formatEthPrice(getTotalPrice())} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction Fee</span>
              <span className="font-semibold">{formatEthPrice(transactionFee)} ETH</span>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold">Total</span>
            <span className="text-2xl font-bold text-primary">{formatEthPrice(total)} ETH</span>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Enter your delivery address, phone number, etc."
            value={deliveryInfo}
            onChange={(e) => setDeliveryInfo(e.target.value)}
            disabled={submitting}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-2">
            Example: 123 Main St, Lagos, Nigeria, +234-xxx-xxx-xxxx
          </p>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="h-6 w-6 text-primary" />
              
              <p className="font-semibold"> Wallet</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Connect your wallet to complete the payment. Supported wallets: Metamask.

            </p>

            {isConnected ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Wallet Connected</span>
                </div>
                <p className="text-xs text-gray-600">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            ) : (
              <appkit-button></appkit-button>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center">
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardContent>
      </Card>

      {/* Transaction Status */}
      {txStatus !== 'idle' && (
        <Card>
          <CardContent className="pt-6">
            {txStatus === 'pending' && (
              <div className="flex items-center gap-3 text-blue-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                <div>
                  <p className="font-semibold">Processing Transaction...</p>
                  <p className="text-sm text-gray-600">Please confirm in your wallet and wait for confirmation</p>
                </div>
              </div>
            )}

            {txStatus === 'success' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Order Created Successfully!</p>
                    <p className="text-sm text-gray-600">Transaction confirmed on Arbitrum via Stylus</p>
                  </div>
                </div>
                {txHash && (
                  <a
                    href={`https://sepolia.arbiscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline block"
                  >
                    View on Arbiscan →
                  </a>
                )}
              </div>
            )}

            {txStatus === 'error' && (
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Transaction Failed</p>
                  <p className="text-sm text-gray-600">{error || 'Please try again'}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Confirm Payment Button */}
      <Button
        size="lg"
        className="w-full"
        onClick={handleConfirmPayment}
        disabled={!isConnected || submitting || items.length === 0}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : !isConnected ? (
          'Connect Wallet to Continue'
        ) : (
          'Confirm Payment'
        )}
      </Button>
    </div>
  );
}
