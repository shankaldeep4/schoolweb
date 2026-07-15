import React from 'react';
import { useCms } from '../../context/CmsContext';
import { Users, GraduationCap, Image, Bell } from 'lucide-react';

export default function Dashboard() {
  const { state } = useCms();
  
  const stats = [
    { title: 'Total Notices', value: state.notices.length, icon: Bell, color: 'bg-primary-500' },
    { title: 'Gallery Items', value: state.gallery.length, icon: Image, color: 'bg-green-500' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome to the School Content Management System.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
              <div className={`${stat.color} text-white p-4 rounded-lg shadow-inner`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Bell className="text-primary-500" /> Recent Notices
          </h2>
          {state.notices.length > 0 ? (
            <ul className="divide-y divide-gray-100">
              {state.notices.slice(0, 5).map(notice => (
                <li key={notice.id} className="py-3 flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{notice.title}</p>
                    <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
                  </div>
                  {notice.isImportant && (
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Important</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No notices available.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Image className="text-green-500" /> School Information
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">School Name</p>
              <p className="font-medium text-gray-900">{state.schoolInfo.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Contact Email</p>
              <p className="font-medium text-gray-900">{state.schoolInfo.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
              <p className="font-medium text-gray-900">{state.schoolInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
