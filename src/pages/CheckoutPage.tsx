import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Checkout from '../components/Checkout';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();

  const handleOrderConfirm = (txHash: string) => {
    // Store order data before clearing cart
    const orderData = {
      items: items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
      timestamp: Date.now(),
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderData));

    // Clear the cart after successful order
    clearCart();

    // Navigate to confirmation page with transaction hash
    navigate(`/order/confirm?tx=${txHash}`);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="max-w-4xl mx-auto">
        <Checkout onConfirm={handleOrderConfirm} />
      </div>
    </div>
  );
}
