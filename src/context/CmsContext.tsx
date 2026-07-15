import React, { createContext, useContext, useState, useEffect } from 'react';
import { CmsState, MediaItem, Notice, SchoolInfo, Theme, QuickLink, Achievement } from '../types';

const defaultState: CmsState = {
  isAuthenticated: false,
  theme: 'default',
  schoolInfo: {
    name: 'Vidya Global Public School',
    tagline: 'Nurturing Leaders of Tomorrow',
    address: '123 Education Avenue, Knowledge Park, City - 123456',
    phone: '+91 98765 43210',
    email: 'info@vidyaglobal.edu',
    about: 'Vidya Global Public School is committed to providing a stimulating, safe, and supportive environment. We aim to foster academic excellence, physical wellness, and social responsibility.',
    admissionDetails: 'Admissions are open for the academic year 2026-2027. We offer classes from Pre-Nursery to Grade 12. Please visit the school campus between 9:00 AM and 2:00 PM for the admission forms and further queries.',
    logoUrl: '',
    principalName: 'Dr. Jane Smith',
    principalMessage: 'Welcome to Vidya Global Public School. Our mission is to inspire, educate, and empower our students to become global citizens and future leaders. We strive for excellence in all that we do.',
  },
  notices: [
    { id: '1', title: 'Admissions Open for 2026-27', date: '2026-07-01', isImportant: true },
    { id: '2', title: 'Summer Camp Registration Closing Soon', date: '2026-07-10', isImportant: false },
    { id: '3', title: 'Parent-Teacher Meeting for Term 1', date: '2026-07-14', isImportant: true }
  ],
  gallery: [
    { id: '1', type: 'photo', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop', title: 'Campus View', date: '2026-01-15' },
    { id: '2', type: 'photo', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop', title: 'Library', date: '2026-02-20' },
    { id: '3', type: 'photo', url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop', title: 'Annual Sports Day', date: '2026-03-10' },
  ],
  quickLinks: [
    { id: '1', label: 'Admission Form', url: '/admissions', isHighlight: true },
    { id: '2', label: 'Student Portal', url: '#' },
    { id: '3', label: 'Fee Payment', url: '#' },
  ],
  achievements: [
    { id: '1', title: 'Best School Award', description: 'Awarded the Best School in the District for 2025.' },
    { id: '2', title: '100% Board Results', description: 'Our students achieved 100% pass rate in the recent board exams.' },
    { id: '3', title: 'State Level Sports Champions', description: 'Won the state level inter-school sports championship.' }
  ]
};

interface CmsContextType {
  state: CmsState;
  login: () => void;
  logout: () => void;
  setTheme: (theme: Theme) => void;
  updateSchoolInfo: (info: SchoolInfo) => void;
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;
  addMedia: (media: Omit<MediaItem, 'id'>) => void;
  deleteMedia: (id: string) => void;
  addQuickLink: (link: Omit<QuickLink, 'id'>) => void;
  deleteQuickLink: (id: string) => void;
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  deleteAchievement: (id: string) => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CmsState>(() => {
    const saved = localStorage.getItem('school_cms_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          schoolInfo: { ...defaultState.schoolInfo, ...(parsed.schoolInfo || {}) },
          quickLinks: parsed.quickLinks || defaultState.quickLinks,
          theme: parsed.theme || defaultState.theme,
          gallery: parsed.gallery || defaultState.gallery,
          notices: parsed.notices || defaultState.notices,
          achievements: parsed.achievements || defaultState.achievements,
        };
      } catch (e) {
        console.error('Failed to parse CMS state from local storage', e);
      }
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem('school_cms_state', JSON.stringify(state));
  }, [state]);

  const login = () => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const logout = () => {
    setState(prev => ({ ...prev, isAuthenticated: false }));
  };

  const setTheme = (theme: Theme) => {
    setState(prev => ({ ...prev, theme }));
  };

  const updateSchoolInfo = (info: SchoolInfo) => {
    setState(prev => ({ ...prev, schoolInfo: info }));
  };

  const addNotice = (notice: Omit<Notice, 'id'>) => {
    setState(prev => ({
      ...prev,
      notices: [{ ...notice, id: Date.now().toString() }, ...prev.notices]
    }));
  };

  const deleteNotice = (id: string) => {
    setState(prev => ({
      ...prev,
      notices: prev.notices.filter(n => n.id !== id)
    }));
  };

  const addMedia = (media: Omit<MediaItem, 'id'>) => {
    setState(prev => ({
      ...prev,
      gallery: [{ ...media, id: Date.now().toString() }, ...prev.gallery]
    }));
  };

  const deleteMedia = (id: string) => {
    setState(prev => ({
      ...prev,
      gallery: prev.gallery.filter(m => m.id !== id)
    }));
  };

  const addQuickLink = (link: Omit<QuickLink, 'id'>) => {
    setState(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { ...link, id: Date.now().toString() }]
    }));
  };

  const deleteQuickLink = (id: string) => {
    setState(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter(l => l.id !== id)
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    setState(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), { ...achievement, id: Date.now().toString() }]
    }));
  };

  const deleteAchievement = (id: string) => {
    setState(prev => ({
      ...prev,
      achievements: (prev.achievements || []).filter(a => a.id !== id)
    }));
  };

  return (
    <CmsContext.Provider value={{ state, login, logout, setTheme, updateSchoolInfo, addNotice, deleteNotice, addMedia, deleteMedia, addQuickLink, deleteQuickLink, addAchievement, deleteAchievement }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error('useCms must be used within CmsProvider');
  return context;
};
