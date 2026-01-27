import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(15,175,98,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(237,29,36,0.05),transparent_50%)]"></div>
      
      <div className="container relative mx-auto px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Logo & Description - Spanning more columns */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center space-x-2 group mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                  ChowFast
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wider">
                  ON CHAIN
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Revolutionary blockchain-powered food delivery. Order snacks, pay with crypto, delivered fast on the Arbitrum network.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-400 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:hello@chowfast.io">hello@chowfast.io</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>+234 (0) 800 CHOW-FAST</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Careers</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Package Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Packages
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/budget"
                  className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Budget Packages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/middle"
                  className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Premium Packages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/category/bulk"
                  className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Bulk Packages</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Help Center</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Legal
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-gradient-to-r from-primary to-emerald-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Terms of Use</span>
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors text-sm inline-flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Cookie Policy</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-lg flex items-center justify-center transition-all hover:scale-110 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} ChowFast. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built on Arbitrum Blockchain
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
