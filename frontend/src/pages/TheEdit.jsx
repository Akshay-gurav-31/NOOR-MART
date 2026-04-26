import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AboutSkeleton } from '../components/ui/Skeleton';

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <AboutSkeleton />;
  return (
    <div className="pt-32 md:pt-40 min-h-screen bg-surface">
      <div className="px-6 md:px-margin-page max-w-[1920px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-[12px] font-bold text-secondary tracking-[0.4em] mb-4 uppercase">OUR PHILOSOPHY</h2>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] uppercase">The Atelier Story</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
              alt="Atelier Tailoring" 
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <p className="text-2xl md:text-3xl font-light text-primary leading-snug tracking-wide">
              Founded in the intersection of architectural precision and fluid textile movement, NOOR MART is a study in the purest form of luxury.
            </p>
            
            <div className="space-y-6 text-on-surface-variant text-lg font-light leading-relaxed">
              <p>
                Every piece in our collection is born from a meticulous process of selection. We source only the finest heritage materials—from the ultra-fine Pashmina of Kashmir to the architectural brocades of Banaras.
              </p>
              <p>
                Our aesthetic is silent. We believe that true luxury does not shout; it breathes in the quality of a seam, the weight of a drape, and the architectural integrity of a silhouette. 
              </p>
              <p>
                At NOOR MART, we don't just create clothes. We curate a language of form and function for the modern individual who seeks substance over style.
              </p>
            </div>

            <div className="pt-8">
              <div className="flex gap-16">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Heritage</h4>
                  <p className="text-2xl font-light">Kashmir</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Material</h4>
                  <p className="text-2xl font-light">Silk & Wool</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2">Philosophy</h4>
                  <p className="text-2xl font-light">Minimal</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
