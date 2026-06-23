import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../features/cart/cartSlice';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + tax;

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate API call for order placement
      setTimeout(() => {
        setIsSuccess(true);
        dispatch(clearCart());
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-50 min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100">
          <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Order Confirmed!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you for your purchase. We have received your order and will send you a confirmation email shortly.
          </p>
          <Link to="/" className="btn-primary inline-flex">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen py-12 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">Your cart is empty</h2>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Information</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`input-field ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`input-field ${errors.address ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="123 Main St"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`input-field ${errors.city ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                    <input 
                      type="text" 
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`input-field ${errors.state ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="NY"
                    />
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ZIP Code</label>
                    <input 
                      type="text" 
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className={`input-field ${errors.zip ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="10001"
                    />
                    {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                  </div>
                </div>

                <div className="pt-6">
                  <button type="submit" className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary/20">
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 p-1 border border-slate-100 rounded flex items-center justify-center">
                         <img src={item.image} alt={item.title} className="max-w-full max-h-full mix-blend-multiply" />
                      </div>
                      <div>
                        <p className="text-slate-800 font-medium line-clamp-1 max-w-[150px]">{item.title}</p>
                        <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600 border-b border-slate-100 pb-4">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-slate-900">Total</span>
                  <span className="text-xl font-black text-primary">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
