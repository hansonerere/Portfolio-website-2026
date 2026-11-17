import { useEffect, useState } from 'react';
import type { AboutCard, AboutPage, GalleryItem, Homepage, Project, ProjectSection, ServiceCard } from '../lib/content';

export interface ContentSnapshot {
  homepage: Homepage | null;
  services: ServiceCard[];
  aboutPage: AboutPage | null;
  aboutCards: AboutCard[];
  projects: Project[];
  projectSections: (ProjectSection & { project_id: string })[];
  projectGallery: (GalleryItem & { project_id: string })[];
}

let cachedContent: ContentSnapshot | null = null;
let pendingContent: Promise<ContentSnapshot> | null = null;

function validContent(value: unknown): value is ContentSnapshot {
  if (!value || typeof value !== 'object') return false;
  const data = value as ContentSnapshot;
  return Array.isArray(data.projects) && Array.isArray(data.services) && Array.isArray(data.projectSections) && Array.isArray(data.projectGallery) && Array.isArray(data.aboutCards);
}

export async function loadContent(): Promise<ContentSnapshot> {
  if (cachedContent) return cachedContent;
  if (pendingContent) return pendingContent;
  pendingContent = (async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch('/api/content', { signal: controller.signal });
      if (!response.ok) throw new Error('Content API is unavailable.');
      const data: unknown = await response.json();
      if (!validContent(data)) throw new Error('Invalid content response.');
      cachedContent = data;
    } catch {
      const response = await fetch('/content-snapshot.json');
      if (!response.ok) throw new Error('Unable to load website content.');
      const data: unknown = await response.json();
      if (!validContent(data)) throw new Error('Content snapshot is unavailable.');
      cachedContent = data;
    } finally {
      window.clearTimeout(timeout);
    }
    return cachedContent;
  })();
  try { return await pendingContent; } finally { pendingContent = null; }
}

export function prefetchProjectDetails(projectId: string) {
  if (projectId) void loadContent().catch(() => undefined);
}

function useContent() {
  const [data, setData] = useState<ContentSnapshot | null>(cachedContent);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let mounted = true;
    void loadContent().then(value => { if (mounted) setData(value); }).catch(reason => {
      if (mounted) setError(reason instanceof Error ? reason.message : 'Unable to load content.');
    });
    return () => { mounted = false; };
  }, []);
  return { data, error, loading: !data && !error };
}

export function useHomepage() {
  const { data, loading, error } = useContent();
  return { homepage: data?.homepage ?? null, services: data?.services ?? [], loading, error };
}

export function useAboutPage() {
  const { data, loading, error } = useContent();
  return { aboutPage: data?.aboutPage ?? null, aboutCards: data?.aboutCards ?? [], loading, error };
}

export function useProjects() {
  const { data, loading, error } = useContent();
  return { projects: data?.projects ?? [], loading, error };
}

export function useProject(projectId: string | null) {
  const { data, loading, error } = useContent();
  return {
    project: data?.projects.find(project => project.id === projectId) ?? null,
    sections: data?.projectSections.filter(section => section.project_id === projectId) ?? [],
    gallery: data?.projectGallery.filter(item => item.project_id === projectId) ?? [],
    loading, error,
  };
}
