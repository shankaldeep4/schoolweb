import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CmsProvider, useCms } from './context/CmsContext';

import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Admissions from './pages/public/Admissions';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';

import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageNotices from './pages/admin/ManageNotices';
import ManageGallery from './pages/admin/ManageGallery';
import Settings from './pages/admin/Settings';

function AppContent() {
  const { state } = useCms();
  
  useEffect(() => {
    document.documentElement.className = `theme-${state.theme}`;
  }, [state.theme]);

  return (
    <HashRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin CMS Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="notices" element={<ManageNotices />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <AppContent />
    </CmsProvider>
  );
}
