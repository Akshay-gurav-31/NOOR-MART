import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className }) => {
  return (
    <div className={`relative overflow-hidden bg-stone-200/50 ${className}`}>
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: 'linear',
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </div>
  );
};

export const ProductSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
        </div>
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};

export const AboutSkeleton = () => {
  return (
    <div className="pt-32 md:pt-40 min-h-screen bg-surface px-6 md:px-margin-page">
      <div className="mb-20">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-16 w-3/4 md:w-1/2" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="space-y-10">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-32 w-full" />
          <div className="flex gap-16">
            <Skeleton className="h-12 w-24" />
            <Skeleton className="h-12 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const GallerySkeleton = () => {
  return (
    <div className="pt-32 md:pt-40 pb-32 bg-stone-50 min-h-screen px-6 md:px-margin-page">
      <div className="mb-24">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-16 w-1/2" />
      </div>
      <div className="columns-1 md:columns-3 gap-8 space-y-8">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className={`w-full ${i % 2 === 0 ? 'h-[400px]' : 'h-[600px]'}`} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
