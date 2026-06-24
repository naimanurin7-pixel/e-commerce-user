import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'


const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const featuredProducts = items.slice(0, 4);
  const heroImages = [image1, image2];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        prev => (prev + 1) % heroImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[650px] overflow-hidden">
        <img
          src={heroImages[currentSlide]}
          alt="Hero"
          className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      object-center
    transition-opacity
      duration-700
    "
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl text-white">

              <h1 className="text-5xl lg:text-7xl font-bold mb-3">
                Upgrade Your Lifestyle Today
              </h1>

              <p className="text-lg mb-8">
                Discover premium collections with
                seamless shopping experience.
              </p>

              <Link
                to="/products"
                className="
            bg-yellow-400
            text-black
            px-8
            py-3
            rounded-full
            font-bold
            hover:bg-yellow-300
            transition
          "
              >
                Shop Now
              </Link>

            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`
        w-3 h-3 rounded-full
        ${currentSlide === index
                  ? "bg-yellow-400"
                  : "bg-white/50"
                }
      `}
            />
          ))}
        </div>
      </section>
      {/* Benefits Section */}
      <section className="py-16 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-primary/10 p-4 rounded-full text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Free Shipping</h3>
                <p className="text-slate-500 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-secondary/10 p-4 rounded-full text-secondary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Secure Payment</h3>
                <p className="text-slate-500 text-sm">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="bg-indigo-100 p-4 rounded-full text-indigo-600">
                <RefreshCw className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Easy Returns</h3>
                <p className="text-slate-500 text-sm">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
              <p className="text-slate-500">Handpicked items just for you</p>
            </div>
            {/* <Link to="/products" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>

          {loading ? (
            <Loader fullScreen={false} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="btn-secondary inline-flex items-center gap-2">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div> */}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="
      bg-[#5b0e14]
      text-white
      px-8
      py-3
      rounded-lg
      font-semibold
      hover:bg-[#777872ff]
      transition-all
      duration-300
      flex items-center
      gap-2
    "
          >
            Explore More
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
