import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../features/cart/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlistItems } = useSelector(
    state => state.wishlist
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map(item => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                onClick={() => navigate(`/products/${item.id}`)}
                className="
    h-48
    w-full
    object-contain
    cursor-pointer
  "
              />

              <h2 className="font-semibold mt-3 line-clamp-2">
                {item.title}
              </h2>

              <p className="font-bold mt-2">
                ₹{item.price}
              </p>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="
      flex-1
      bg-yellow-400
      text-black
      py-2
      rounded-lg
      font-semibold
    "
                >
                  Add To Cart
                </button>

                <button
                  onClick={() =>
                    dispatch(removeFromWishlist(item.id))
                  }
                  className="
      flex-1
      bg-red-500
      text-white
      py-2
      rounded-lg
    "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;