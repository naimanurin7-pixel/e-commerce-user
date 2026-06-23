import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  Heart,
  Menu,
  X,
  Search,
} from 'lucide-react';
import { logout } from '../features/auth/authSlice';


const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);

  const { totalItems } = useSelector((state) => state.cart);

  const { wishlistItems = [] } = useSelector(
    (state) => state.wishlist || {}
  );

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const updateSearchParam = (value) => {
    const params = new URLSearchParams(location.search);
    if (value) params.set('search', value);
    else params.delete('search');
    navigate({ pathname: '/products', search: params.toString() }, { replace: true });
  };

  const closeSearch = () => {
    setShowSearch(false);
    setSearchValue('');
    updateSearchParam('');
  };

  // Initialize search from query param
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('search') || '';
    setSearchValue(q);
  }, [location.search]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateSearchParam(searchValue);
    }, 300);

    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">

          {/* Left (hamburger on mobile, logo on desktop) */}
          <div className="w-1/3 flex items-center gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="md:hidden p-2 rounded-md text-slate-700 hover:text-primary"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>

              <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary transition-colors">
                LumiCart
              </span>
            </Link>
          </div>

          {/* Center */}
          <div className="w-1/3 flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                Home
              </Link>

              <Link
                to="/products"
                className="text-slate-600 hover:text-primary font-medium transition-colors"
              >
                Products
              </Link>
            </div>
          </div>

          {/* Right */}
          <div className="w-1/3 flex justify-end items-center gap-5">

            {/* Search Icon */}
            <div className="hidden md:flex items-center">
              {showSearch ? (
                <div className="relative w-full max-w-[320px] mr-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg py-2 pl-9 pr-10 text-sm"
                  />

                  <button
                    onClick={closeSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="text-slate-600 hover:text-primary"
                >
                  <Search className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Mobile Search */}
            {!showSearch && (
              <button
                onClick={() => setShowSearch(true)}
                className="md:hidden p-2 rounded-md text-slate-700 hover:text-primary"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative text-slate-600 hover:text-red-500 transition-colors"
            >
              <Heart className="w-6 h-6" />

              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-slate-600 hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative hidden md:block group">
                <button className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-medium">
                  <User className="w-5 h-5" />
                  <span>{user?.name}</span>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-800">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-primary font-medium transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-primary py-1.5 px-4 text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border border-slate-300 rounded-lg py-2 pl-9 pr-10 text-sm"
            />
            <button
              onClick={closeSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Drawer for mobile */}
      <div
        className={`fixed inset-0 z-[9999] ${drawerOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
      >
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={closeDrawer}
        />

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen w-[280px] bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>

              <span className="font-bold text-lg">
                LumiCart
              </span>
            </div>

            <button
              onClick={closeDrawer}
              className="p-2 text-slate-700 hover:text-red-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-3">

            <Link
              to="/"
              onClick={closeDrawer}
              className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={closeDrawer}
              className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Products
            </Link>

            <Link
              to="/wishlist"
              onClick={closeDrawer}
              className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              onClick={closeDrawer}
              className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Cart
            </Link>

            {isAuthenticated ? (
              <div className="border-t pt-4 mt-4">
                <p className="px-3 font-semibold text-slate-800">
                  {user?.name}
                </p>

                <button
                  onClick={() => {
                    handleLogout();
                    closeDrawer();
                  }}
                  className="w-full text-left mt-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t pt-4 mt-4 space-y-3">
                <Link
                  to="/login"
                  onClick={closeDrawer}
                  className="block px-3 py-3 rounded-lg text-slate-700 hover:bg-slate-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeDrawer}
                  className="block px-3 py-3 rounded-lg bg-primary text-white text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </aside>
      </div>
    </nav>
  );
};
export default Navbar;
