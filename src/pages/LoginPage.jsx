import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login, any email/password works
    // For admin role, use admin@example.com
    const user = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      role: email === 'admin@example.com' ? 'admin' : 'customer'
    };
    dispatch(login(user));
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-3 rounded-xl text-primary">
            <LogIn className="w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-center text-slate-500 mb-8 text-sm">Please sign in to your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field" 
              placeholder="you@example.com"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field" 
              placeholder="••••••••"
              required 
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-600">Remember me</label>
            </div>
            <a href="#" className="text-sm font-medium text-primary hover:text-indigo-500">Forgot password?</a>
          </div>
          <button type="submit" className="w-full btn-primary mt-2">Sign In</button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-indigo-500 transition-colors">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
