import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Settings, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useSelector(state => state.auth);

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-primary" /> Admin Panel
          </h2>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl font-medium transition-colors">
              <ShoppingBag className="w-5 h-5" /> Products
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl font-medium transition-colors">
              <Users className="w-5 h-5" /> Customers
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl font-medium transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user.name}</h1>
              <p className="text-slate-500">Here's what's happening with your store today.</p>
            </div>
            <Link to="/" className="btn-secondary">View Storefront</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-green-500 text-sm font-bold">+12.5%</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Total Revenue</h3>
              <p className="text-2xl font-black text-slate-900">$24,500.00</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-green-500 text-sm font-bold">+5.2%</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Total Orders</h3>
              <p className="text-2xl font-black text-slate-900">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Users className="w-6 h-6 text-pink-600" />
                </div>
                <span className="text-red-500 text-sm font-bold">-1.2%</span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">Active Customers</h3>
              <p className="text-2xl font-black text-slate-900">892</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 text-sm">
                    <th className="pb-3 font-medium">Order ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-50">
                    <td className="py-4 font-medium text-slate-900">#ORD-001</td>
                    <td className="py-4 text-slate-600">John Doe</td>
                    <td className="py-4 text-slate-500">Today, 2:30 PM</td>
                    <td className="py-4 font-bold text-slate-900">$120.00</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">Completed</span></td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-4 font-medium text-slate-900">#ORD-002</td>
                    <td className="py-4 text-slate-600">Jane Smith</td>
                    <td className="py-4 text-slate-500">Today, 1:15 PM</td>
                    <td className="py-4 font-bold text-slate-900">$450.50</td>
                    <td className="py-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-bold">Processing</span></td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium text-slate-900">#ORD-003</td>
                    <td className="py-4 text-slate-600">Michael Johnson</td>
                    <td className="py-4 text-slate-500">Yesterday</td>
                    <td className="py-4 font-bold text-slate-900">$85.00</td>
                    <td className="py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
