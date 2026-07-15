import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCms } from '../../context/CmsContext';
import { Menu, X, Phone, Mail, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { state } = useCms();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="flex flex-col shadow-md w-full sticky top-0 z-50 bg-white">
      {/* Top Bar with Quick Links */}
      <div className="bg-primary-900 text-white text-xs py-2 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><Phone size={14}/> {state.schoolInfo.phone}</span>
          <span className="flex items-center gap-1 hidden sm:flex"><Mail size={14}/> {state.schoolInfo.email}</span>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0 items-center">
          <div className="hidden md:flex items-center gap-3 mr-4 border-r border-primary-700 pr-4">
            {state.quickLinks.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                className={`font-medium uppercase tracking-wider text-[10px] px-2 py-1 rounded ${link.isHighlight ? 'bg-accent-500 text-primary-950 font-bold' : 'bg-primary-800 text-white hover:bg-primary-700'} transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link to="/admin" className="hover:text-accent-400 transition-colors font-medium uppercase tracking-wide">Admin</Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4 px-4 md:px-8 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          {state.schoolInfo.logoUrl ? (
            <img src={state.schoolInfo.logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
          ) : (
            <div className="bg-primary-900 text-white p-2 rounded-full">
              <GraduationCap size={32} />
            </div>
          )}
          <div>
            <h1 className="text-xl md:text-3xl font-serif font-bold text-primary-950 uppercase tracking-tight">{state.schoolInfo.name}</h1>
            <p className="text-sm text-gray-500 font-medium">{state.schoolInfo.tagline}</p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`font-semibold uppercase text-sm tracking-wide transition-colors ${
                location.pathname === link.path ? 'text-primary-700 border-b-2 border-accent-500' : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/admissions" className="bg-accent-500 text-primary-950 font-bold px-4 py-2 rounded shadow-sm hover:bg-accent-400 transition-colors uppercase text-sm">
            Apply Now
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-primary-50 border-t border-primary-100 flex flex-col">
          {/* Mobile Quick Links */}
          <div className="flex flex-wrap gap-2 p-4 border-b border-primary-200">
            {state.quickLinks.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded ${link.isHighlight ? 'bg-accent-500 text-primary-950' : 'bg-primary-900 text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-4 font-semibold uppercase text-sm border-b border-primary-100 ${
                location.pathname === link.path ? 'bg-primary-100 text-primary-900' : 'text-gray-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
