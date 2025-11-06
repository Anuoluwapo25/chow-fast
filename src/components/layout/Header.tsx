import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Fast Snacks</span>
            <span className="text-2xl font-bold text-gray-900">On Chain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/category/budget"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Budget Packages
            </Link>
            <Link
              to="/category/middle"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Middle Packages
            </Link>
            <Link
              to="/category/bulk"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Bulk Packages
            </Link>
          </nav>

          {/* Cart & Wallet (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="default">Connect Wallet</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/budget"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Budget Packages
              </Link>
              <Link
                to="/category/middle"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Middle Packages
              </Link>
              <Link
                to="/category/bulk"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bulk Packages
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Button variant="default" className="w-full">
                Connect Wallet
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
