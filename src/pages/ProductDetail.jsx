import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById, clearSelectedProduct } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Truck, ShieldCheck } from 'lucide-react';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(state => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  if (loading || !selectedProduct) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-xl max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">Error</h3>
          <p>{error}</p>
          <Link to="/products" className="mt-4 inline-block btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add multiple items by iterating, or adapt addToCart to accept quantity. 
    // Since our cartSlice addToCart just increments or adds 1, we can add a payload with quantity if we modify it, 
    // but right now let's just dispatch multiple times for simplicity or modify the slice.
    // Actually, let's adapt it to use the `quantity` we want.
    // Let's loop for now since the slice only adds 1 if existing, or 1 if new. 
    // Actually, it's better to update the slice or just use updateQuantity.
    // I will pass quantity to cartSlice in a moment, but let's dispatch addToCart and then updateQuantity.
    dispatch(addToCart(selectedProduct));
    // If quantity > 1, we need to update it
    if (quantity > 1) {
       // Since addToCart creates or increments by 1, we can just call updateQuantity after a small delay 
       // but Redux is synchronous so we can't reliably know the total immediately without checking state.
       // Actually, we can just dispatch addToCart multiple times.
       for(let i=1; i<quantity; i++){
          dispatch(addToCart(selectedProduct));
       }
    }
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Section */}
          <div className="bg-slate-50 rounded-3xl p-8 flex items-center justify-center relative aspect-square lg:aspect-auto">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.title} 
              className="max-h-[500px] w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            <div className="text-sm text-primary font-bold tracking-widest uppercase mb-3">
              {selectedProduct.category}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4">
              {selectedProduct.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                <span className="font-bold text-yellow-700">{selectedProduct.rating?.rate}</span>
              </div>
              <span className="text-slate-500 text-sm">
                ({selectedProduct.rating?.count} reviews)
              </span>
            </div>

            <div className="text-4xl font-black text-slate-900 mb-6">
              ${selectedProduct.price.toFixed(2)}
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              {selectedProduct.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border-2 border-slate-200 rounded-xl h-14 w-full sm:w-32 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex-1 flex justify-center text-slate-500 hover:text-primary transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex-1 flex justify-center text-slate-500 hover:text-primary transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary h-14 text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            <div className="border-t border-slate-200 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Truck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">100% Secure Checkout</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
