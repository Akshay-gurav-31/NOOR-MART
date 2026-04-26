import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/ui/Hero';
import ProductGrid from '../components/ui/ProductGrid';
import Narrative from '../components/ui/Narrative';
import Newsletter from '../components/ui/Newsletter';
import CategoryTabScroll from '../components/ui/CategoryTabScroll';
import Gallery from './Archive';
import TheEdit from './TheEdit';

const Home = ({ products, addToCart }) => {
  const location = useLocation();

  // Handle hash-based scrolling (e.g. /#collections, /#gallery)
  React.useEffect(() => {
    const hash = location.hash;
    if (hash && !hash.includes('access_token') && !hash.includes('error_description')) {
      try {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
      } catch (e) {
        // Ignore invalid selectors (e.g., unexpected hashes)
      }
    }
  }, [location.hash]);

  // Remember last scroll position when no hash is active
  React.useEffect(() => {
    const savedPosition = localStorage.getItem('noor_mart_scroll');
    if (savedPosition && !location.hash) {
      setTimeout(() => window.scrollTo({ top: parseInt(savedPosition), behavior: 'auto' }), 100);
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
