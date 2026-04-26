import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'COLLECTIONS', path: '/collections', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800' },
  { name: 'MEN', path: '/collections', img: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=800' },
  { name: 'WOMEN', path: '/collections', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800' },
  { name: 'ARCHIVE', path: '/archive', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800' },
  { name: 'ABOUT', path: '/about', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800' },
];

const infiniteCategories = [...categories, ...categories];

const CategoryTabScroll = () => {
  return (
    <section className="py-24 bg-surface-container-low overflow-hidden">
      <div className="px-6 md:px-margin-page mb-16">
        <h3 className="text-[10px] font-bold tracking-[0.5em] uppercase text-zinc-400">DISCOVER NOOR MART</h3>
      </div>
      
      <div className="relative">
        <motion.div 
          className="flex gap-12 w-max"
          animate={{
            x: [0, -1850],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {infiniteCategories.map((cat, i) => (
            <div
              key={`${cat.name}-${i}`}
              className="flex-shrink-0 w-[280px] md:w-[350px] group cursor-pointer"
            >
              <Link to={cat.path}>
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-stone-200">
                  <motion.img 
                    src={cat.img} 
                    alt={cat.name} 
                    animate={{
                      filter: ['grayscale(100%)', 'grayscale(0%)', 'grayscale(100%)'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                    className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryTabScroll;
