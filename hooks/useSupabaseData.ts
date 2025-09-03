import { useState, useEffect } from 'react';
import { supabase, Homepage, ServiceCard, AboutPage, AboutCard, Project, ProjectSection, GalleryItem } from '../lib/supabase';

// Homepage数据hook
export function useHomepage() {
  const [homepage, setHomepage] = useState<Homepage | null>(null);
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHomepage() {
      try {
        setLoading(true);
        
        // 获取首页基本信息
        const { data: homepageData, error: homepageError } = await supabase
          .from('homepage')
          .select('*')
          .limit(1)
          .single();

        if (homepageError) throw homepageError;

        // 获取服务卡片
        const { data: servicesData, error: servicesError } = await supabase
          .from('service_cards')
          .select('*')
          .eq('homepage_id', homepageData.id)
          .order('order_index');

        if (servicesError) throw servicesError;

        setHomepage(homepageData);
        setServices(servicesData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchHomepage();
  }, []);

  return { homepage, services, loading, error };
}

// About页面数据hook
export function useAboutPage() {
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null);
  const [aboutCards, setAboutCards] = useState<AboutCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAboutPage() {
      try {
        setLoading(true);
        
        // 获取About页面基本信息
        const { data: aboutData, error: aboutError } = await supabase
          .from('about_page')
          .select('*')
          .limit(1)
          .single();

        if (aboutError) throw aboutError;

        // 获取About卡片
        const { data: cardsData, error: cardsError } = await supabase
          .from('about_cards')
          .select('*')
          .eq('about_page_id', aboutData.id)
          .order('order_index');

        if (cardsError) throw cardsError;

        setAboutPage(aboutData);
        setAboutCards(cardsData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchAboutPage();
  }, []);

  return { aboutPage, aboutCards, loading, error };
}

// 项目列表数据hook
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_active', true)
          .order('order_index');

        if (error) throw error;

        setProjects(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

// 单个项目详情数据hook
export function useProject(projectId: string | null) {
  const [project, setProject] = useState<Project | null>(null);
  const [sections, setSections] = useState<ProjectSection[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setProject(null);
      setSections([]);
      setGallery([]);
      setLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        setLoading(true);
        
        // 获取项目基本信息
        const { data: projectData, error: projectError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .eq('is_active', true)
          .single();

        if (projectError) throw projectError;

        // 获取项目内容部分
        const { data: sectionsData, error: sectionsError } = await supabase
          .from('project_sections')
          .select('*')
          .eq('project_id', projectId)
          .order('order_index');

        if (sectionsError) throw sectionsError;

        // 获取项目画廊
        const { data: galleryData, error: galleryError } = await supabase
          .from('project_gallery')
          .select('*')
          .eq('project_id', projectId)
          .order('order_index');

        if (galleryError) throw galleryError;

        setProject(projectData);
        setSections(sectionsData || []);
        setGallery(galleryData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [projectId]);

  return { project, sections, gallery, loading, error };
}
