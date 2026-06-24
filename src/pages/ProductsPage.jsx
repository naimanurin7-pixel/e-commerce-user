import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { SlidersHorizontal, X } from 'lucide-react';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const location = useLocation();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  // Sync local state from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    const cat = params.get('category') || 'all';
    const sort = params.get('sort') || 'default';
    setSearchTerm(q);
    setSelectedCategory(cat);
    setSortOrder(sort);
  }, [location.search]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return ['all', ...Array.from(cats)];
  }, [items]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...items];

    // Search
    if (searchTerm) {
      result = result.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter
    if (selectedCategory !== 'all') {
      result = result.filter(item => item.category === selectedCategory);
    }

    // Sort
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [items, searchTerm, selectedCategory, sortOrder]);

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 text-red-500 p-6 rounded-xl max-w-md text-center">
          <h3 className="text-xl font-bold mb-2">Error Loading Products</h3>
          <p>{error}</p>
          <button onClick={() => dispatch(fetchProducts())} className="mt-4 btn-danger">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">All Products</h1>

          <div className="mb-4 md:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg shadow-sm"
            >
              {showFilters ? (
                <X className="w-5 h-5" />
              ) : (
                <SlidersHorizontal className="w-5 h-5" />
              )}

              {showFilters ? 'Close Filters' : 'Filters'}
            </button>
          </div>

          {/* Controls Bar */}
          {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-center justify-between"> */}

          {/* Search */}
          {/* <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchTerm}
                onChange={(e) => {
                  const v = e.target.value;
                  setSearchTerm(v);
                  const params = new URLSearchParams(location.search);
                  if (v) params.set('search', v);
                  else params.delete('search');
                  navigate({ pathname: '/products', search: params.toString() }, { replace: true });
                }}
                className="input-field pl-10 w-full"
              />
            </div> */}

          <div
            className={`
    ${showFilters ? 'flex' : 'hidden'}
    md:flex
    flex-col
    md:flex-row
    gap-4
    w-full
    md:w-auto
  `}
          >              {/* Category Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* <SlidersHorizontal className="w-5 h-5 text-slate-500 md:hidden" /> */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedCategory(value);
                  const params = new URLSearchParams(location.search);
                  if (value && value !== 'all') params.set('category', value);
                  else params.delete('category');
                  navigate({ pathname: '/products', search: params.toString() }, { replace: true });
                }}
                className="input-field py-2 capitalize w-full md:w-auto">

                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => {
                const value = e.target.value;
                setSortOrder(value);
                const params = new URLSearchParams(location.search);
                if (value && value !== 'default') params.set('sort', value);
                else params.delete('sort');
                navigate({ pathname: '/products', search: params.toString() }, { replace: true });
              }}
              className="input-field py-2 w-full md:w-auto">

              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <Loader />
      ) : filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          message="No products found matching your criteria"
          actionText="Clear Filters"
          actionLink={null}
        />
      )}
    </div>
    // </div>
  );
};

export default ProductsPage;
