import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { ArrowRight, Trash2 } from 'lucide-react';

const CartPage = () => {
  const { items, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + tax;

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
          <EmptyState message="Your cart is currently empty" actionText="Start Shopping" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <button 
            onClick={() => dispatch(clearCart())}
            className="text-red-500 hover:text-red-600 flex items-center gap-2 font-medium mt-4 md:mt-0 transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 sm:p-8">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-black text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-primary py-4 text-lg flex justify-center items-center gap-2 shadow-lg shadow-primary/30"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="mt-4 text-center">
                <Link to="/products" className="text-sm text-slate-500 hover:text-primary transition-colors font-medium">
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;
