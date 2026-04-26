import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Sparkles } from 'lucide-react';

const Navbar = ({ cartCount, onCartClick, onLogout, user }) => {
  const [isUserOpen, setIsUserOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-stone-50/70 backdrop-blur-xl border-b border-stone-200/50 shadow-sm shadow-zinc-900/5">
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-[1920px] mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-Img.png" alt="Noor Mart Logo" className="h-8 w-auto object-contain" />
          <span className="text-2xl font-light tracking-[0.3em] text-zinc-900">NOOR MART</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-12 font-inter tracking-[0.2em] text-[11px] uppercase font-medium">
          <a href="#collections" className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase border-b border-transparent hover:border-zinc-900 transition-all">COLLECTIONS</a>
          <a href="#gallery" className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase border-b border-transparent hover:border-zinc-900 transition-all">GALLERY</a>
          <a href="#about" className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase border-b border-transparent hover:border-zinc-900 transition-all">ABOUT</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onCartClick}
            className="relative cursor-pointer hover:opacity-70 transition-opacity"
          >
            <ShoppingBag size={20} className="text-zinc-900" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserOpen(!isUserOpen)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
              >
                <User size={20} className="text-zinc-900" />
              </button>
              
              {isUserOpen && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setIsUserOpen(false)} />
                  <div className="absolute top-full right-0 mt-6 w-56 bg-white border border-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 z-[100]">
                    <div className="mb-6">
                      <p className="text-[9px] text-zinc-400 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-[10px] font-bold text-zinc-900 uppercase truncate">{user?.email}</p>
                    </div>
                    
                    <Link 
                      to="/profile"
                      onClick={() => setIsUserOpen(false)}
                      className="block w-full text-left text-[11px] font-bold text-zinc-900 hover:text-secondary uppercase tracking-[0.2em] py-3 border-t border-stone-100 transition-colors"
                    >
                      My Profile
                    </Link>
                    
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsUserOpen(false);
                      }}
                      className="w-full text-left text-[11px] font-bold text-error hover:text-red-700 uppercase tracking-[0.2em] py-3 border-t border-stone-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link 
              to="/login"
              className="text-[10px] font-bold tracking-[0.2em] text-zinc-900 uppercase border-b border-transparent hover:border-zinc-900 transition-all"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
