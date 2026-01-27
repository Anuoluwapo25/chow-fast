import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Check, Zap, Shield, DollarSign, CreditCard, Users, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES } from '../constants/products';

import heroImage1 from '../assets/images/order.jpeg';
import heroImage2 from '../assets/images/order2.jpeg';
import heroImage3 from '../assets/images/delivery.jpeg';
import OrderImage from '../assets/images/order2.jpeg';



export default function Home() {
  const featuredProducts = [
    ...PRODUCTS.filter(p => p.category === 'budget').slice(0, 2),
    ...PRODUCTS.filter(p => p.category === 'middle').slice(0, 2),
    ...PRODUCTS.filter(p => p.category === 'bulk').slice(0, 2),
  ];

  const images = [heroImage1, heroImage2, heroImage3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section - Premium Design */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(15,175,98,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(237,29,36,0.05),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        
        <div className="container relative mx-auto px-4 md:px-8 lg:px-16 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-gray-700">Trusted by 10,000+ customers</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary to-emerald-600 bg-clip-text text-transparent">
                  Fast Snacks
                </span>
                <br />
                <span className="text-gray-900">On Chain</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-xl">
                Experience the future of food delivery. Order snacks, pay with crypto, delivered fast on the <span className="font-semibold text-primary">Arbitrum</span> blockchain.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">30min</div>
                  <div className="text-sm text-gray-600">Avg. Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">10k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/category/budget">
                  <Button size="lg" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all group">
                    Browse Packages
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  How It Works
                </Button>
              </div>
            </div>

            {/* Image Carousel - Enhanced */}
            <div className="flex items-center justify-center">
              <div className="relative h-[500px] w-full max-w-[500px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentImageIndex
                        ? 'opacity-100 translate-y-0 scale-100 z-10'
                        : index < currentImageIndex
                        ? 'opacity-0 -translate-y-10 scale-95'
                        : 'opacity-0 translate-y-10 scale-95'
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
                      <img
                        src={image}
                        alt={`Premium Snack Package ${index + 1}`}
                        className="relative h-96 w-96 object-cover rounded-3xl shadow-2xl border-4 border-white mx-auto ring-4 ring-primary/10"
                      />
                    </div>
                  </div>
                ))}
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-gray-900">Blockchain Secured</p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-gray-900">Lightning Fast</p>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-gray-900">Premium Quality</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-semibold text-gray-900">10k+ Customers</p>
            </div>
          </div>
        </div>
    </section>

      {/* How It Works Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Getting your favorite snacks delivered is as easy as 1-2-3. We've streamlined the process for your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  1
                </div>
                <Package className="h-16 w-16 text-primary mx-auto mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Browse Packages</h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore our curated selection from budget-friendly options to premium bulk packages for events
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  2
                </div>
                <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Add to Cart</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select your desired packages, customize quantities, and review your order before checkout
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                  3
                </div>
                <Check className="h-16 w-16 text-primary mx-auto mb-6 mt-4" />
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Pay & Confirm</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete payment securely with ETH and receive instant blockchain-verified confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Packages</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Choose Your Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tailored packages for every budget and occasion. From individual treats to event catering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Budget Category */}
            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-primary transition-colors">
                  {CATEGORIES.budget.title}
                </CardTitle>
                <CardDescription className="text-base">{CATEGORIES.budget.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="text-3xl font-bold text-gray-900">{CATEGORIES.budget.priceRange}</p>
                  <span className="text-sm text-gray-500">per package</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {PRODUCTS.filter(p => p.category === 'budget').slice(0, 2).map(p => (
                    <li key={p.id} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{p.name}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/category/budget">
                  <Button className="w-full group-hover:shadow-lg transition-all">
                    View All Packages
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Middle Category - Featured */}
            <Card className="relative overflow-hidden border-2 border-primary shadow-xl hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2">
              <div className="absolute top-0 right-0 bg-gradient-to-br from-primary to-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                POPULAR
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-primary transition-colors">
                  {CATEGORIES.middle.title}
                </CardTitle>
                <CardDescription className="text-base">{CATEGORIES.middle.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="text-3xl font-bold text-gray-900">{CATEGORIES.middle.priceRange}</p>
                  <span className="text-sm text-gray-500">per package</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {PRODUCTS.filter(p => p.category === 'middle').slice(0, 2).map(p => (
                    <li key={p.id} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{p.name}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/category/middle">
                  <Button className="w-full group-hover:shadow-lg transition-all">
                    View All Packages
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Bulk Category */}
            <Card className="relative overflow-hidden border-2 border-gray-100 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="relative">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-red-500 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-primary transition-colors">
                  {CATEGORIES.bulk.title}
                </CardTitle>
                <CardDescription className="text-base">{CATEGORIES.bulk.description}</CardDescription>
                <div className="flex items-baseline gap-2 mt-4">
                  <p className="text-3xl font-bold text-gray-900">{CATEGORIES.bulk.priceRange}</p>
                  <span className="text-sm text-gray-500">per package</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {PRODUCTS.filter(p => p.category === 'bulk').slice(0, 2).map(p => (
                    <li key={p.id} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{p.name}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/category/bulk">
                  <Button className="w-full group-hover:shadow-lg transition-all">
                    View All Packages
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Best Sellers</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Popular Packages</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers. Check out our most loved snack packages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/category/budget">
              <Button size="lg" className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all group">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Advantages</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose ChowFast</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the benefits of blockchain-powered food delivery with enterprise-grade service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50 p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Average 30-minute delivery with real-time tracking and instant notifications.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50 p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Blockchain Secure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every transaction secured and verified on the Arbitrum blockchain network.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50 p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <DollarSign className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Low Fees</h3>
                <p className="text-gray-600 leading-relaxed">
                  Save with minimal transaction fees and competitive pricing on all packages.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50 p-8 rounded-2xl h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Seamless Payment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quick wallet integration with one-click checkout for hassle-free payments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Support</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about our service and ordering process.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-2xl border-2 border-gray-100 px-8 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-primary">
                  How do I place an order?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Simply browse our packages, add items to your cart, connect your ETH wallet, and confirm your payment. 
                  The entire process takes less than 2 minutes, and you'll receive instant confirmation on the blockchain.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-2xl border-2 border-gray-100 px-8 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-primary">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  We accept payments in ETH through your Arbitrum-compatible wallet like MetaMask, Rainbow, or WalletConnect. 
                  All transactions are processed securely on the Arbitrum network with minimal gas fees.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-2xl border-2 border-gray-100 px-8 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-primary">
                  How long does delivery take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Most orders are delivered within 30-60 minutes depending on your location and the package size. 
                  You'll receive real-time updates and can track your order through our platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-2xl border-2 border-gray-100 px-8 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-primary">
                  Are the prices in ETH or Naira?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  All prices are displayed in ETH. The ETH amount is equivalent to the Naira value at current exchange rates, 
                  updated in real-time to ensure fair and transparent pricing.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-2xl border-2 border-gray-100 px-8 shadow-sm hover:shadow-md transition-all">
                <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-primary">
                  Can I cancel my order?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  Orders can be cancelled within 5 minutes of placement through your order dashboard. 
                  After that, the order is already being prepared for delivery. Refunds are processed automatically to your wallet.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Call to Action Section - Enhanced */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-emerald-600 to-primary"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        <div className="container relative mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Content */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-3xl blur-2xl"></div>
                <img 
                  src={OrderImage} 
                  alt="Delicious snacks ready for order" 
                  className="relative rounded-2xl shadow-2xl max-w-full h-auto max-h-96 object-cover ring-4 ring-white/20"
                />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="text-center lg:text-left order-1 lg:order-2 text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Ready to Order?
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0 text-white/90 leading-relaxed">
                Start enjoying fast, secure, and delicious snack delivery today. 
                Join 10,000+ satisfied customers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/category/budget">
                  <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-50 border-0 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group">
                    Browse Packages
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white/10 text-lg px-8 py-6">
                  Learn More
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 text-white/90">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span className="text-sm">Instant Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span className="text-sm">Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
