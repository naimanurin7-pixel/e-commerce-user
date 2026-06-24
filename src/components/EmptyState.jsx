import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState = ({ message = "No items found.", actionText = "Go to Products", actionLink = "/" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="bg-slate-100 p-6 rounded-full mb-6">
        <PackageOpen className="w-16 h-16 text-slate-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-2">{message}</h3>
      <p className="text-slate-500 mb-8 max-w-md">We couldn't find what you were looking for. Please try again or browse our products.</p>
      {actionLink && (
        <Link to={actionLink} className="btn-primary">
          {actionText}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
