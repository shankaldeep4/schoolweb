import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Plus, Trash2 } from 'lucide-react';

export default function ManageNotices() {
  const { state, addNotice, deleteNotice } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    isImportant: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotice(formData);
    setIsOpen(false);
    setFormData({ title: '', date: new Date().toISOString().split('T')[0], isImportant: false });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Notices</h1>
          <p className="text-gray-600">Post announcements and updates for the notice board.</p>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={20} /> New Notice
        </button>
      </div>

      {isOpen && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
          <h2 className="text-xl font-bold mb-4">Create Notice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
              <input 
                required
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="e.g., School Closed Tomorrow"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.isImportant}
                    onChange={e => setFormData({...formData, isImportant: e.target.checked})}
                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Mark as Important (Red Highlight)</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">Publish Notice</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600 text-sm">Notice Title</th>
              <th className="p-4 font-semibold text-gray-600 text-sm w-32">Date</th>
              <th className="p-4 font-semibold text-gray-600 text-sm w-24">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-sm w-20 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {state.notices.map(notice => (
              <tr key={notice.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{notice.title}</td>
                <td className="p-4 text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()}</td>
                <td className="p-4">
                  {notice.isImportant ? (
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">Important</span>
                  ) : (
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Standard</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => deleteNotice(notice.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {state.notices.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No notices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
