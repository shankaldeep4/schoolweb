import React, { useState, useEffect } from 'react';
import { useCms } from '../../context/CmsContext';
import { Link } from 'react-router-dom';
import { ArrowRight, Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Home() {
  const { state } = useCms();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Use gallery images for slider, fallback to placeholders if empty
  const sliderImages = state.gallery.length >= 4 ? state.gallery : [
    ...state.gallery,
    { id: 'p1', type: 'photo', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', title: 'Campus', date: '' },
    { id: 'p2', type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', title: 'Library', date: '' },
    { id: 'p3', type: 'photo', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop', title: 'Sports', date: '' },
    { id: 'p4', type: 'photo', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop', title: 'Students', date: '' },
  ].slice(0, Math.max(state.gallery.length, 4));

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [sliderImages.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

  // We want to show 4 photos at once on desktop, 2 on tablet, 1 on mobile
  // Since user asked for a 5x7 aspect ratio that doesn't cut, we'll use object-contain inside an aspect-[5/7] container.
  
  return (
    <div className="flex flex-col bg-primary-50">
      {/* Slider Section */}
      <section className="bg-primary-950 py-8 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2 uppercase tracking-tight">
              {state.schoolInfo.name}
            </h1>
            <p className="text-primary-200 font-medium">{state.schoolInfo.tagline}</p>
          </div>
          
          <div className="relative">
            {/* Slider Container showing multiple items */}
            <div className="flex gap-4 overflow-hidden snap-x snap-mandatory">
              {/* Calculate which indices to show (circular) */}
              {[0, 1, 2, 3].map((offset) => {
                const index = (currentSlide + offset) % sliderImages.length;
                const item = sliderImages[index];
                return (
                  <motion.div 
                    key={`${currentSlide}-${offset}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-[100%] md:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(25%-0.75rem)] snap-center"
                  >
                    <div className="aspect-[5/7] bg-black/40 rounded-xl overflow-hidden relative border border-white/10 flex items-center justify-center p-2">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <h3 className="text-white font-bold text-sm text-center uppercase tracking-wider">{item.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-accent-500 hover:text-primary-950 text-white p-2 rounded-full backdrop-blur transition-colors z-10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-accent-500 hover:text-primary-950 text-white p-2 rounded-full backdrop-blur transition-colors z-10">
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/admissions" className="bg-accent-500 hover:bg-accent-400 text-primary-950 px-8 py-4 rounded font-bold uppercase tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 text-center">
              Admissions Open
            </Link>
            <Link to="/about" className="bg-white/20 backdrop-blur hover:bg-white/30 border border-white/50 text-white px-8 py-4 rounded font-bold uppercase tracking-wide transition-all text-center">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* Notice Board & Intro */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Intro */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-bold text-primary-950 mb-6 uppercase flex items-center gap-3">
            <span className="w-8 h-1 bg-accent-500 inline-block"></span>
            About Our School
          </h2>
          <div className="prose prose-lg text-gray-600">
            <p className="leading-relaxed mb-6">
              {state.schoolInfo.about}
            </p>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 text-primary-700 font-bold hover:text-primary-900 transition-colors uppercase text-sm">
            Read Full Profile <ArrowRight size={18} />
          </Link>
          
          {/* Quick Stats/Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { label: 'Qualified Teachers', value: '50+' },
              { label: 'Smart Classrooms', value: '100%' },
              { label: 'Sports Facilities', value: 'World Class' },
              { label: 'Success Rate', value: '99%' }
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-100 shadow-sm p-4 text-center rounded-lg">
                <div className="text-2xl font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Notice Board */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-[500px]">
          <div className="bg-primary-900 text-white p-4 flex items-center gap-2">
            <Bell size={24} className="text-accent-400" />
            <h3 className="font-bold text-lg uppercase tracking-wide">Notice Board</h3>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            {state.notices.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No new notices.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {state.notices.map(notice => (
                  <li key={notice.id} className="p-4 hover:bg-primary-50 transition-colors group">
                    <div className="flex gap-4">
                      <div className="shrink-0 flex flex-col items-center justify-center bg-primary-100 text-primary-800 rounded px-3 py-2 h-16 w-16">
                        <span className="text-xl font-bold leading-none">{new Date(notice.date).getDate()}</span>
                        <span className="text-xs uppercase font-semibold">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                      </div>
                      <div>
                        {notice.isImportant && (
                          <span className="inline-block bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1">
                            Important
                          </span>
                        )}
                        <h4 className="font-semibold text-gray-900 leading-tight group-hover:text-primary-700 transition-colors">
                          {notice.title}
                        </h4>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
            <button className="text-sm font-bold text-primary-700 hover:text-primary-900 uppercase">View All Notices</button>
          </div>
        </div>
      </section>

      {/* Principal's Message & Achievements */}
      <section className="py-16 px-4 md:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Principal's Message */}
          {state.schoolInfo.principalMessage && (
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary-950 mb-8 uppercase flex items-center gap-3">
                <span className="w-8 h-1 bg-accent-500 inline-block"></span>
                Principal's Message
              </h2>
              <div className="bg-primary-50 rounded-2xl p-8 border border-primary-100 relative">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" /></svg>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                  {state.schoolInfo.principalPhotoUrl ? (
                    <img src={state.schoolInfo.principalPhotoUrl} alt={state.schoolInfo.principalName || "Principal"} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md shrink-0" />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary-200 flex items-center justify-center border-4 border-white shadow-md shrink-0 text-primary-600 font-bold text-xl uppercase text-center">
                      Photo
                    </div>
                  )}
                  <div>
                    <p className="text-gray-700 italic leading-relaxed mb-6">"{state.schoolInfo.principalMessage}"</p>
                    <div className="font-bold text-primary-950 text-lg uppercase tracking-wide">{state.schoolInfo.principalName || "Principal"}</div>
                    <div className="text-sm text-primary-600 font-medium uppercase tracking-wider">Principal, {state.schoolInfo.name}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary-950 mb-8 uppercase flex items-center gap-3">
              <span className="w-8 h-1 bg-accent-500 inline-block"></span>
              Our Achievements
            </h2>
            <div className="space-y-4">
              {(state.achievements || []).length > 0 ? state.achievements.map((achievement, i) => (
                <div key={achievement.id} className="group flex gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors border border-transparent hover:border-primary-100">
                  <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center shrink-0 font-bold text-xl">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary-950 uppercase tracking-tight mb-1 group-hover:text-primary-700 transition-colors">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                  More achievements to be updated soon.
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* Gallery Highlight */}
      <section className="bg-gray-900 py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-white uppercase flex items-center gap-3">
                <span className="w-8 h-1 bg-accent-500 inline-block"></span>
                Life at Campus
              </h2>
              <p className="text-gray-400 mt-2">Glimpses of our vibrant school environment</p>
            </div>
            <Link to="/gallery" className="text-accent-400 font-bold hover:text-accent-300 transition-colors uppercase text-sm flex items-center gap-1">
              View Full Gallery <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {state.gallery.slice(0, 3).map(item => (
              <div key={item.id} className="group relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
