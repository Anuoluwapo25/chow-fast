// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingCart, Menu, X } from 'lucide-react';
// import { Button } from '../ui/button';
// import { useCart } from '../../hooks/useCart';

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { getTotalItems } = useCart();
//   const totalItems = getTotalItems();

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
//       <div className="container mx-auto px-4 md:px-8 lg:px-16">
//         <div className="flex items-center justify-between h-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <span className="text-2xl font-bold text-primary">Chow Fast</span>
//             <span className="text-2xl font-bold text-gray-900"></span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8">
//             <Link
//               to="/"
//               className="text-gray-700 hover:text-primary font-medium transition-colors"
//             >
//               Home
//             </Link>
//             <Link
//               to="/category/budget"
//               className="text-gray-700 hover:text-primary font-medium transition-colors"
//             >
//               Budget Packages
//             </Link>
//             <Link
//               to="/category/middle"
//               className="text-gray-700 hover:text-primary font-medium transition-colors"
//             >
//               Middle Packages
//             </Link>
//             <Link
//               to="/category/bulk"
//               className="text-gray-700 hover:text-primary font-medium transition-colors"
//             >
//               Bulk Packages
//             </Link>
//           </nav>

//           {/* Cart & Wallet (Desktop) */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <Link to="/cart" className="relative">
//               <Button variant="ghost" size="icon">
//                 <ShoppingCart className="h-5 w-5" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
//                     {totalItems}
//                   </span>
//                 )}
//               </Button>
//             </Link>
//             <Button variant="default">Connect Wallet</Button>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="lg:hidden p-2"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             {mobileMenuOpen ? (
//               <X className="h-6 w-6 text-gray-900" />
//             ) : (
//               <Menu className="h-6 w-6 text-gray-900" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="lg:hidden py-4 border-t border-gray-200">
//             <nav className="flex flex-col space-y-4">
//               <Link
//                 to="/"
//                 className="text-gray-700 hover:text-primary font-medium transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </Link>
//               <Link
//                 to="/category/budget"
//                 className="text-gray-700 hover:text-primary font-medium transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Budget Packages
//               </Link>
//               <Link
//                 to="/category/middle"
//                 className="text-gray-700 hover:text-primary font-medium transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Middle Packages
//               </Link>
//               <Link
//                 to="/category/bulk"
//                 className="text-gray-700 hover:text-primary font-medium transition-colors"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Bulk Packages
//               </Link>
//               <Link
//                 to="/cart"
//                 className="text-gray-700 hover:text-primary font-medium transition-colors flex items-center"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 <ShoppingCart className="h-5 w-5 mr-2" />
//                 Cart {totalItems > 0 && `(${totalItems})`}
//               </Link>
//               <Button variant="default" className="w-full">
//                 Connect Wallet
//               </Button>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../../hooks/useCart';
import WalletConnect from '../WalletConnect';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                ChowFast
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wider">
                ON CHAIN
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/category/budget"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/category/budget') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Budget
            </Link>
            <Link
              to="/category/middle"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/category/middle') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Premium
            </Link>
            <Link
              to="/category/bulk"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/category/bulk') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Bulk
            </Link>
          </nav>

          {/* Cart & Wallet (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/cart" className="relative group">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-gray-100 transition-all"
              >
                <ShoppingCart className="h-5 w-5 text-gray-700 group-hover:text-primary transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-br from-secondary to-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <WalletConnect />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
          <div className="lg:hidden py-6 border-t border-gray-200 animate-fade-in">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/budget"
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/category/budget') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Budget Packages
              </Link>
              <Link
                to="/category/middle"
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/category/middle') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Premium Packages
              </Link>
              <Link
                to="/category/bulk"
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive('/category/bulk') 
                    ? 'text-primary bg-primary/10' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Bulk Packages
              </Link>
              <Link
                to="/cart"
                className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-all flex items-center justify-between"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart
                </span>
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs font-bold rounded-full px-2 py-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              <div className="pt-4">
                <WalletConnect />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}