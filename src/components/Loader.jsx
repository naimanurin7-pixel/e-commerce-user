import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = true }) => {
  return (
    <div className={`flex justify-center items-center ${fullScreen ? 'min-h-[60vh]' : 'p-8'}`}>
      <Loader2 className="w-10 h-10 text-primary animate-spin" />
    </div>
  );
};

export default Loader;
