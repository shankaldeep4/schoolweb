import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Play } from 'lucide-react';

export default function Gallery() {
  const { state } = useCms();
  
  return (
    <div className="flex flex-col">
      <div className="bg-primary-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Photo & Video Gallery</h1>
          <p className="text-primary-200 text-lg max-w-2xl">Explore our campus, events, and memories.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-16 px-4 md:px-8">
        {state.gallery.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
            <p className="text-xl">No media items available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.gallery.map(item => (
              <div key={item.id} className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center pl-1 text-primary-600 shadow-lg group-hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
