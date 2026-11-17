import type { AboutCard, AboutPage, Client, ContactInfo, GalleryItem, Homepage, Project, ProjectSection, ServiceCard } from './content';
import { api } from './api';
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
  const data = await api<AdminContentData>('/api/admin/content');
  return { ...data, projects: data.projects.filter(project => project.title !== 'About me' && project.category !== 'Info') };
}

function pick(value: object, fields: string[]) {
  return Object.fromEntries(fields.map(field => [field, Reflect.get(value, field) ?? null]));
}

function saveRecord<T>(table: string, id: string | number, values: object) {
  return api<T>('/api/admin/records', { method: id ? 'PUT' : 'POST', body: JSON.stringify({ table, id: id || undefined, values }) });
}

function removeRecord(table: string, id: number | string) {
  return api<{ ok: boolean }>('/api/admin/records', { method: 'DELETE', body: JSON.stringify({ table, id }) });
}

function nextOrder(items: { order_index: number }[]) {
  return Math.max(0, ...items.map(item => item.order_index)) + 1;
}

export function saveHomepage(item: Pick<AdminHomepageRecord, 'id' | 'hero_video_url' | 'hero_video_poster'>) {
  return saveRecord<AdminHomepageRecord>('homepage', item.id, pick(item, ['hero_video_url', 'hero_video_poster']));
}
export function createHomepage() {
  return saveRecord<AdminHomepageRecord>('homepage', 0, { hero_video_url: '', hero_video_poster: null });
}
export function saveServiceCard(item: Pick<AdminServiceCard, 'id' | 'homepage_id' | 'order_index' | 'number' | 'title' | 'description' | 'image_url'>) {
  return saveRecord<AdminServiceCard>('service_cards', item.id, pick(item, ['homepage_id', 'order_index', 'number', 'title', 'description', 'image_url']));
}
export async function createServiceCard(homepageId: number) {
  const data = await fetchAdminContent();
  return saveServiceCard({ id: 0, homepage_id: homepageId, order_index: nextOrder(data.services.filter(item => item.homepage_id === homepageId)), number: '/00', title: 'New service', description: '', image_url: '' });
}
export const deleteServiceCard = (id: number) => removeRecord('service_cards', id);

export function saveAboutPage(item: Pick<AdminAboutPageRecord, 'id' | 'hero_title'>) {
  return saveRecord<AdminAboutPageRecord>('about_page', item.id, { hero_title: item.hero_title });
}
export function createAboutPage() { return saveRecord<AdminAboutPageRecord>('about_page', 0, { hero_title: 'Hanson' }); }
export function saveAboutCard(item: Pick<AdminAboutCard, 'id' | 'about_page_id' | 'order_index' | 'number' | 'title' | 'content' | 'image_url' | 'contact_info' | 'clients'>) {
  return saveRecord<AdminAboutCard>('about_cards', item.id, pick(item, ['about_page_id', 'order_index', 'number', 'title', 'content', 'image_url', 'contact_info', 'clients']));
}
export async function createAboutCard(aboutPageId: number) {
  const data = await fetchAdminContent();
  return saveAboutCard({ id: 0, about_page_id: aboutPageId, order_index: nextOrder(data.aboutCards.filter(item => item.about_page_id === aboutPageId)), number: '/00', title: 'New card', content: '', image_url: '', contact_info: [], clients: [] });
}
export const deleteAboutCard = (id: number) => removeRecord('about_cards', id);

export function saveProject(item: Pick<AdminProject, 'id' | 'title' | 'description' | 'year' | 'category' | 'cover_image' | 'hero_video_url' | 'hero_video_poster' | 'is_active' | 'order_index'>) {
  return saveRecord<AdminProject>('projects', item.id, pick(item, ['title', 'description', 'year', 'category', 'cover_image', 'hero_video_url', 'hero_video_poster', 'is_active', 'order_index']));
}
export async function createProject() {
  const data = await fetchAdminContent();
  return saveProject({ id: '', title: 'New project', description: '', year: new Date().getFullYear().toString(), category: 'Project', cover_image: '', hero_video_url: '', hero_video_poster: '', is_active: true, order_index: nextOrder(data.projects) });
}
export const deleteProject = (id: string) => removeRecord('projects', id);

export function saveProjectSection(item: Pick<AdminProjectSection, 'id' | 'project_id' | 'order_index' | 'title' | 'content'>) {
  return saveRecord<AdminProjectSection>('project_sections', item.id, pick(item, ['project_id', 'order_index', 'title', 'content']));
}
export async function createProjectSection(projectId: string) {
  const data = await fetchAdminContent();
  return saveProjectSection({ id: 0, project_id: projectId, order_index: nextOrder(data.projectSections.filter(item => item.project_id === projectId)), title: 'New section', content: '' });
}
export const deleteProjectSection = (id: number) => removeRecord('project_sections', id);

export function saveGalleryItem(item: Pick<AdminGalleryItem, 'id' | 'project_id' | 'order_index' | 'type' | 'layout_span' | 'url' | 'alt_text'>) {
  return saveRecord<AdminGalleryItem>('project_gallery', item.id, pick({ ...item, layout_span: item.layout_span || 'half' }, ['project_id', 'order_index', 'type', 'layout_span', 'url', 'alt_text']));
}
export async function createGalleryItem(projectId: string, type: 'image' | 'video' = 'image') {
  const data = await fetchAdminContent();
  return saveGalleryItem({ id: 0, project_id: projectId, order_index: nextOrder(data.projectGallery.filter(item => item.project_id === projectId)), type, layout_span: 'half', url: '', alt_text: '' });
}
export const deleteGalleryItem = (id: number) => removeRecord('project_gallery', id);
export function saveGalleryOrder(projectId: string, ids: number[]) {
  return api<{ ok: boolean }>('/api/admin/gallery-order', { method: 'POST', body: JSON.stringify({ projectId, ids }) });
}

export async function uploadAsset(file: File, folder: string) {
  const body = new FormData();
  body.append('file', file);
  body.append('folder', folder);
  const result = await api<{ url: string }>('/api/upload', { method: 'POST', body });
  return result.url;
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
