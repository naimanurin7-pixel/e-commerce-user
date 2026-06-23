import React from 'react';
import { Package, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="bg-primary p-1.5 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                LumiCart
              </span>
            </Link>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Your one-stop destination for premium products. Experience modern shopping with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Share2 className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 hover:text-primary text-sm transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-slate-500 hover:text-primary text-sm transition-colors">Products</Link></li>
              <li><Link to="/cart" className="text-slate-500 hover:text-primary text-sm transition-colors">Shopping Cart</Link></li>
              <li><Link to="/login" className="text-slate-500 hover:text-primary text-sm transition-colors">Login / Register</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <p className="text-slate-500 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input-field rounded-r-none border-r-0 focus:ring-0 focus:border-primary text-sm py-2"
                required
              />
              <button type="submit" className="bg-primary hover:bg-indigo-700 text-white px-4 rounded-r-lg transition-colors flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LumiCart. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-primary text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
