import { useState, useEffect } from 'react';
import { supabase, Homepage, ServiceCard, AboutPage, AboutCard, Project, ProjectSection, GalleryItem } from '../lib/supabase';

type HomepageCache = {
  homepage: Homepage | null;
  services: ServiceCard[];
};

type ProjectDetailCache = {
  project: Project | null;
  sections: ProjectSection[];
  gallery: GalleryItem[];
};

let homepageCache: HomepageCache | null = null;
let projectsCache: Project[] | null = null;
const projectDetailsCache = new Map<string, ProjectDetailCache>();

let homepageInFlight: Promise<HomepageCache> | null = null;
let projectsInFlight: Promise<Project[]> | null = null;
const projectInFlight = new Map<string, Promise<ProjectDetailCache>>();

async function fetchHomepageData(): Promise<HomepageCache> {
  if (homepageCache) {
    return homepageCache;
  }

  if (homepageInFlight) {
    return homepageInFlight;
  }

  homepageInFlight = (async () => {
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

    const payload = {
      homepage: homepageData,
      services: servicesData || [],
    };

    homepageCache = payload;
    homepageInFlight = null;
    return payload;
  })();

  try {
    return await homepageInFlight;
  } finally {
    homepageInFlight = null;
  }
}

async function fetchProjectsData(): Promise<Project[]> {
  if (projectsCache) {
    return projectsCache;
  }

  if (projectsInFlight) {
    return projectsInFlight;
  }

  projectsInFlight = (async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('order_index');

    if (error) throw error;
    const payload = data || [];
    projectsCache = payload;
    projectsInFlight = null;
    return payload;
  })();

  try {
    return await projectsInFlight;
  } finally {
    projectsInFlight = null;
  }
}

async function fetchProjectDetailData(projectId: string): Promise<ProjectDetailCache> {
  const cached = projectDetailsCache.get(projectId);
  if (cached) {
    return cached;
  }

  const running = projectInFlight.get(projectId);
  if (running) {
    return running;
  }

  const request = (async () => {
    const [projectResult, sectionsResult, galleryResult] = await Promise.all([
      supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('is_active', true)
        .single(),
      supabase
        .from('project_sections')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index'),
      supabase
        .from('project_gallery')
        .select('*')
        .eq('project_id', projectId)
        .order('order_index'),
    ]);

    if (projectResult.error) throw projectResult.error;
    if (sectionsResult.error) throw sectionsResult.error;
    if (galleryResult.error) throw galleryResult.error;

    const payload = {
      project: projectResult.data,
      sections: sectionsResult.data || [],
      gallery: galleryResult.data || [],
    };

    projectDetailsCache.set(projectId, payload);
    projectInFlight.delete(projectId);
    return payload;
  })();

  projectInFlight.set(projectId, request);

  try {
    return await request;
  } finally {
    projectInFlight.delete(projectId);
  }
}

export function prefetchProjectDetails(projectId: string) {
  if (!projectId || projectDetailsCache.has(projectId) || projectInFlight.has(projectId)) return;
  void fetchProjectDetailData(projectId);
}

// Homepage数据hook
export function useHomepage() {
  const [homepage, setHomepage] = useState<Homepage | null>(homepageCache?.homepage ?? null);
  const [services, setServices] = useState<ServiceCard[]>(homepageCache?.services ?? []);
  const [loading, setLoading] = useState(homepageCache ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchHomepage() {
      try {
        setError(null);
        setLoading(true);
        const payload = await fetchHomepageData();
        if (!mounted) return;

        setHomepage(payload.homepage);
        setServices(payload.services);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    if (!homepageCache) {
      fetchHomepage();
    }

    return () => {
      mounted = false;
    };
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
  const [projects, setProjects] = useState<Project[]>(projectsCache ?? []);
  const [loading, setLoading] = useState(projectsCache ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProjects() {
      try {
        setError(null);
        setLoading(true);
        const payload = await fetchProjectsData();
        if (!mounted) return;
        setProjects(payload);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    if (!projectsCache) {
      fetchProjects();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return { projects, loading, error };
}

// 单个项目详情数据hook
export function useProject(projectId: string | null) {
  const initialCache = projectId ? projectDetailsCache.get(projectId) : null;
  const [project, setProject] = useState<Project | null>(initialCache?.project ?? null);
  const [sections, setSections] = useState<ProjectSection[]>(initialCache?.sections ?? []);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialCache?.gallery ?? []);
  const [loading, setLoading] = useState(initialCache ? false : true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!projectId) {
      setProject(null);
      setSections([]);
      setGallery([]);
      setLoading(false);
      return;
    }

    async function fetchProject() {
      try {
        setError(null);
        const cached = projectDetailsCache.get(projectId);
        if (cached) {
          setProject(cached.project);
          setSections(cached.sections);
          setGallery(cached.gallery);
          setLoading(false);
          return;
        }

        setLoading(true);
        const payload = await fetchProjectDetailData(projectId);
        if (!mounted) return;
        setProject(payload.project);
        setSections(payload.sections);
        setGallery(payload.gallery);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    fetchProject();

    return () => {
      mounted = false;
    };
  }, [projectId]);

  return { project, sections, gallery, loading, error };
}
