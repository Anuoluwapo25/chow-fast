import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useEffect, useState } from 'react';
import { TRANSACTION_FEE } from '../config/contracts';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderData {
  items: OrderItem[];
  total: number;
  timestamp: number;
}

export default function OrderConfirm() {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  // Get transaction hash from URL query parameter
  const transactionHash = searchParams.get('tx') || '';
  const estimatedDelivery = '30-60 minutes';

  useEffect(() => {
    // Load order data from localStorage
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      try {
        setOrderData(JSON.parse(savedOrder));
        // Clean up after loading
        localStorage.removeItem('lastOrder');
      } catch (error) {
        console.error('Failed to parse order data:', error);
      }
    }
    setLoading(false);
  }, []);

  // If no transaction hash and still loading, show loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  // If no transaction hash and no order data, show error
  if (!transactionHash || !orderData) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-center mb-8">
            <div className="h-24 w-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-4xl">!</span>
            </div>
            <h1 className="text-3xl font-bold mb-2 text-red-600">No Order Found</h1>
            <p className="text-gray-600 mb-6">
              This page can only be accessed after completing a purchase.
            </p>
            <Link to="/">
              <Button size="lg">Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { items, total } = orderData;

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <CheckCircle className="h-24 w-24 text-primary mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-6">
          <CardContent className="p-6 space-y-6">
            {/* Order Status */}
            <div className="text-center pb-6 border-b">
              <p className="text-sm text-gray-600 mb-1">Order Status</p>
              <p className="text-2xl font-bold text-primary">Confirmed on Arbitrum</p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {(item.price * item.quantity).toFixed(5)} ETH
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{total.toFixed(5)} ETH</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction Fee</span>
                <span className="font-semibold">{TRANSACTION_FEE} ETH</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="text-lg font-bold">Total Paid</span>
                <span className="text-2xl font-bold text-primary">
                  {(total + parseFloat(TRANSACTION_FEE)).toFixed(5)} ETH
                </span>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="border-t pt-4 space-y-3">
              {transactionHash && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transaction Hash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-primary break-all">{transactionHash}</span>
                  </div>
                  <a
                    href={`https://sepolia.arbiscan.io/tx/${transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    View on Arbiscan <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-semibold">{estimatedDelivery}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="bg-accent p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Your order is being prepared</li>
            <li>• You'll receive updates on your wallet</li>
            <li>• Delivery will arrive within the estimated time</li>
            <li>• Keep your transaction hash for reference</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <Link to={`/order/details?tx=${transactionHash}`} className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              View Order Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
