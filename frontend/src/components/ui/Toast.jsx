import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle className="text-emerald-500" size={18} />,
    error: <AlertCircle className="text-rose-500" size={18} />,
    info: <Info className="text-sky-500" size={18} />,
  };

  const bgColors = {
    success: 'bg-white',
    error: 'bg-white',
    info: 'bg-white',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 right-10 z-[1000] flex items-center gap-4 px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-100 bg-white min-w-[320px]"
        >
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="flex-grow">
            <p className="text-[11px] font-bold tracking-[0.2em] text-zinc-900 uppercase">
              {type === 'error' ? 'Attention' : 'Noor Mart'}
            </p>
            <p className="text-[10px] text-zinc-500 tracking-wider mt-1 uppercase">
              {message}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors ml-4"
          >
            <X size={14} />
          </button>
          
          {/* Progress Bar */}
          <motion.div 
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            className={`absolute bottom-0 left-0 right-0 h-[2px] origin-left ${
              type === 'success' ? 'bg-emerald-500' : 
              type === 'error' ? 'bg-rose-500' : 'bg-sky-500'
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
