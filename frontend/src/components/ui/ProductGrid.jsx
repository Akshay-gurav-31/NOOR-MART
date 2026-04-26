import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ProductSkeleton } from './Skeleton';

const API_BASE_URL = 'http://localhost:5000/api';

const ProductGrid = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Ensure it starts as true
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        // Artificial delay for 'Proper' skeleton visibility
        setTimeout(() => {
          setProducts(response.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const name = (p.name || '').toUpperCase();
    const category = (p.category || '').toUpperCase();
    const gender = (p.gender || '').toUpperCase();

    if (filter === 'ALL') return true;
    if (filter === 'MEN') return gender === 'MEN' || name.includes('SHERWANI') || name.includes('KURTA') || name.includes('MEN');
    if (filter === 'WOMEN') return gender === 'WOMEN' || name.includes('SAREE') || name.includes('ANARKALI') || name.includes('WOMEN') || category === 'DRESS';
    if (filter === 'DRESSES') return category === 'DRESS' || name.includes('DRESS');
    return true;
  });

  if (loading) return (
    <section className="py-24 px-6 md:px-margin-page max-w-[1920px] mx-auto bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
        {[...Array(8)].map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </section>
  );

  return (
    <section id="collection" className="py-24 px-6 md:px-margin-page max-w-[1920px] mx-auto bg-surface">
      <div className="mb-24 border-b border-stone-200 pb-12">
        <h2 className="text-4xl font-light tracking-[0.1em] text-primary uppercase">The Collection</h2>
        <p className="text-[10px] text-zinc-400 uppercase tracking-[0.3em] mt-2 italic">Browse our latest fashion collection.</p>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20"
      >
        <AnimatePresence mode='popLayout'>
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.05 
              }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-8 bg-stone-100">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-110 ${index % 2 === 0 ? 'animate-breathing' : 'animate-breathing-delayed'}`}
                />
                
                {/* Overlay with Quick Add */}
                <div className="absolute inset-0 bg-black/10 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-700 ease-out">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-white text-black py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-black hover:text-white transition-all duration-500 shadow-2xl"
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-light tracking-wide text-primary uppercase">{product.name}</h3>
                  <span className="text-lg font-light text-primary">₹{product.price}</span>
                </div>
                <p className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-medium">{product.category} • {product.gender}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center text-[10px] text-zinc-400 uppercase tracking-[0.4em]">
          No pieces found in this selection.
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
