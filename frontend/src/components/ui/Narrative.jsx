import React from 'react';

const Narrative = () => {
  return (
    <section id="about" className="py-section-gap px-6 md:px-margin-page max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <div className="md:col-span-7 relative aspect-square md:aspect-auto md:h-[700px] overflow-hidden group">
        <img 
          className="w-full h-full object-cover object-[center_top] transition-transform duration-1000 group-hover:scale-105" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_oFoHs610w7WJvsAr1N26z5g_K8rJ6iA3UOEmehsViqtmXIsU0RrGWJJ1usbrJQvqxcra_xGCgXt4lT_5Vr1SHPnLSv08l2_8IxCCD2ROS8GG4HbAVPOdWUIHajn1vdS9f4s47QA7jyi5ZoAPAlhFVjTunEn9NolUrho-sRrizJRFmt_DDBzBc7KnelAQIdlsWwtZyjzNwEoiZW1J3AHR-wzHyY_wg5qHL2FzAeCleAFsjzq5yxYbskYaR8NMAfzKRRg5C7QBnyk" 
          alt="Bespoke Service"
        />
        <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/0 transition-colors duration-700" />
        <div className="absolute bottom-12 left-12 p-10 glass-card max-w-sm">
          <h3 className="text-2xl font-normal text-primary mb-4">Custom Tailoring</h3>
          <p className="text-body-md text-on-surface-variant mb-6 leading-relaxed">
            Get your clothes custom-made by our expert tailors to fit your exact measurements perfectly.
          </p>
          <a className="text-[12px] font-semibold text-secondary tracking-widest border-b border-secondary pb-1 uppercase" href="#">CONTACT US</a>
        </div>
      </div>
      
      <div className="md:col-span-5 grid grid-rows-2 gap-gutter">
        <div className="glass-card p-12 flex flex-col justify-center border-surface-container">
          <h3 className="text-[12px] font-semibold text-zinc-400 mb-4 tracking-widest uppercase">WINTER STYLES</h3>
          <h2 className="text-2xl font-normal text-primary mb-6">Stay Warm & Stylish</h2>
          <p className="text-body-md text-on-surface-variant mb-8 leading-relaxed">
            Explore our latest winter jackets, sweaters, and scarves to keep you warm and looking great this season.
          </p>
          <button className="w-fit text-[12px] font-semibold border-b border-primary pb-1 tracking-widest uppercase">VIEW COLLECTION</button>
        </div>
        
        <div className="bg-primary p-12 flex flex-col justify-center">
          <h3 className="text-[12px] font-semibold text-zinc-500 mb-4 tracking-widest uppercase">MEMBERSHIP</h3>
          <h2 className="text-2xl font-normal text-white mb-6">Noor Mart Members</h2>
          <p className="text-body-md text-zinc-400 mb-8 leading-relaxed">
            Join for free to get early access to new clothing collections, special member discounts, and faster checkout.
          </p>
          <button className="w-fit bg-white text-primary px-8 py-3 text-[12px] font-semibold tracking-widest uppercase hover:bg-secondary hover:text-white transition-all">
            JOIN FOR FREE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Narrative;
