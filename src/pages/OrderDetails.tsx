import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ExternalLink, Clock, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useChowFastOrder } from '../hooks/contracts/useChowFastOrder';
import { ARBITRUM_SEPOLIA } from '../config/contracts';
import { formatEther } from 'ethers';

interface OrderItem {
  productId: string;
  productName: string;
  price: string;
  quantity: number;
}

interface OrderData {
  orderId: string;
  buyer: string;
  total: string;
  timestamp: number;
  deliveryInfo: string;
  items: OrderItem[];
}

export default function OrderDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getOrderByTxHash } = useChowFastOrder();

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const txHash = searchParams.get('tx') || '';

  useEffect(() => {
    if (!txHash) {
      setError('No transaction hash provided');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getOrderByTxHash(txHash);
        setOrderData(data);
      } catch (err: any) {
        console.error('Failed to fetch order:', err);
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [txHash, getOrderByTxHash]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-gray-600">Loading order details from blockchain...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Failed to Load Order</h2>
                <p className="text-gray-600 mb-6">{error || 'Order not found'}</p>
                <div className="flex gap-4">
                  <Button onClick={() => navigate('/')}>Go Home</Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const orderDate = new Date(orderData.timestamp * 1000);
  const totalInEth = formatEther(orderData.total);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h1 className="text-3xl font-bold">Order Details</h1>
          </div>
          <p className="text-gray-600">Order #{orderData.orderId}</p>
        </div>

        {/* Order Status Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Transaction Hash</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono break-all">
                    {txHash}
                  </code>
                  <a
                    href={`${ARBITRUM_SEPOLIA.explorerUrl}/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Buyer Address</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                  {orderData.buyer.slice(0, 6)}...{orderData.buyer.slice(-4)}
                </code>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{orderDate.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed on Arbitrum
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">{orderData.deliveryInfo}</p>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderData.items.map((item, index) => {
                const itemPriceInEth = formatEther(item.price);
                const itemTotal = parseFloat(itemPriceInEth) * item.quantity;

                return (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600">
                          {itemPriceInEth} ETH × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">{itemTotal.toFixed(5)} ETH</p>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total Paid</span>
                <span className="text-2xl font-bold text-primary">{totalInEth} ETH</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="bg-accent p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Order Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• This order is permanently recorded on the Arbitrum blockchain</li>
            <li>• Transaction fees are included in the total amount</li>
            <li>• Estimated delivery: 30-60 minutes</li>
            <li>• You can cancel within 5 minutes of placement</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <Button className="w-full" size="lg">
              Continue Shopping
            </Button>
          </Link>
          <a
            href={`${ARBITRUM_SEPOLIA.explorerUrl}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" className="w-full" size="lg">
              View on Arbiscan
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
