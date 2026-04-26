import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: { full_name: fullName }
          }
        });
        if (error) throw error;
        alert('Verification email sent! Please check your inbox.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0d0f0d]">
      {/* Editorial Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80 scale-100"
        style={{ backgroundImage: "url('/login.png')" }}
      />
      <div className="absolute inset-0 bg-black/10" />

      {/* Back to Home Link */}
      <Link 
        to="/" 
        className="absolute top-10 left-10 z-20 flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group"
      >
        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-2" />
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Back to Home</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[480px] mx-6"
      >
        <div className="backdrop-blur-[64px] bg-white/80 p-12 md:p-16 border border-stone-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          <div className="text-center mb-16">
            <h1 className="text-[14px] font-bold tracking-[0.4em] text-black uppercase mb-4">NOOR MART</h1>
            <p className="text-zinc-500 tracking-[0.3em] text-[9px] uppercase font-semibold italic">The Purest Form</p>
          </div>

          <div className="space-y-10">
            <button 
              onClick={handleGoogleLogin}
              className="w-full h-14 border border-stone-200 flex items-center justify-center gap-4 text-[10px] font-bold tracking-[0.3em] uppercase text-black hover:bg-black hover:text-white transition-all duration-500 group"
            >
              <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.336 0 3.327 2.691 1.327 6.618L5.266 9.765z"/>
                <path fill="#34A853" d="M12 24c3.155 0 5.818-1.036 7.745-2.827l-3.763-2.918c-1.082.727-2.436 1.155-3.982 1.155-3.055 0-5.645-2.064-6.573-4.845L1.445 17.691C3.491 21.491 7.445 24 12 24z"/>
                <path fill="#4285F4" d="M24 12c0-.855-.073-1.682-.218-2.482H12V14.21h6.727c-.29 1.536-1.155 2.836-2.464 3.709l3.764 2.918C22.227 18.845 24 15.655 24 12z"/>
                <path fill="#FBBC05" d="M5.427 14.391C5.191 13.636 5.064 12.836 5.064 12s.127-1.636.363-2.391L1.445 6.618C.527 8.436 0 10.464 0 12s.527 3.564 1.445 5.382l3.982-2.991z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center">
              <div className="flex-grow h-px bg-stone-100"></div>
              <span className="px-6 text-[8px] text-zinc-400 uppercase tracking-[0.4em] font-bold">OR</span>
              <div className="flex-grow h-px bg-stone-100"></div>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <input 
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="FULL NAME"
                      className="w-full bg-stone-50 border border-stone-200 focus:border-black outline-none px-6 py-5 text-[11px] tracking-[0.2em] text-black placeholder:text-zinc-400 transition-all uppercase"
                      required={isSignUp}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL ADDRESS"
                className="w-full bg-stone-50 border border-stone-200 focus:border-black outline-none px-6 py-5 text-[11px] tracking-[0.2em] text-black placeholder:text-zinc-400 transition-all uppercase"
                required
              />

              <div className="relative">
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="PASSWORD"
                  className="w-full bg-stone-50 border border-stone-200 focus:border-black outline-none px-6 py-5 text-[11px] tracking-[0.2em] text-black placeholder:text-zinc-400 transition-all uppercase"
                  required
                />
                {!isSignUp && (
                  <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] text-zinc-400 hover:text-black uppercase tracking-widest font-bold">
                    Forgot?
                  </button>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-[10px] tracking-widest uppercase text-center font-bold">
                  {error}
                </p>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white h-16 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all duration-500 disabled:opacity-50 mt-4 shadow-xl"
              >
                {loading ? 'PROCESSING...' : (isSignUp ? 'JOIN NOOR MART' : 'SIGN IN')}
              </button>
            </form>

            <div className="text-center pt-8">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[10px] text-zinc-500 tracking-[0.2em] uppercase font-bold group"
              >
                {isSignUp ? 'ALREADY A MEMBER? ' : "DON'T HAVE AN ACCOUNT? "}
                <span className="text-black group-hover:text-secondary transition-colors underline underline-offset-8 decoration-black/20 ml-2">
                  {isSignUp ? 'SIGN IN' : 'CREATE ONE'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-white tracking-[0.3em] uppercase leading-loose font-medium">
            BY CONTINUING, YOU AGREE TO OUR<br/>
            <span className="text-white hover:underline cursor-pointer transition-colors">TERMS OF SERVICE</span> AND <span className="text-white hover:underline cursor-pointer transition-colors">PRIVACY POLICY</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
