import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-[70vh] md:h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-[center_top] vignette" 
        style={{ backgroundImage: "url('/home.png')" }}
      />
      <div className="absolute inset-0 bg-black/5" />
      
      <div className="relative z-10 text-center max-w-4xl px-6">

        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-white text-6xl md:text-8xl font-light tracking-[0.2em] mb-10 uppercase"
        >
          Premium Clothing
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-zinc-300 text-lg md:text-xl font-light italic max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Shop the latest luxury clothing for men and women. Simple, elegant, and perfectly tailored.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col md:flex-row justify-center gap-8"
        >
          <a href="#collection" className="bg-white text-black px-12 py-5 text-[11px] font-bold tracking-[0.3em] hover:bg-secondary hover:text-white transition-all duration-500 uppercase text-center">
            Explore Collection
          </a>
          <a href="#about" className="border border-white/30 text-white px-12 py-5 text-[11px] font-bold tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 uppercase text-center">
            View The Edit
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
