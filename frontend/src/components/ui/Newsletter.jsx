import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-section-gap px-6 md:px-margin-page bg-surface-container-low text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-[12px] font-semibold text-secondary mb-6 tracking-[0.2em] uppercase">STAY CURATED</h2>
        <h3 className="text-3xl font-light text-primary mb-8 leading-tight">
          Receive private invitations and seasonal collection previews.
        </h3>
        <form className="flex flex-col md:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            className="flex-grow bg-transparent border-b border-outline focus:border-secondary border-t-0 border-x-0 outline-none px-0 py-4 text-body-md text-on-surface placeholder:text-zinc-300 transition-colors" 
            placeholder="Your Email Address" 
            type="email"
          />
          <button 
            className="bg-primary text-white px-12 py-4 text-[12px] font-semibold tracking-widest uppercase hover:bg-secondary transition-colors" 
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
