import React from 'react';
import Hero from '../components/ui/Hero';
import ProductGrid from '../components/ui/ProductGrid';
import Narrative from '../components/ui/Narrative';
import Newsletter from '../components/ui/Newsletter';
import CategoryTabScroll from '../components/ui/CategoryTabScroll';
import Gallery from './Archive';
import TheEdit from './TheEdit';

const Home = ({ products, addToCart }) => {
  React.useEffect(() => {
    // 1. Handle direct hash links (e.g. /#gallery) on load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500); // Small delay for content to render
    }

    // 2. Remember last scroll position
    const savedPosition = localStorage.getItem('noor_mart_scroll');
    if (savedPosition && !hash) {
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPosition), behavior: 'auto' });
      }, 500);
    }

    const handleScroll = () => {
      localStorage.setItem('noor_mart_scroll', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-smooth">
      <section id="home">
        <Hero />
      </section>

      <section id="collections">
        <ProductGrid products={products} addToCart={addToCart} />
      </section>

      <section id="gallery">
        <div className="-mt-32"> {/* Pull up to overlap slightly for seamless look */}
          <Gallery />
        </div>
      </section>

      <section id="about">
        <div className="-mt-32">
          <TheEdit />
        </div>
      </section>

      <Narrative />
      <CategoryTabScroll />
      <Newsletter />
    </div>
  );
};

export default Home;
