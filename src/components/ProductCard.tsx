import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';



interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <Card className="overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Product Image */}
      <div className="aspect-square bg-accent flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{product.name}</CardTitle>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{product.price}</span>
          <span className="text-sm text-gray-600">ETH</span>
        </div>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Items Included */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
            <ul className="space-y-1">
              {product.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
