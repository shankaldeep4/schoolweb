import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Phone, Mail, MapPin, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { state } = useCms();
  
  return (
    <footer className="bg-primary-950 text-primary-100 pt-12 pb-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap size={28} className="text-accent-500" />
            <h2 className="text-xl font-bold text-white uppercase">{state.schoolInfo.name}</h2>
          </div>
          <p className="text-sm text-primary-300 leading-relaxed mb-4">
            {state.schoolInfo.tagline}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4 uppercase border-b border-primary-800 pb-2 inline-block">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li><Link to="/about" className="hover:text-accent-400 transition-colors text-sm">About Us</Link></li>
            <li><Link to="/admissions" className="hover:text-accent-400 transition-colors text-sm">Admission Procedure</Link></li>
            <li><Link to="/gallery" className="hover:text-accent-400 transition-colors text-sm">Photo Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-accent-400 transition-colors text-sm">Contact Us</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4 uppercase border-b border-primary-800 pb-2 inline-block">Contact Info</h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2 text-sm">
              <MapPin size={18} className="text-accent-500 shrink-0 mt-1" />
              <span>{state.schoolInfo.address}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Phone size={18} className="text-accent-500 shrink-0" />
              <span>{state.schoolInfo.phone}</span>
            </li>
            <li className="flex items-center gap-2 text-sm">
              <Mail size={18} className="text-accent-500 shrink-0" />
              <span>{state.schoolInfo.email}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-primary-900 pt-6 text-center text-xs text-primary-400 flex flex-col items-center max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} {state.schoolInfo.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
