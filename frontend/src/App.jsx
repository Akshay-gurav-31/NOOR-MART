import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import CartSidebar from './components/ui/CartSidebar';
import { supabase } from './services/supabase';

// Pages
import Home from './pages/Home';
import TheEdit from './pages/TheEdit';
import Archive from './pages/Archive';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Toast from './components/ui/Toast';

import axios from 'axios';

const AppContent = ({ products, cart, isCartOpen, setIsCartOpen, theme, toggleTheme, handleLogout, session, authLoading, removeFromCart, setCart, showToast }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavFooter = ['/login', '/profile'].includes(location.pathname);

  useEffect(() => {
    const fetchCart = async () => {
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('cart_items')
            .select('*, products(*)')
            .eq('user_id', session.user.id);
            
          if (error) throw error;

          const cartProducts = data.map(item => ({
            ...item.products,
            cartItemId: item.id
          }));
          setCart(cartProducts);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        setCart([]);
      }
    };
    fetchCart();
  }, [session]);

  const addToCart = async (product) => {
    if (!session) {
      navigate('/login');
      return;
    }
    
    if (!product.id) {
      showToast('Product ID is missing. Please refresh and try again.', 'error');
      return;
    }

    try {
      const { data: existing } = await supabase
        .from('cart_items')
        .select('*')
        .eq('product_id', product.id)
        .eq('user_id', session.user.id)
        .single();

      if (existing) {
        const { data, error } = await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + 1 })
          .eq('id', existing.id)
          .select();
        if (error) throw error;
        setCart(prev => [...prev, { ...product, cartItemId: data[0].id }]);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert([{ product_id: product.id, quantity: 1, user_id: session.user.id }])
          .select();
        if (error) throw error;
        setCart(prev => [...prev, { ...product, cartItemId: data[0].id }]);
      }
      setIsCartOpen(true);
    } catch (error) {
      const errorMsg = error.response?.data?.error || error.message;
      console.error('Error adding to cart:', errorMsg);
      showToast(`Sync Error: ${errorMsg}`, 'error');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-surface text-on-surface'}`}>
      {!hideNavFooter && (
        <Navbar 
          cartCount={cart.length} 
          onCartClick={() => setIsCartOpen(true)} 
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={handleLogout}
          user={session?.user}
        />
      )}
      
      <main>
        <Routes>
          <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
          <Route path="/about" element={<TheEdit />} />
          <Route path="/gallery" element={<Archive />} />
          <Route path="/profile" element={authLoading ? null : session ? <Profile session={session} showToast={showToast} /> : <Navigate to="/login" />} />

          <Route path="/login" element={authLoading ? <div className="h-screen bg-zinc-950" /> : session ? <Navigate to="/" /> : <Auth />} />
          <Route path="*" element={authLoading ? <div className="h-screen bg-zinc-950" /> : <Navigate to="/" />} />
        </Routes>
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        removeFromCart={removeFromCart}
      />

      {!hideNavFooter && (
        <footer className="w-full bg-stone-50 border-t border-stone-200">
          <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 gap-8 w-full max-w-[1920px] mx-auto">
            <div className="text-lg font-semibold tracking-[0.3em] text-zinc-900 uppercase">NOOR MART</div>
            <div className="flex flex-wrap justify-center gap-8 font-inter tracking-widest text-[10px] uppercase text-zinc-500">
              <a className="hover:text-zinc-900 transition-colors duration-200 underline-offset-4 hover:underline" href="#">PRIVACY</a>
              <a className="hover:text-zinc-900 transition-colors duration-200 underline-offset-4 hover:underline" href="#">TERMS</a>
              <a className="hover:text-zinc-900 transition-colors duration-200 underline-offset-4 hover:underline" href="#">SHIPPING</a>
              <a className="hover:text-zinc-900 transition-colors duration-200 underline-offset-4 hover:underline" href="#">CAREERS</a>
              <a className="hover:text-zinc-900 transition-colors duration-200 underline-offset-4 hover:underline" href="#">CONTACT</a>
            </div>
            <div className="font-inter tracking-widest text-[10px] uppercase text-zinc-500">
              © 2026 NOOR MART. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState(() => {
    const cached = localStorage.getItem('noor_mart_products');
    return cached ? JSON.parse(cached) : [];
  });
  const [cart, setCart] = useState(() => {
    const cached = localStorage.getItem('noor_mart_cart');
    return cached ? JSON.parse(cached) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(products.length === 0);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('noor_mart_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Toast State
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ isVisible: true, message, type });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
      // Clean up the OAuth hash tokens from the URL (e.g. /#access_token=...)
      if (window.location.hash && window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', '/');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products directly from Supabase, ordered consistently
        const { data, error } = await supabase.from('products').select('*').order('name');
        if (error) throw error;
        
        setProducts(data);
        localStorage.setItem('noor_mart_products', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setGlobalLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const removeFromCart = async (index) => {
    const itemToRemove = cart[index];
    if (itemToRemove && itemToRemove.cartItemId) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', itemToRemove.cartItemId);
        if (error) throw error;
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        showToast('Item removed from bag', 'info');
      } catch (error) {
        console.error('Error removing from cart:', error);
        showToast('Failed to remove item', 'error');
      }
    } else {
      // Fallback for UI-only items (if any)
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast('Signed out successfully', 'info');
  };

  return (
    <Router>
      <AppContent 
        products={products} 
        cart={cart}
        setCart={setCart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        theme="light"
        handleLogout={handleLogout}
        session={session}
        authLoading={authLoading}
        removeFromCart={removeFromCart}
        showToast={showToast}
      />
      
      <Toast 
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </Router>
  );
};

export default App;
