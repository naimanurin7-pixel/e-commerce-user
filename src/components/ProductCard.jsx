import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { addToCart } from '../features/cart/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../features/cart/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { wishlistItems = [] } = useSelector(
    (state) => state.wishlist || {}
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (exists) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const isWishlisted = wishlistItems.find(
    (item) => item.id === product.id
  );

  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-[220px] mx-auto h-full"
    >
      {/* Image */}
      <div className="relative h-44 p-3 bg-white flex items-center justify-center border-b border-slate-100">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-white shadow-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-semibold">
            {product.rating?.rate}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        {/* Category */}
        <p className="text-[10px] uppercase font-semibold text-primary mb-1 tracking-wide">
          {product.category}
        </p>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 leading-tight">
          {product.title}
        </h3>

        {/* Bottom */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </span>

          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={handleToggleWishlist}
              className="p-1.5 rounded-full border border-slate-200 hover:bg-red-50 transition"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted
                    ? 'fill-red-500 text-red-500'
                    : 'text-slate-600'
                }`}
              />
            </button>

            {/* Cart */}
            <button
              onClick={handleAddToCart}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-primary hover:text-white transition"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;