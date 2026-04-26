import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { supabase } from '../services/supabase';

const Profile = ({ session, showToast }) => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);
  const user = session?.user;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        if (data) {
          setProfile(data);
          setNewName(data.full_name || '');
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, full_name: newName, updated_at: new Date() });
      
      if (error) throw error;
      setProfile({ ...profile, full_name: newName });
      setIsEditing(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 md:p-12 overflow-hidden">
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
          alt="Background" 
          className="w-full h-full object-cover opacity-60 scale-100"
        />
        <div className="absolute inset-0 bg-stone-50/20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] bg-white/90 backdrop-blur-md border border-stone-200 p-12 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.1)] relative z-10"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-black" />
        
        <div className="text-center mb-16">
          <div className="inline-block p-4 rounded-full bg-stone-50 mb-6">
            <User size={32} className="text-zinc-300" />
          </div>
          <h1 className="text-[14px] font-bold tracking-[0.5em] text-zinc-900 uppercase mb-2">Member Details</h1>
          <p className="text-[9px] text-zinc-400 tracking-[0.3em] uppercase font-semibold">Your Noor Mart Account</p>
        </div>

        <div className="space-y-12">
          {/* Personal Info Box */}
          <div className="space-y-10">
            <div className="flex justify-between items-end border-b border-stone-100 pb-8 group">
              <div className="space-y-3">
                <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-400 uppercase">Your Name</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-transparent border-b border-black outline-none py-1 text-[15px] tracking-widest uppercase w-full font-medium"
                    autoFocus
                    placeholder="ENTER NAME"
                  />
                ) : (
                  <p className="text-[15px] font-medium tracking-widest text-zinc-900 uppercase">{profile?.full_name || 'NOT SET'}</p>
                )}
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-[9px] font-bold tracking-[0.3em] text-zinc-900 uppercase opacity-40 hover:opacity-100 transition-opacity underline underline-offset-8"
              >
                {isEditing ? 'CANCEL' : 'EDIT'}
              </button>
            </div>

            <div className="space-y-3 border-b border-stone-100 pb-8">
              <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-400 uppercase">Email ID</p>
              <p className="text-[14px] font-medium tracking-widest text-zinc-900">{user.email}</p>
            </div>

            <div className="space-y-3">
              <p className="text-[9px] font-bold tracking-[0.4em] text-zinc-400 uppercase">Joined Noor Mart</p>
              <p className="text-[14px] font-medium tracking-widest text-zinc-900 uppercase">
                {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {isEditing && (
            <button 
              onClick={handleUpdate}
              disabled={loading}
              className="w-full bg-black text-white py-6 text-[11px] font-bold tracking-[0.5em] uppercase hover:bg-zinc-800 transition-all shadow-2xl disabled:opacity-50"
            >
              {loading ? 'SAVING...' : 'SAVE CHANGES'}
            </button>
          )}

          <div className="pt-10 border-t border-stone-100 flex justify-around items-center opacity-30 grayscale pointer-events-none">
            <div className="text-center">
              <Package size={16} className="mx-auto mb-2" />
              <p className="text-[8px] font-bold tracking-[0.3em] text-zinc-900 uppercase">Orders</p>
            </div>
            <div className="text-center">
              <MapPin size={16} className="mx-auto mb-2" />
              <p className="text-[8px] font-bold tracking-[0.3em] text-zinc-900 uppercase">Address</p>
            </div>
            <div className="text-center">
              <Sparkles size={16} className="mx-auto mb-2" />
              <p className="text-[8px] font-bold tracking-[0.3em] text-zinc-900 uppercase">Status</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/" 
            className="text-[10px] font-bold tracking-[0.4em] text-zinc-400 uppercase hover:text-black transition-colors border-b border-transparent hover:border-black pb-1"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
