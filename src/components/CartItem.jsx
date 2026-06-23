import React from 'react';
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { updateQuantity, removeFromCart } from '../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-slate-100 bg-white">
      <div className="w-24 h-24 flex-shrink-0 bg-white p-2 border border-slate-100 rounded-xl flex items-center justify-center">
        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
      </div>
      
      <div className="flex-grow text-center sm:text-left">
        <h4 className="text-slate-800 font-bold mb-1 line-clamp-2">{item.title}</h4>
        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors disabled:opacity-50"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium text-slate-800">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="w-24 text-right hidden sm:block">
          <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
        
        <button 
          onClick={handleRemove}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
