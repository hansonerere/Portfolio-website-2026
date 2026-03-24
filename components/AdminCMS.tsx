import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import {
  AdminGalleryItem,
  AdminProject,
  AdminProjectSection,
  AdminServiceCard,
  createGalleryItem,
  createHomepage,
  createProject,
  createProjectSection,
  createServiceCard,
  deleteGalleryItem,
  deleteProject,
  deleteProjectSection,
  deleteServiceCard,
  fetchAdminContent,
  saveGalleryItem,
  saveHomepage,
  saveProject,
  saveProjectSection,
  saveServiceCard,
  uploadAsset,
} from '../lib/admin';

type Notice = {
  type: 'success' | 'error';
  text: string;
};

type AdminView = 'homepage' | 'projects';

function cls(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

function toStorageFolderName(value: string, fallback: string) {
  const normalized = value
    .trim()
    .replace(/[\\/]+/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/^\.+|\.+$/g, '');

  return normalized || fallback;
}

function getProjectStorageBase(project: AdminProject) {
  return toStorageFolderName(project.title, project.id);
}

export function AdminCMS() {
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);
  const [activeView, setActiveView] = useState<AdminView>('homepage');

  const [homepage, setHomepage] = useState<{ id: number; hero_video_url: string; hero_video_poster?: string } | null>(null);
  const [services, setServices] = useState<AdminServiceCard[]>([]);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [sections, setSections] = useState<AdminProjectSection[]>([]);
  const [gallery, setGallery] = useState<AdminGalleryItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) || null,
    [projects, selectedProjectId],
  );

  const selectedProjectSections = useMemo(
    () =>
      sections
        .filter((section) => section.project_id === selectedProjectId)
        .sort((a, b) => a.order_index - b.order_index),
    [sections, selectedProjectId],
  );

  const selectedProjectGallery = useMemo(
    () =>
      gallery
        .filter((item) => item.project_id === selectedProjectId)
        .sort((a, b) => a.order_index - b.order_index),
    [gallery, selectedProjectId],
  );

  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchAdminContent();
      const homepageRecord = data.homepage ?? (await createHomepage());

      setHomepage({
        id: homepageRecord.id,
        hero_video_url: homepageRecord.hero_video_url,
        hero_video_poster: homepageRecord.hero_video_poster || '',
      });
      setServices(
        data.services.map((service) => ({
          ...service,
          homepage_id: homepageRecord.id,
        })),
      );
      setProjects(data.projects);
      setSections(data.projectSections);
      setGallery(data.projectGallery);
      setSelectedProjectId((current) => current || data.projects[0]?.id || null);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }

  function showSuccess(text: string) {
    setNotice({ type: 'success', text });
  }

  function showError(error: unknown) {
    let text = 'Something went wrong.';

    if (error instanceof Error && error.message) {
      text = error.message;
    } else if (typeof error === 'object' && error !== null) {
      const maybeMessage = 'message' in error ? String((error as { message?: unknown }).message || '') : '';
      const maybeDetails = 'details' in error ? String((error as { details?: unknown }).details || '') : '';
      text = maybeMessage || maybeDetails || JSON.stringify(error);
    }

    setNotice({ type: 'error', text });
  }

  async function runAction(key: string, action: () => Promise<void>) {
    try {
      setSavingKey(key);
      setNotice(null);
      await action();
    } catch (error) {
      showError(error);
    } finally {
      setSavingKey(null);
    }
  }

  function updateService(id: number, field: keyof AdminServiceCard, value: string | number) {
    setServices((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function updateProjectState(id: string, field: keyof AdminProject, value: string | boolean | number) {
    setProjects((items) => items.map((item) => (item.id === id ? ({ ...item, [field]: value } as AdminProject) : item)));
  }

  function updateSectionState(id: number, field: keyof AdminProjectSection, value: string | number) {
    setSections((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  }

  function updateGalleryState(id: number, field: keyof AdminGalleryItem, value: string | number) {
    setGallery((items) => items.map((item) => (item.id === id ? ({ ...item, [field]: value } as AdminGalleryItem) : item)));
  }

  async function handleUpload(file: File | null, folder: string, onUploaded: (url: string) => void) {
    if (!file) return;

    await runAction(`upload-${folder}-${file.name}`, async () => {
      const url = await uploadAsset(file, folder);
      onUploaded(url);
      showSuccess('Asset uploaded to Supabase Storage.');
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading admin panel...</p>
          <p className="text-sm text-[#9e9e9e] mt-2">Fetching content from Supabase</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-[#eeeeee]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#9e9e9e]">Admin CMS</p>
            <h1 className="text-3xl md:text-5xl font-['Red_Hat_Display'] font-bold leading-none mt-2">Website Content Manager</h1>
            <p className="text-[#9e9e9e] mt-3 max-w-2xl">
              Homepage and project settings are now separated. Media uploads go directly to your Supabase Storage bucket.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/" className="rounded-full bg-[#212121] hover:bg-[#2a2a2a] px-5 py-3 text-sm transition-colors">
              Back to site
            </a>
            <button
              type="button"
              onClick={loadData}
              className="rounded-full bg-[#eeeeee] text-[#0f0f0f] hover:bg-white px-5 py-3 text-sm font-medium transition-colors"
            >
              Refresh data
            </button>
          </div>
        </header>

        <div className="flex flex-wrap gap-3">
          <TabButton active={activeView === 'homepage'} onClick={() => setActiveView('homepage')}>
            Homepage
          </TabButton>
          <TabButton active={activeView === 'projects'} onClick={() => setActiveView('projects')}>
            Projects
          </TabButton>
        </div>

        {notice && (
          <div
            className={cls(
              'rounded-2xl border px-4 py-3 text-sm',
              notice.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                : 'bg-red-500/10 border-red-500/30 text-red-200',
            )}
          >
            {notice.text}
          </div>
        )}

        {activeView === 'homepage' ? (
          <section className="rounded-3xl bg-[#171717] border border-[#2a2a2a] p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Homepage settings</h2>
                <p className="text-sm text-[#9e9e9e] mt-1">Manage hero media and service cards only.</p>
              </div>
              {homepage && (
                <button
                  type="button"
                  disabled={savingKey === 'homepage'}
                  onClick={() =>
                    runAction('homepage', async () => {
                      await saveHomepage(homepage);
                      showSuccess('Homepage saved.');
                    })
                  }
                  className="rounded-full bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 text-sm font-medium disabled:opacity-50"
                >
                  Save homepage
                </button>
              )}
            </div>

            {homepage && (
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Hero video URL">
                  <input
                    value={homepage.hero_video_url}
                    onChange={(event) => setHomepage({ ...homepage, hero_video_url: event.target.value })}
                    className={inputClass}
                  />
                </Field>
                <UploadField
                  label="Hero video poster"
                  value={homepage.hero_video_poster || ''}
                  onChange={(value) => setHomepage({ ...homepage, hero_video_poster: value })}
                  onUpload={(file) =>
                    handleUpload(file, 'home page/posters', (url) =>
                      setHomepage((current) => (current ? { ...current, hero_video_poster: url } : current)),
                    )
                  }
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <h3 className="text-lg font-medium">Service cards</h3>
              {homepage && (
                <button
                  type="button"
                  onClick={() =>
                    runAction('create-service', async () => {
                      const created = await createServiceCard(homepage.id);
                      setServices((items) => [...items, { ...created, homepage_id: homepage.id }]);
                      showSuccess('Service card created.');
                    })
                  }
                  className={secondaryButtonClass}
                >
                  Add service card
                </button>
              )}
            </div>

            <div className="space-y-4">
              {services
                .sort((a, b) => a.order_index - b.order_index)
                .map((service) => (
                  <div key={service.id} className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 space-y-4">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h4 className="font-medium">{service.title || 'Untitled service'}</h4>
                        <p className="text-xs text-[#9e9e9e] mt-1">ID {service.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            runAction(`save-service-${service.id}`, async () => {
                              await saveServiceCard(service);
                              showSuccess('Service card saved.');
                            })
                          }
                          className={secondaryButtonClass}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            runAction(`delete-service-${service.id}`, async () => {
                              await deleteServiceCard(service.id);
                              setServices((items) => items.filter((item) => item.id !== service.id));
                              showSuccess('Service card deleted.');
                            })
                          }
                          className={dangerButtonClass}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <Field label="Order">
                        <input type="number" value={service.order_index} onChange={(event) => updateService(service.id, 'order_index', Number(event.target.value))} className={inputClass} />
                      </Field>
                      <Field label="Number">
                        <input value={service.number} onChange={(event) => updateService(service.id, 'number', event.target.value)} className={inputClass} />
                      </Field>
                      <Field label="Title">
                        <input value={service.title} onChange={(event) => updateService(service.id, 'title', event.target.value)} className={inputClass} />
                      </Field>
                      <UploadField
                        label="Image URL"
                        value={service.image_url}
                        onChange={(value) => updateService(service.id, 'image_url', value)}
                        onUpload={(file) => handleUpload(file, 'home page/services', (url) => updateService(service.id, 'image_url', url))}
                      />
                    </div>

                    <Field label="Description">
                      <textarea value={service.description} onChange={(event) => updateService(service.id, 'description', event.target.value)} className={textareaClass} rows={3} />
                    </Field>
                  </div>
                ))}
            </div>
          </section>
        ) : (
          <section className="rounded-3xl bg-[#171717] border border-[#2a2a2a] p-5 md:p-6 space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h2 className="text-xl font-semibold">Project settings</h2>
                <p className="text-sm text-[#9e9e9e] mt-1">Manage project metadata, sections, and gallery assets.</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  runAction('create-project', async () => {
                    const created = await createProject();
                    setProjects((items) => [...items, created]);
                    setSelectedProjectId(created.id);
                    showSuccess('Project created.');
                  })
                }
                className={secondaryButtonClass}
              >
                Add project
              </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-[320px,minmax(0,1fr)]">
              <aside className="space-y-3 rounded-2xl border border-[#2a2a2a] bg-[#111111] p-3 max-h-[75vh] overflow-y-auto">
                {projects
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setSelectedProjectId(project.id)}
                      className={cls(
                        'w-full rounded-2xl border p-3 text-left transition-colors',
                        selectedProjectId === project.id
                          ? 'border-[#eeeeee] bg-[#f4f4f4] text-[#0f0f0f]'
                          : 'border-[#2a2a2a] bg-[#171717] hover:bg-[#1e1e1e]',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{project.title}</span>
                        <span className="text-xs opacity-70">{project.year}</span>
                      </div>
                      <p className={cls('mt-2 text-sm line-clamp-2', selectedProjectId === project.id ? 'text-[#333333]' : 'text-[#9e9e9e]')}>
                        {project.description || 'No description yet.'}
                      </p>
                    </button>
                  ))}
              </aside>

              <div className="space-y-5">
                {selectedProject ? (
                  <>
                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 space-y-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{selectedProject.title || 'Untitled project'}</h3>
                          <p className="text-xs text-[#9e9e9e] mt-1">{selectedProject.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              runAction(`save-project-${selectedProject.id}`, async () => {
                                const saved = await saveProject(selectedProject);
                                setProjects((items) => items.map((item) => (item.id === saved.id ? saved : item)));
                                showSuccess('Project saved.');
                              })
                            }
                            className={secondaryButtonClass}
                          >
                            Save project
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              runAction(`delete-project-${selectedProject.id}`, async () => {
                                await deleteProject(selectedProject.id);
                                setProjects((items) => items.filter((item) => item.id !== selectedProject.id));
                                setSelectedProjectId((current) => (current === selectedProject.id ? null : current));
                                showSuccess('Project deleted.');
                              })
                            }
                            className={dangerButtonClass}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <Field label="Order">
                          <input type="number" value={selectedProject.order_index} onChange={(event) => updateProjectState(selectedProject.id, 'order_index', Number(event.target.value))} className={inputClass} />
                        </Field>
                        <Field label="Title">
                          <input value={selectedProject.title} onChange={(event) => updateProjectState(selectedProject.id, 'title', event.target.value)} className={inputClass} />
                        </Field>
                        <Field label="Year">
                          <input value={selectedProject.year} onChange={(event) => updateProjectState(selectedProject.id, 'year', event.target.value)} className={inputClass} />
                        </Field>
                        <Field label="Category">
                          <input value={selectedProject.category} onChange={(event) => updateProjectState(selectedProject.id, 'category', event.target.value)} className={inputClass} />
                        </Field>
                      </div>

                      <Field label="Description">
                        <textarea value={selectedProject.description} onChange={(event) => updateProjectState(selectedProject.id, 'description', event.target.value)} className={textareaClass} rows={4} />
                      </Field>

                      <div className="grid gap-4 md:grid-cols-2">
                        <UploadField
                          label="Cover image"
                          value={selectedProject.cover_image}
                          onChange={(value) => updateProjectState(selectedProject.id, 'cover_image', value)}
                          onUpload={(file) =>
                            handleUpload(file, `${getProjectStorageBase(selectedProject)}/cover`, (url) =>
                              updateProjectState(selectedProject.id, 'cover_image', url),
                            )
                          }
                        />
                        <UploadField
                          label="Hero video poster"
                          value={selectedProject.hero_video_poster || ''}
                          onChange={(value) => updateProjectState(selectedProject.id, 'hero_video_poster', value)}
                          onUpload={(file) =>
                            handleUpload(file, `${getProjectStorageBase(selectedProject)}/hero-poster`, (url) =>
                              updateProjectState(selectedProject.id, 'hero_video_poster', url),
                            )
                          }
                        />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <UploadField
                          label="Hero video URL"
                          value={selectedProject.hero_video_url || ''}
                          onChange={(value) => updateProjectState(selectedProject.id, 'hero_video_url', value)}
                          accept="video/*"
                          onUpload={(file) =>
                            handleUpload(file, `${getProjectStorageBase(selectedProject)}/hero-video`, (url) =>
                              updateProjectState(selectedProject.id, 'hero_video_url', url),
                            )
                          }
                        />
                        <label className="flex items-center gap-3 rounded-2xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-sm">
                          <input
                            type="checkbox"
                            checked={selectedProject.is_active}
                            onChange={(event) => updateProjectState(selectedProject.id, 'is_active', event.target.checked)}
                            className="h-4 w-4"
                          />
                          Project visible on website
                        </label>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Project sections</h3>
                        <button
                          type="button"
                          onClick={() =>
                            runAction(`create-section-${selectedProject.id}`, async () => {
                              const created = await createProjectSection(selectedProject.id);
                              setSections((items) => [...items, created]);
                              showSuccess('Project section created.');
                            })
                          }
                          className={secondaryButtonClass}
                        >
                          Add section
                        </button>
                      </div>

                      <div className="space-y-4">
                        {selectedProjectSections.map((section) => (
                          <div key={section.id} className="rounded-2xl border border-[#2a2a2a] bg-[#171717] p-4 space-y-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <div>
                                <h4 className="font-medium">{section.title || 'Untitled section'}</h4>
                                <p className="text-xs text-[#9e9e9e] mt-1">ID {section.id}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    runAction(`save-section-${section.id}`, async () => {
                                      const saved = await saveProjectSection(section);
                                      setSections((items) => items.map((item) => (item.id === saved.id ? saved : item)));
                                      showSuccess('Section saved.');
                                    })
                                  }
                                  className={secondaryButtonClass}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    runAction(`delete-section-${section.id}`, async () => {
                                      await deleteProjectSection(section.id);
                                      setSections((items) => items.filter((item) => item.id !== section.id));
                                      showSuccess('Section deleted.');
                                    })
                                  }
                                  className={dangerButtonClass}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <Field label="Order">
                                <input type="number" value={section.order_index} onChange={(event) => updateSectionState(section.id, 'order_index', Number(event.target.value))} className={inputClass} />
                              </Field>
                              <Field label="Title">
                                <input value={section.title} onChange={(event) => updateSectionState(section.id, 'title', event.target.value)} className={inputClass} />
                              </Field>
                            </div>

                            <Field label="Content">
                              <textarea value={section.content} onChange={(event) => updateSectionState(section.id, 'content', event.target.value)} className={textareaClass} rows={5} />
                            </Field>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-[#2a2a2a] bg-[#111111] p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Project gallery</h3>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              runAction(`create-gallery-image-${selectedProject.id}`, async () => {
                                const created = await createGalleryItem(selectedProject.id, 'image');
                                setGallery((items) => [...items, created]);
                                showSuccess('Gallery image created.');
                              })
                            }
                            className={secondaryButtonClass}
                          >
                            Add image
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              runAction(`create-gallery-video-${selectedProject.id}`, async () => {
                                const created = await createGalleryItem(selectedProject.id, 'video');
                                setGallery((items) => [...items, created]);
                                showSuccess('Gallery video created.');
                              })
                            }
                            className={secondaryButtonClass}
                          >
                            Add video
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {selectedProjectGallery.map((item) => (
                          <div key={item.id} className="rounded-2xl border border-[#2a2a2a] bg-[#171717] p-4 space-y-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                              <div>
                                <h4 className="font-medium">{item.type === 'video' ? 'Video item' : 'Image item'}</h4>
                                <p className="text-xs text-[#9e9e9e] mt-1">ID {item.id}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    runAction(`save-gallery-${item.id}`, async () => {
                                      const saved = await saveGalleryItem(item);
                                      setGallery((items) => items.map((entry) => (entry.id === saved.id ? saved : entry)));
                                      showSuccess('Gallery item saved.');
                                    })
                                  }
                                  className={secondaryButtonClass}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    runAction(`delete-gallery-${item.id}`, async () => {
                                      await deleteGalleryItem(item.id);
                                      setGallery((items) => items.filter((entry) => entry.id !== item.id));
                                      showSuccess('Gallery item deleted.');
                                    })
                                  }
                                  className={dangerButtonClass}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-3">
                              <Field label="Order">
                                <input type="number" value={item.order_index} onChange={(event) => updateGalleryState(item.id, 'order_index', Number(event.target.value))} className={inputClass} />
                              </Field>
                              <Field label="Type">
                                <select value={item.type} onChange={(event) => updateGalleryState(item.id, 'type', event.target.value)} className={inputClass}>
                                  <option value="image">Image</option>
                                  <option value="video">Video</option>
                                </select>
                              </Field>
                              <Field label="Alt text">
                                <input value={item.alt_text || ''} onChange={(event) => updateGalleryState(item.id, 'alt_text', event.target.value)} className={inputClass} />
                              </Field>
                            </div>

                            <UploadField
                              label="Media URL"
                              value={item.url}
                              onChange={(value) => updateGalleryState(item.id, 'url', value)}
                              accept={item.type === 'video' ? 'video/*' : 'image/*'}
                              onUpload={(file) =>
                                handleUpload(file, `${getProjectStorageBase(selectedProject)}/gallery/${item.type}s`, (url) =>
                                  updateGalleryState(item.id, 'url', url),
                                )
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed border-[#2a2a2a] bg-[#111111] p-10 text-center text-[#9e9e9e]">
                    Create a project or select one from the left to begin editing.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="rounded-3xl bg-[#171717] border border-[#2a2a2a] p-5 md:p-6 space-y-3 text-sm text-[#9e9e9e]">
          <h2 className="text-lg font-medium text-[#eeeeee]">Supabase setup notes</h2>
          <p>The admin panel uploads files to the Supabase Storage bucket named <code>site-assets</code> by default.</p>
          <p>You can override that bucket with <code>VITE_SUPABASE_STORAGE_BUCKET</code> in your local environment.</p>
          <p>This admin now manages homepage and project content only. The old About page is no longer part of the CMS.</p>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm text-[#9e9e9e]">{label}</span>
      {children}
    </label>
  );
}

function UploadField({
  label,
  value,
  onChange,
  onUpload,
  accept,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File | null) => void;
  accept?: string;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm text-[#9e9e9e]">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />
      <input
        type="file"
        accept={accept || 'image/*,video/*'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onUpload(event.target.files?.[0] || null)}
        className="block w-full text-sm text-[#9e9e9e] file:mr-4 file:rounded-full file:border-0 file:bg-[#eeeeee] file:px-4 file:py-2 file:text-sm file:font-medium file:text-[#0f0f0f] hover:file:bg-white"
      />
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls(
        'rounded-full px-5 py-3 text-sm transition-colors',
        active ? 'bg-[#eeeeee] text-[#0f0f0f] font-medium' : 'bg-[#212121] text-[#eeeeee] hover:bg-[#2a2a2a]',
      )}
    >
      {children}
    </button>
  );
}

const inputClass =
  'w-full rounded-2xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-sm text-[#eeeeee] outline-none transition-colors focus:border-[#eeeeee]';
const textareaClass =
  'w-full rounded-2xl border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-sm text-[#eeeeee] outline-none transition-colors focus:border-[#eeeeee]';
const secondaryButtonClass =
  'rounded-full bg-[#212121] hover:bg-[#2a2a2a] px-4 py-2 text-sm transition-colors';
const dangerButtonClass =
  'rounded-full bg-red-500/10 border border-red-500/30 text-red-200 hover:bg-red-500/20 px-4 py-2 text-sm transition-colors';
