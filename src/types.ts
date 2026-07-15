export interface Notice {
  id: string;
  title: string;
  date: string;
  isImportant: boolean;
}

export interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  title: string;
  date: string;
}

export interface QuickLink {
  id: string;
  label: string;
  url: string;
  isHighlight?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
}

export interface SchoolInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  about: string;
  admissionDetails: string;
  logoUrl?: string;
  principalName?: string;
  principalMessage?: string;
  principalPhotoUrl?: string;
}

export type Theme = 'default' | 'forest' | 'minimal';

export interface CmsState {
  isAuthenticated: boolean;
  theme: Theme;
  schoolInfo: SchoolInfo;
  notices: Notice[];
  gallery: MediaItem[];
  quickLinks: QuickLink[];
  achievements: Achievement[];
}
