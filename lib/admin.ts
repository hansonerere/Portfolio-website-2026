import { supabase, AboutCard, AboutPage, Client, ContactInfo, GalleryItem, Homepage, Project, ProjectSection, ServiceCard } from './supabase';

const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'site-assets';

export interface AdminHomepageRecord extends Omit<Homepage, 'services'> {}
export interface AdminAboutPageRecord extends Omit<AboutPage, 'cards'> {}

export interface AdminAboutCard extends AboutCard {
  about_page_id: number;
}

export interface AdminServiceCard extends ServiceCard {
  homepage_id: number;
}

export interface AdminProjectSection extends ProjectSection {
  project_id: string;
}

export interface AdminGalleryItem extends GalleryItem {
  project_id: string;
}

export interface AdminProject extends Project {
  order_index: number;
}

export interface AdminContentData {
  homepage: AdminHomepageRecord | null;
  services: AdminServiceCard[];
  aboutPage: AdminAboutPageRecord | null;
  aboutCards: AdminAboutCard[];
  projects: AdminProject[];
  projectSections: AdminProjectSection[];
  projectGallery: AdminGalleryItem[];
}

export async function fetchAdminContent(): Promise<AdminContentData> {
  const [
    homepageResult,
    servicesResult,
    aboutPageResult,
    aboutCardsResult,
    projectsResult,
    projectSectionsResult,
    projectGalleryResult,
  ] = await Promise.all([
    supabase.from('homepage').select('*').order('id').limit(1).maybeSingle(),
    supabase.from('service_cards').select('*').order('order_index'),
    supabase.from('about_page').select('*').order('id').limit(1).maybeSingle(),
    supabase.from('about_cards').select('*').order('order_index'),
    supabase.from('projects').select('*').order('order_index'),
    supabase.from('project_sections').select('*').order('order_index'),
    supabase.from('project_gallery').select('*').order('order_index'),
  ]);

  throwIfError(homepageResult.error);
  throwIfError(servicesResult.error);
  throwIfError(aboutPageResult.error);
  throwIfError(aboutCardsResult.error);
  throwIfError(projectsResult.error);
  throwIfError(projectSectionsResult.error);
  throwIfError(projectGalleryResult.error);

  return {
    homepage: homepageResult.data as AdminHomepageRecord | null,
    services: (servicesResult.data || []) as AdminServiceCard[],
    aboutPage: aboutPageResult.data as AdminAboutPageRecord | null,
    aboutCards: (aboutCardsResult.data || []) as AdminAboutCard[],
    projects: ((projectsResult.data || []) as AdminProject[]).filter(
      (project) => project.title !== 'About me' && project.category !== 'Info',
    ),
    projectSections: (projectSectionsResult.data || []) as AdminProjectSection[],
    projectGallery: (projectGalleryResult.data || []) as AdminGalleryItem[],
  };
}

export async function saveHomepage(homepage: Pick<AdminHomepageRecord, 'id' | 'hero_video_url' | 'hero_video_poster'>) {
  const result = await supabase
    .from('homepage')
    .update({
      hero_video_url: homepage.hero_video_url,
      hero_video_poster: homepage.hero_video_poster || null,
    })
    .eq('id', homepage.id)
    .select()
    .single();

  throwIfError(result.error);
  return result.data as AdminHomepageRecord;
}

export async function createHomepage() {
  const result = await supabase
    .from('homepage')
    .insert({
      hero_video_url: '',
      hero_video_poster: null,
    })
    .select()
    .single();

  throwIfError(result.error);
  return result.data as AdminHomepageRecord;
}

export async function saveServiceCard(card: Pick<AdminServiceCard, 'id' | 'homepage_id' | 'order_index' | 'number' | 'title' | 'description' | 'image_url'>) {
  const payload = {
    homepage_id: card.homepage_id,
    order_index: card.order_index,
    number: card.number,
    title: card.title,
    description: card.description,
    image_url: card.image_url,
  };

  if (!card.id) {
    const result = await supabase.from('service_cards').insert(payload).select().single();
    throwIfError(result.error);
    return result.data as AdminServiceCard;
  }

  const result = await supabase.from('service_cards').update(payload).eq('id', card.id).select().single();
  throwIfError(result.error);
  return result.data as AdminServiceCard;
}

export async function createServiceCard(homepageId: number) {
  const { data, error } = await supabase
    .from('service_cards')
    .select('order_index')
    .eq('homepage_id', homepageId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  return saveServiceCard({
    id: 0,
    homepage_id: homepageId,
    order_index: (data?.order_index || 0) + 1,
    number: '/00',
    title: 'New service',
    description: '',
    image_url: '',
  });
}

export async function deleteServiceCard(id: number) {
  const result = await supabase.from('service_cards').delete().eq('id', id);
  throwIfError(result.error);
}

export async function saveAboutPage(aboutPage: Pick<AdminAboutPageRecord, 'id' | 'hero_title'>) {
  const result = await supabase
    .from('about_page')
    .update({ hero_title: aboutPage.hero_title })
    .eq('id', aboutPage.id)
    .select()
    .single();

  throwIfError(result.error);
  return result.data as AdminAboutPageRecord;
}

export async function createAboutPage() {
  const result = await supabase.from('about_page').insert({ hero_title: 'Hanson' }).select().single();
  throwIfError(result.error);
  return result.data as AdminAboutPageRecord;
}

export async function saveAboutCard(card: Pick<AdminAboutCard, 'id' | 'about_page_id' | 'order_index' | 'number' | 'title' | 'content' | 'image_url' | 'contact_info' | 'clients'>) {
  const payload = {
    about_page_id: card.about_page_id,
    order_index: card.order_index,
    number: card.number,
    title: card.title,
    content: card.content,
    image_url: card.image_url || null,
    contact_info: normalizeJsonField(card.contact_info),
    clients: normalizeJsonField(card.clients),
  };

  if (!card.id) {
    const result = await supabase.from('about_cards').insert(payload).select().single();
    throwIfError(result.error);
    return result.data as AdminAboutCard;
  }

  const result = await supabase.from('about_cards').update(payload).eq('id', card.id).select().single();
  throwIfError(result.error);
  return result.data as AdminAboutCard;
}

export async function createAboutCard(aboutPageId: number) {
  const { data, error } = await supabase
    .from('about_cards')
    .select('order_index')
    .eq('about_page_id', aboutPageId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  return saveAboutCard({
    id: 0,
    about_page_id: aboutPageId,
    order_index: (data?.order_index || 0) + 1,
    number: '/00',
    title: 'New card',
    content: '',
    image_url: '',
    contact_info: [] as ContactInfo[],
    clients: [] as Client[],
  });
}

export async function deleteAboutCard(id: number) {
  const result = await supabase.from('about_cards').delete().eq('id', id);
  throwIfError(result.error);
}

export async function saveProject(project: Pick<AdminProject, 'id' | 'title' | 'description' | 'year' | 'category' | 'cover_image' | 'hero_video_url' | 'hero_video_poster' | 'is_active' | 'order_index'>) {
  const payload = {
    title: project.title,
    description: project.description,
    year: project.year,
    category: project.category,
    cover_image: project.cover_image,
    hero_video_url: project.hero_video_url || null,
    hero_video_poster: project.hero_video_poster || null,
    is_active: project.is_active,
    order_index: project.order_index,
  };

  if (!project.id) {
    const result = await supabase.from('projects').insert({
      id: crypto.randomUUID(),
      ...payload,
    }).select().single();
    throwIfError(result.error);
    return result.data as AdminProject;
  }

  const result = await supabase.from('projects').update(payload).eq('id', project.id).select().single();
  throwIfError(result.error);
  return result.data as AdminProject;
}

export async function createProject() {
  const { data, error } = await supabase
    .from('projects')
    .select('order_index')
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  const result = await supabase.from('projects').insert({
    id: crypto.randomUUID(),
    title: 'New project',
    description: '',
    year: new Date().getFullYear().toString(),
    category: 'Project',
    cover_image: '',
    hero_video_url: '',
    hero_video_poster: '',
    is_active: true,
    order_index: (data?.order_index || 0) + 1,
  }).select().single();

  throwIfError(result.error);
  return result.data as AdminProject;
}

export async function deleteProject(id: string) {
  const result = await supabase.from('projects').delete().eq('id', id);
  throwIfError(result.error);
}

export async function saveProjectSection(section: Pick<AdminProjectSection, 'id' | 'project_id' | 'order_index' | 'title' | 'content'>) {
  const payload = {
    project_id: section.project_id,
    order_index: section.order_index,
    title: section.title,
    content: section.content,
  };

  if (!section.id) {
    const result = await supabase.from('project_sections').insert(payload).select().single();
    throwIfError(result.error);
    return result.data as AdminProjectSection;
  }

  const result = await supabase.from('project_sections').update(payload).eq('id', section.id).select().single();
  throwIfError(result.error);
  return result.data as AdminProjectSection;
}

export async function createProjectSection(projectId: string) {
  const { data, error } = await supabase
    .from('project_sections')
    .select('order_index')
    .eq('project_id', projectId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  return saveProjectSection({
    id: 0,
    project_id: projectId,
    order_index: (data?.order_index || 0) + 1,
    title: 'New section',
    content: '',
  });
}

export async function deleteProjectSection(id: number) {
  const result = await supabase.from('project_sections').delete().eq('id', id);
  throwIfError(result.error);
}

export async function saveGalleryItem(item: Pick<AdminGalleryItem, 'id' | 'project_id' | 'order_index' | 'type' | 'url' | 'alt_text'>) {
  const payload = {
    project_id: item.project_id,
    order_index: item.order_index,
    type: item.type,
    url: item.url,
    alt_text: item.alt_text || null,
  };

  if (!item.id) {
    const result = await supabase.from('project_gallery').insert(payload).select().single();
    throwIfError(result.error);
    return result.data as AdminGalleryItem;
  }

  const result = await supabase.from('project_gallery').update(payload).eq('id', item.id).select().single();
  throwIfError(result.error);
  return result.data as AdminGalleryItem;
}

export async function createGalleryItem(projectId: string, type: 'image' | 'video' = 'image') {
  const { data, error } = await supabase
    .from('project_gallery')
    .select('order_index')
    .eq('project_id', projectId)
    .order('order_index', { ascending: false })
    .limit(1)
    .maybeSingle();

  throwIfError(error);

  return saveGalleryItem({
    id: 0,
    project_id: projectId,
    order_index: (data?.order_index || 0) + 1,
    type,
    url: '',
    alt_text: '',
  });
}

export async function deleteGalleryItem(id: number) {
  const result = await supabase.from('project_gallery').delete().eq('id', id);
  throwIfError(result.error);
}

export async function uploadAsset(file: File, folder: string) {
  const fileExt = file.name.split('.').pop() || 'bin';
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase();
  const filePath = `${folder}/${Date.now()}-${safeName.replace(/\.[^.]+$/, '')}.${fileExt}`;

  const uploadResult = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  throwIfError(uploadResult.error);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export function parseContactInfo(value: string): ContactInfo[] {
  return parseJsonArray<ContactInfo>(value, ['label', 'value', 'type']);
}

export function parseClients(value: string): Client[] {
  return parseJsonArray<Client>(value, ['name', 'year']);
}

function parseJsonArray<T>(value: string, requiredKeys: string[]): T[] {
  const trimmed = value.trim();
  if (!trimmed) return [];

  const parsed = JSON.parse(trimmed);
  if (!Array.isArray(parsed)) {
    throw new Error('JSON must be an array.');
  }

  parsed.forEach((item) => {
    if (typeof item !== 'object' || item === null) {
      throw new Error('JSON items must be objects.');
    }
    requiredKeys.forEach((key) => {
      if (!(key in item)) {
        throw new Error(`Each item must include "${key}".`);
      }
    });
  });

  return parsed as T[];
}

function normalizeJsonField(value: unknown) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return null;
  }
  return value;
}

function throwIfError(error: unknown) {
  if (error) {
    throw error;
  }
}
