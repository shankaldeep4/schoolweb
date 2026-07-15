import React from 'react';
import { useCms } from '../../context/CmsContext';

export default function About() {
  const { state } = useCms();
  
  return (
    <div className="flex flex-col">
      <div className="bg-primary-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">About Us</h1>
          <p className="text-primary-200 text-lg max-w-2xl">{state.schoolInfo.tagline}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-16 px-4 md:px-8">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-3xl font-serif font-bold text-primary-950 mb-8 uppercase flex items-center gap-3">
            <span className="w-8 h-1 bg-accent-500 inline-block"></span>
            Our School Profile
          </h2>
          <div className="prose prose-lg text-gray-700 max-w-none">
            <p className="whitespace-pre-line leading-relaxed text-lg">
              {state.schoolInfo.about}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-primary-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-primary-900 mb-4 uppercase tracking-wide">Our Vision</h3>
              <p className="text-gray-700">To inspire and empower students to become lifelong learners, critical thinkers, and productive members of an ever-changing global society.</p>
            </div>
            <div className="bg-accent-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-accent-900 mb-4 uppercase tracking-wide">Our Mission</h3>
              <p className="text-gray-700">To provide a safe, nurturing, and engaging learning environment that promotes holistic development and academic excellence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
