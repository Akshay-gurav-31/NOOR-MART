import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GallerySkeleton } from '../components/ui/Skeleton';

const galleryItems = [
  { id: 8, title: 'Velvet Noir', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2000' },
  { id: 1, title: 'Obsidian Drape', img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000' },
  { id: 2, title: 'Ivory Structure', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000' },
  { id: 3, title: 'Midnight Silk', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=2000' },
  { id: 4, title: 'Desert Rose', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2000' },
  { id: 5, title: 'Architectural Shadow', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000' },
  { id: 6, title: 'Fluid Geometry', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2000' },
  { id: 7, title: 'Urban Nomad', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2000' },
  { id: 9, title: 'Modern Heirloom', img: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2000' },
  { id: 10, title: 'The Silent Edit', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000' },
  { id: 11, title: 'Ethereal Weave', img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=2000' },
  { id: 12, title: 'Monolith Noir', img: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=2000' }
];

const Gallery = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <GallerySkeleton />;

  return (
    <div className="pt-32 md:pt-40 pb-32 bg-stone-50 min-h-screen">
      <div className="px-6 md:px-margin-page max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h2 className="text-[10px] font-bold text-secondary tracking-[0.5em] mb-4 uppercase">EXCLUSIVE LOOKBOOK</h2>
          <h1 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase">Gallery Fashion</h1>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group cursor-crosshair break-inside-avoid"
            >
              <div className="relative overflow-hidden bg-stone-100">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className={`w-full h-full object-cover transition-all duration-1000 scale-100 group-hover:scale-105 ${index % 2 === 0 ? 'animate-breathing' : 'animate-breathing-delayed'}`}
                />
                
                {/* Editorial Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                  <span className="text-[10px] text-white/60 tracking-[0.4em] uppercase mb-2">EDITION {index + 1}</span>
                  <h3 className="text-2xl text-white font-light tracking-[0.1em] uppercase">{item.title}</h3>
                  <div className="h-px w-0 group-hover:w-full bg-white/20 transition-all duration-1000 mt-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 text-center"
        >
          <p className="text-[10px] text-zinc-400 tracking-[0.6em] uppercase">END OF EXCLUSIVE GALLERY</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
