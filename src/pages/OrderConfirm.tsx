import { Link } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useCart } from '../hooks/useCart';

export default function OrderConfirm() {
  const { items, getTotalPrice } = useCart();

  // Generate placeholder order details
  const orderId = `ORD-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  const transactionHash = `0x${Math.random().toString(36).substring(2)}...${Math.random().toString(36).substring(2, 6)}`;
  const estimatedDelivery = '30-60 minutes';

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
            {/* Order Number */}
            <div className="text-center pb-6 border-b">
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-primary">{orderId}</p>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      {(item.product.price * item.quantity).toFixed(2)} XLM
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Paid</span>
                <span className="text-2xl font-bold text-primary">
                  {getTotalPrice().toFixed(5)} XLM
                </span>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction Hash</span>
                <span className="font-mono text-primary">{transactionHash}</span>
              </div>
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
          <Button variant="outline" className="flex-1" size="lg">
            View Order Details
          </Button>
        </div>
      </div>
    </div>
  );
}
