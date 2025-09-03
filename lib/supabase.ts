import { createClient } from '@supabase/supabase-js';

// 这些环境变量需要在.env.local中设置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 数据库类型定义
export interface Homepage {
  id: number;
  hero_video_url: string;
  hero_video_poster?: string;
  services: ServiceCard[];
  created_at: string;
  updated_at: string;
}

export interface ServiceCard {
  id: number;
  order_index: number;
  number: string; // /01, /02, etc.
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface AboutPage {
  id: number;
  hero_title: string;
  cards: AboutCard[];
  created_at: string;
  updated_at: string;
}

export interface AboutCard {
  id: number;
  order_index: number;
  number: string; // /01, /02, etc.
  title: string;
  content: string;
  image_url?: string;
  contact_info?: ContactInfo[];
  clients?: Client[];
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  type: 'email' | 'social' | 'text';
}

export interface Client {
  name: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  category: string;
  cover_image: string;
  hero_video_url?: string;
  hero_video_poster?: string;
  content_sections: ProjectSection[];
  gallery_items: GalleryItem[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ProjectSection {
  id: number;
  order_index: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  order_index: number;
  type: 'image' | 'video';
  url: string;
  alt_text?: string;
  created_at: string;
  updated_at: string;
}
