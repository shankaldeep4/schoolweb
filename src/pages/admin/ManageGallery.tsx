import React, { useState, useRef } from 'react';
import { useCms } from '../../context/CmsContext';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function ManageGallery() {
  const { state, addMedia, deleteMedia } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'photo' as 'photo' | 'video',
    date: new Date().toISOString().split('T')[0]
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
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
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
        setFormData(prev => ({ ...prev, url: dataUrl }));
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      alert('Please upload an image or provide a URL.');
      return;
    }
    addMedia(formData);
    setIsOpen(false);
    setFormData({ title: '', url: '', type: 'photo', date: new Date().toISOString().split('T')[0] });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Gallery</h1>
          <p className="text-gray-600">Upload and manage school photos and videos.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> Add Media
        </button>
      </div>

      {isOpen && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Media</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="e.g., Annual Sports Day 2026"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
              <select 
                value={formData.type}
                onChange={e => {
                  setFormData({...formData, type: e.target.value as 'photo'|'video', url: ''});
                }}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="photo">Photo Image (Upload)</option>
                <option value="video">Video Embed URL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                required
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'photo' ? 'Upload Photo' : 'Video/Thumbnail URL'}
              </label>
              
              {formData.type === 'photo' ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                  <div className="space-y-1 text-center">
                    {formData.url ? (
                      <div className="mb-4">
                        <img src={formData.url} alt="Preview" className="mx-auto h-32 object-cover rounded shadow-sm" />
                        <button type="button" onClick={() => setFormData({...formData, url: ''})} className="mt-2 text-sm text-red-600 font-medium hover:text-red-700">Remove Photo</button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center mt-2">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 px-3 py-2 border border-primary-200 shadow-sm transition-colors">
                            <span>Select a file from device</span>
                            <input ref={fileInputRef} type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF</p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <input 
                  required
                  type="url" 
                  value={formData.url}
                  onChange={e => setFormData({...formData, url: e.target.value})}
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="https://..."
                />
              )}
            </div>
            <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">Save Media</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.gallery.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <div className="aspect-video bg-gray-100 relative">
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 flex gap-2">
                <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur uppercase font-bold tracking-wider">
                  {item.type}
                </span>
              </div>
            </div>
            <div className="p-4 flex justify-between items-start">
              <div>
                <h3 className="font-bold text-gray-900 truncate pr-4">{item.title}</h3>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => deleteMedia(item.id)}
                className="text-red-500 hover:text-red-700 p-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                title="Delete Media"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        
        {state.gallery.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No media uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
