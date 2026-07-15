import React, { useState, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Upload, Plus, Trash2 } from 'lucide-react';
import { Theme, QuickLink } from '../../types';

export default function Settings() {
  const { state, updateSchoolInfo, setTheme, addQuickLink, deleteQuickLink, addAchievement, deleteAchievement } = useCms();
  const [formData, setFormData] = useState(state.schoolInfo);
  const [themeSelection, setThemeSelection] = useState<Theme>(state.theme);
  const [saved, setSaved] = useState(false);
  
  const [newLink, setNewLink] = useState({ label: '', url: '', isHighlight: false });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const principalFileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(formData);
    setTheme(themeSelection);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, logoUrl: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handlePrincipalPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setFormData(prev => ({ ...prev, principalPhotoUrl: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAddLink = () => {
    if (newLink.label && newLink.url) {
      addQuickLink(newLink);
      setNewLink({ label: '', url: '', isHighlight: false });
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      addAchievement(newAchievement);
      setNewAchievement({ title: '', description: '' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-primary-950 mb-2 uppercase tracking-tight">School Settings</h1>
        <p className="text-gray-600 font-medium">Update the primary details displayed on the public website.</p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl shadow-primary-900/5 border border-gray-100 overflow-hidden">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <h2 className="text-lg font-bold text-primary-900 uppercase tracking-wide">General Information</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Website Theme</label>
              <select 
                value={themeSelection}
                onChange={e => setThemeSelection(e.target.value as Theme)}
                className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white"
              >
                <option value="default">Default (Blue & Yellow)</option>
                <option value="forest">Forest (Green & Orange)</option>
                <option value="minimal">Minimal (Grays)</option>
              </select>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">School Logo</label>
              <div className="flex items-center gap-4">
                {formData.logoUrl && (
                  <img src={formData.logoUrl} alt="Logo Preview" className="h-12 w-12 object-contain bg-gray-100 rounded" />
                )}
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-400 transition-colors text-sm font-medium"
                >
                  <Upload size={16} /> Upload Logo
                </button>
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">School Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Tagline</label>
              <input type="text" value={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Phone Number</label>
              <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Physical Address</label>
            <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">About School (Profile)</label>
            <textarea rows={4} value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white resize-none" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Admission Details & Process</label>
            <textarea rows={4} value={formData.admissionDetails} onChange={e => setFormData({...formData, admissionDetails: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white resize-none" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Principal's Name</label>
              <input type="text" value={formData.principalName || ''} onChange={e => setFormData({...formData, principalName: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Principal's Photo (Optional)</label>
              <div className="flex items-center gap-4">
                {formData.principalPhotoUrl && (
                  <img src={formData.principalPhotoUrl} alt="Principal Preview" className="h-12 w-12 object-cover rounded-full shadow-sm" />
                )}
                <button 
                  type="button" 
                  onClick={() => principalFileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-primary-600 hover:border-primary-400 transition-colors text-sm font-medium"
                >
                  <Upload size={16} /> Upload Photo
                </button>
                {formData.principalPhotoUrl && (
                   <button type="button" onClick={() => setFormData({...formData, principalPhotoUrl: ''})} className="text-red-500 hover:text-red-700 p-2">
                     <Trash2 size={18} />
                   </button>
                )}
                <input ref={principalFileInputRef} type="file" className="hidden" accept="image/*" onChange={handlePrincipalPhotoUpload} />
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-primary-900 uppercase tracking-wider mb-2">Principal's Message</label>
            <textarea rows={5} value={formData.principalMessage || ''} onChange={e => setFormData({...formData, principalMessage: e.target.value})} className="w-full border-2 border-gray-200 rounded-lg p-3 text-gray-800 font-medium focus:border-primary-500 focus:ring-0 outline-none transition-colors bg-gray-50 hover:bg-white focus:bg-white resize-none" placeholder="Enter the principal's message..." />
          </motion.div>

          <motion.div variants={itemVariants} className="pt-6 border-t border-gray-100 flex justify-between items-center">
            <div className="h-8 flex items-center">
              <AnimatePresence>
                {saved && (
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-md border border-green-200">
                    <CheckCircle size={18} />
                    <span className="text-sm font-bold uppercase tracking-wide">Settings Saved</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-8 py-3 bg-primary-900 text-accent-400 rounded-lg hover:bg-primary-800 font-bold uppercase tracking-wide shadow-md transition-colors">
              Save Changes
            </motion.button>
          </motion.div>
        </form>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl shadow-primary-900/5 border border-gray-100 overflow-hidden mt-8">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <h2 className="text-lg font-bold text-primary-900 uppercase tracking-wide">Quick Links / Action Buttons</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <input type="text" placeholder="Button Label (e.g., Pay Fee)" value={newLink.label} onChange={e => setNewLink({...newLink, label: e.target.value})} className="flex-1 border-2 border-gray-200 rounded-lg p-2 font-medium focus:border-primary-500 outline-none min-w-[200px]" />
            <input type="text" placeholder="URL or Link" value={newLink.url} onChange={e => setNewLink({...newLink, url: e.target.value})} className="flex-1 border-2 border-gray-200 rounded-lg p-2 font-medium focus:border-primary-500 outline-none min-w-[200px]" />
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={newLink.isHighlight} onChange={e => setNewLink({...newLink, isHighlight: e.target.checked})} className="w-4 h-4 text-primary-600 rounded" />
              Highlight
            </label>
            <button type="button" onClick={handleAddLink} className="bg-primary-900 text-white px-4 py-2 rounded-lg font-bold uppercase text-sm hover:bg-primary-800 flex items-center gap-2">
              <Plus size={16} /> Add Link
            </button>
          </div>
          <div className="space-y-3">
            {state.quickLinks.map(link => (
              <div key={link.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-primary-950">{link.label} {link.isHighlight && <span className="ml-2 text-[10px] bg-accent-400 text-primary-950 px-2 py-0.5 rounded-full uppercase">Highlighted</span>}</span>
                  <span className="text-sm text-gray-500">{link.url}</span>
                </div>
                <button onClick={() => deleteQuickLink(link.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
              </div>
            ))}
            {state.quickLinks.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No quick links added yet.</p>}
          </div>
        </div>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="bg-white rounded-2xl shadow-xl shadow-primary-900/5 border border-gray-100 overflow-hidden mt-8">
        <div className="bg-primary-50 px-6 py-4 border-b border-primary-100">
          <h2 className="text-lg font-bold text-primary-900 uppercase tracking-wide">School Achievements</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input type="text" placeholder="Achievement Title" value={newAchievement.title} onChange={e => setNewAchievement({...newAchievement, title: e.target.value})} className="flex-1 border-2 border-gray-200 rounded-lg p-2 font-medium focus:border-primary-500 outline-none" />
            <input type="text" placeholder="Description" value={newAchievement.description} onChange={e => setNewAchievement({...newAchievement, description: e.target.value})} className="flex-[2] border-2 border-gray-200 rounded-lg p-2 font-medium focus:border-primary-500 outline-none" />
            <button type="button" onClick={handleAddAchievement} className="bg-primary-900 text-white px-4 py-2 rounded-lg font-bold uppercase text-sm hover:bg-primary-800 flex items-center gap-2 justify-center">
              <Plus size={16} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {(state.achievements || []).map(achievement => (
              <div key={achievement.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-bold text-primary-950">{achievement.title}</span>
                  <span className="text-sm text-gray-500">{achievement.description}</span>
                </div>
                <button onClick={() => deleteAchievement(achievement.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button>
              </div>
            ))}
            {(!state.achievements || state.achievements.length === 0) && <p className="text-gray-500 text-sm text-center py-4">No achievements added yet.</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
