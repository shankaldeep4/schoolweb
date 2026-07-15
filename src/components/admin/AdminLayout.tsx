import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Image as ImageIcon, Settings, LogOut, GraduationCap, Menu, X } from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state, logout } = useCms();

  if (!state.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Manage Notices', path: '/admin/notices', icon: Megaphone },
    { name: 'Manage Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'School Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-primary-900 text-white z-50 transform transition-transform duration-200 ease-in-out flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-4 flex items-center justify-between border-b border-primary-800">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-accent-400" />
            <span className="text-lg font-bold">Admin Portal</span>
          </div>
          <button className="md:hidden text-gray-300" onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-primary-800 text-accent-400 font-medium' : 'text-primary-100 hover:bg-primary-800'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary-800">
          <button onClick={handleLogout} className="flex items-center gap-3 text-primary-200 hover:text-white w-full px-4 py-2 transition-colors">
            <LogOut size={20} />
            Back to Website
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center px-4 justify-between shrink-0">
          <button className="md:hidden text-gray-600 p-2" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="font-medium text-gray-800 hidden md:block">
            Content Management System
          </div>
          <div className="text-sm bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
            Admin Logged In
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
