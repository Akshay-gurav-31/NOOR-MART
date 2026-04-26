import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = ({ isOpen, onClose, cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] glass z-[70] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Your Atelier</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                  <ShoppingBag size={64} className="mb-6" />
                  <p className="text-lg uppercase tracking-widest">Your collection is empty</p>
                  <button 
                    onClick={onClose}
                    className="mt-8 text-sm border-b border-primary/50 pb-1 hover:border-primary transition-colors text-primary"
                  >
                    Discover Pieces
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cartItems.map((item, index) => (
                    <motion.div 
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex space-x-6"
                    >
                      <div className="w-24 h-32 flex-shrink-0">
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium uppercase tracking-wider">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-white/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-white/50 mt-1 uppercase tracking-widest">{item.category}</p>
                        <p className="mt-4 font-bold text-primary">₹{item.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-black/40">
                <div className="flex justify-between items-end mb-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">Subtotal</p>
                  <p className="text-3xl font-bold text-primary">₹{total.toFixed(2)}</p>
                </div>
                <button className="w-full py-5 gold-gradient text-black font-bold uppercase tracking-[0.2em] text-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
