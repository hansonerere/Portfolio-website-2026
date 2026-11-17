import { useEffect, useState } from 'react';
import {
  AdminAboutCard, AdminAboutPageRecord, createAboutCard, createAboutPage,
  deleteAboutCard, fetchAdminContent, saveAboutCard, saveAboutPage, uploadAsset,
} from '../lib/admin';

const input = 'w-full rounded-xl border border-[#424242] bg-[#171717] px-4 py-3 text-sm text-[#eeeeee]';
const button = 'rounded-full bg-[#eeeeee] px-4 py-2 text-sm font-medium text-[#0f0f0f] disabled:opacity-40';

export function AdminAboutEditor() {
  const [page, setPage] = useState<AdminAboutPageRecord | null>(null);
  const [cards, setCards] = useState<AdminAboutCard[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminContent().then(data => { setPage(data.aboutPage); setCards(data.aboutCards); })
      .catch(error => { setFailed(true); setMessage(error.message); })
      .finally(() => setLoading(false));
  }, []);

  async function run(action: () => Promise<void>, success = 'Saved. Refresh the website to view changes. Public caches refresh within 60 seconds.') {
    setBusy(true); setMessage(''); setFailed(false);
    try { await action(); setMessage(success); }
    catch (error) { setFailed(true); setMessage(error instanceof Error ? error.message : 'Unable to save.'); }
    finally { setBusy(false); }
  }

  function patch(id: number, changes: Partial<AdminAboutCard>) {
    setCards(items => items.map(item => item.id === id ? { ...item, ...changes } : item));
  }

  return <section className="space-y-4 rounded-3xl border border-[#2a2a2a] bg-[#171717] p-5 md:p-6">
    <h2 className="text-xl font-semibold">About me</h2>
    <p className="text-sm text-[#9e9e9e]">Biography, experience, and contacts are hosted here. No external Notion page is required.</p>
    {message && <p role="status" className={failed ? 'text-red-200' : 'text-emerald-200'}>{message}</p>}
    {loading ? <p>Loading...</p> : !page ? <button type="button" disabled={busy || failed} className={button} onClick={() => run(async () => setPage(await createAboutPage()))}>Create About page</button> : <>
      <div className="flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1 space-y-2"><span className="text-sm text-[#9e9e9e]">Page title</span>
          <input className={input} value={page.hero_title} onChange={event => setPage({ ...page, hero_title: event.target.value })} />
        </label>
        <button type="button" disabled={busy} className={button} onClick={() => run(async () => { setPage(await saveAboutPage(page)); })}>Save title</button>
      </div>
      {cards.map(card => <details key={card.id} className="rounded-2xl border border-[#424242] p-4" open={cards.length === 1 || undefined}>
        <summary className="cursor-pointer py-2 font-medium">{card.title || 'Untitled card'}</summary>
        <fieldset disabled={busy} className="mt-4 space-y-4">
          <label className="block space-y-2"><span className="text-sm text-[#9e9e9e]">Title</span>
            <input className={input} value={card.title} onChange={event => patch(card.id, { title: event.target.value })} />
          </label>
          <label className="block space-y-2"><span className="text-sm text-[#9e9e9e]">Content</span>
            <textarea className={input} rows={12} value={card.content} onChange={event => patch(card.id, { content: event.target.value })} />
          </label>
          <details className="space-y-3">
            <summary className="cursor-pointer text-sm text-[#9e9e9e]">Image and contacts</summary>
            <label className="block space-y-2"><span className="text-sm text-[#9e9e9e]">Image URL</span>
              <input className={input} value={card.image_url || ''} onChange={event => patch(card.id, { image_url: event.target.value })} />
              <input type="file" accept="image/*" className="block max-w-full text-sm" onChange={event => {
                const file = event.target.files?.[0];
                if (file) void run(async () => { patch(card.id, { image_url: await uploadAsset(file, 'about/images') }); }, 'Uploaded. Save card to publish.');
              }} />
            </label>
            {(card.contact_info || []).map((contact, index) => <div key={index} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
              <input aria-label="Contact label" className={input} value={contact.label} onChange={event => patch(card.id, { contact_info: card.contact_info!.map((entry, i) => i === index ? { ...entry, label: event.target.value } : entry) })} />
              <input aria-label="Contact value" className={input} value={contact.value} onChange={event => patch(card.id, { contact_info: card.contact_info!.map((entry, i) => i === index ? { ...entry, value: event.target.value } : entry) })} />
              <button type="button" className="px-3 text-sm text-red-200" onClick={() => patch(card.id, { contact_info: card.contact_info!.filter((_, i) => i !== index) })}>Remove</button>
            </div>)}
            <button type="button" className={button} onClick={() => patch(card.id, { contact_info: [...(card.contact_info || []), { label: '', value: '', type: 'text' }] })}>Add contact</button>
          </details>
          <div className="flex justify-between gap-3">
            <button type="button" className="text-sm text-red-200" onClick={() => {
              if (window.confirm(`Delete "${card.title}"? This cannot be undone.`)) void run(async () => { await deleteAboutCard(card.id); setCards(items => items.filter(item => item.id !== card.id)); });
            }}>Delete card</button>
            <button type="button" className={button} onClick={() => run(async () => { const saved = await saveAboutCard(card); patch(card.id, saved); })}>Save card</button>
          </div>
        </fieldset>
      </details>)}
      <button type="button" disabled={busy} className={button} onClick={() => run(async () => { const card = await createAboutCard(page.id); setCards(items => [...items, card]); })}>Add card</button>
    </>}
  </section>;
}
