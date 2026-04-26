import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone, Building2, CheckCircle, Lock, ChevronRight } from 'lucide-react';

const CheckoutModal = ({ isOpen, onClose, cartItems, total }) => {
  const [activeTab, setActiveTab] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  const formatCard = (val) => val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    setProcessing(false);
    onClose();
  };

  const tabs = [
    { id: 'upi', label: 'UPI / QR', icon: <Smartphone size={15} /> },
    { id: 'card', label: 'Card', icon: <CreditCard size={15} /> },
    { id: 'netbanking', label: 'Net Banking', icon: <Building2 size={15} /> },
  ];

  const banks = ['SBI', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Yes Bank', 'PNB', 'Bank of Baroda'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 z-[80] backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[480px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden">
              {paymentSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                  </motion.div>
                  <h2 className="text-[18px] font-light tracking-[0.3em] uppercase text-zinc-900 mb-3">Order Placed!</h2>
                  <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase mb-2">Thank you for your purchase</p>
                  <p className="text-[22px] font-bold text-zinc-900 mb-8">₹{total.toFixed(2)}</p>
                  <p className="text-[9px] text-zinc-400 tracking-widest uppercase mb-10">Order confirmation will be sent to your email</p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex justify-between items-center px-8 py-6 border-b border-stone-100">
                    <div>
                      <h2 className="text-[12px] font-bold tracking-[0.4em] text-zinc-900 uppercase">Checkout</h2>
                      <p className="text-[9px] text-zinc-400 tracking-[0.2em] uppercase mt-1">
                        {cartItems.length} item{cartItems.length > 1 ? 's' : ''} · ₹{total.toFixed(2)}
                      </p>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                      <X size={18} className="text-zinc-600" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-stone-100">
                    {tabs.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${
                          activeTab === tab.id
                            ? 'border-b-2 border-black text-black'
                            : 'text-zinc-400 hover:text-zinc-700'
                        }`}
                      >
                        {tab.icon} {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="p-8">
                    <AnimatePresence mode="wait">

                      {/* UPI Tab */}
                      {activeTab === 'upi' && (
                        <motion.div key="upi" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                          <div className="flex justify-center">
                            <div className="p-4 border border-stone-200">
                              <img
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=noormart@upi%26pn=NoorMart%26am=${total.toFixed(2)}%26cu=INR%26tn=NoorMartOrder`}
                                alt="UPI QR Code"
                                className="w-40 h-40"
                              />
                              <p className="text-[8px] text-zinc-400 tracking-widest uppercase text-center mt-2">Scan with any UPI app</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-stone-100" />
                            <span className="text-[9px] text-zinc-400 tracking-widest uppercase">or enter UPI ID</span>
                            <div className="flex-1 h-px bg-stone-100" />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="yourname@upi"
                              value={upiId}
                              onChange={e => setUpiId(e.target.value)}
                              className="w-full border border-stone-200 focus:border-black outline-none px-5 py-4 text-[11px] tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-all"
                            />
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                              <span key={app} className="px-3 py-1.5 border border-stone-200 text-[9px] font-bold tracking-widest text-zinc-500 uppercase">{app}</span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Card Tab */}
                      {activeTab === 'card' && (
                        <motion.div key="card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-4">
                          <input
                            placeholder="CARDHOLDER NAME"
                            value={cardName}
                            onChange={e => setCardName(e.target.value.toUpperCase())}
                            className="w-full border border-stone-200 focus:border-black outline-none px-5 py-4 text-[11px] tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-all"
                          />
                          <div className="relative">
                            <input
                              placeholder="CARD NUMBER"
                              value={cardNumber}
                              onChange={e => setCardNumber(formatCard(e.target.value))}
                              className="w-full border border-stone-200 focus:border-black outline-none px-5 py-4 text-[11px] tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-all"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                              <div className="w-6 h-4 bg-red-500 rounded-sm opacity-80" />
                              <div className="w-6 h-4 bg-yellow-400 rounded-sm opacity-80 -ml-2" />
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <input
                              placeholder="MM/YY"
                              value={expiry}
                              onChange={e => setExpiry(formatExpiry(e.target.value))}
                              className="w-full border border-stone-200 focus:border-black outline-none px-5 py-4 text-[11px] tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-all"
                            />
                            <input
                              placeholder="CVV"
                              value={cvv}
                              type="password"
                              maxLength={3}
                              onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              className="w-full border border-stone-200 focus:border-black outline-none px-5 py-4 text-[11px] tracking-widest text-zinc-900 placeholder:text-zinc-300 transition-all"
                            />
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Lock size={10} />
                            <span className="text-[8px] tracking-widest uppercase">256-bit SSL Secured</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Net Banking Tab */}
                      {activeTab === 'netbanking' && (
                        <motion.div key="netbanking" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
                          <p className="text-[9px] text-zinc-400 tracking-widest uppercase mb-4">Select Your Bank</p>
                          <div className="grid grid-cols-2 gap-2">
                            {banks.map(bank => (
                              <button
                                key={bank}
                                onClick={() => setSelectedBank(bank)}
                                className={`px-4 py-3 border text-[10px] font-bold tracking-widest uppercase text-left transition-all ${
                                  selectedBank === bank
                                    ? 'border-black bg-black text-white'
                                    : 'border-stone-200 text-zinc-600 hover:border-zinc-400'
                                }`}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </div>

                  {/* Pay Button */}
                  <div className="px-8 pb-8">
                    <button
                      onClick={handlePay}
                      disabled={processing}
                      className="w-full bg-black text-white py-5 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-zinc-800 transition-all disabled:opacity-60 flex items-center justify-center gap-3"
                    >
                      {processing ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
                      ) : (
                        <><Lock size={12} /> PAY ₹{total.toFixed(2)}</>
                      )}
                    </button>
                    <p className="text-[8px] text-zinc-400 text-center mt-3 tracking-widest uppercase">
                      Demo only · No real payment will be made
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
