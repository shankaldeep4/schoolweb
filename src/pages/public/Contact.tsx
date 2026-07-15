import React from 'react';
import { useCms } from '../../context/CmsContext';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  const { state } = useCms();
  
  return (
    <div className="flex flex-col">
      <div className="bg-primary-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">Contact Us</h1>
          <p className="text-primary-200 text-lg max-w-2xl">Get in touch with us for any inquiries or information.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full py-16 px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary-950 mb-6 uppercase flex items-center gap-3">
            <span className="w-8 h-1 bg-accent-500 inline-block"></span>
            Reach Out
          </h2>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Campus Address</h3>
                <p className="text-gray-600">{state.schoolInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Phone Number</h3>
                <p className="text-gray-600">{state.schoolInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Address</h3>
                <p className="text-gray-600">{state.schoolInfo.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-primary-950 mb-6 uppercase flex items-center gap-3">
            <span className="w-8 h-1 bg-accent-500 inline-block"></span>
            Send a Message
          </h2>
          <form className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Admission Inquiry" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="button" className="w-full bg-accent-500 hover:bg-accent-400 text-primary-950 font-bold uppercase tracking-wide px-4 py-3 rounded flex items-center justify-center gap-2 transition-colors">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
