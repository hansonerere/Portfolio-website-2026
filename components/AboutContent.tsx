import { useEffect, useRef } from 'react';
import { useAboutPage } from '../hooks/useContentData';

interface AboutContentProps {
  projectId: string;
  isVisible: boolean;
  shouldLoad: boolean;
  resetToken: number;
  preloadEmbed?: boolean;
}

export function AboutContent({ isVisible, resetToken }: AboutContentProps) {
  const { aboutPage, aboutCards, loading, error } = useAboutPage();
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => { if (isVisible) container.current?.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }); }, [isVisible, resetToken]);
  return <div ref={container} aria-hidden={!isVisible} className={`absolute inset-0 overflow-y-auto bg-[#0f0f0f] ${isVisible ? '' : 'invisible pointer-events-none'}`}>
    <header className="rounded-lg bg-[#212121] px-6 py-12 md:px-10 md:py-16">
      <p className="mb-4 text-sm text-[#9e9e9e]">About me</p>
      <h1 className="font-['Red_Hat_Display'] text-5xl font-bold tracking-tight text-[#eeeeee] md:text-7xl">{aboutPage?.hero_title || 'Hanson'}</h1>
    </header>
    {loading && <p className="p-6 text-[#9e9e9e]">Loading...</p>}
    {error && <p role="alert" className="p-6 text-red-300">{error}</p>}
    <div className="grid gap-2 py-2">
      {aboutCards.map(card => <section key={card.id} className="rounded-lg bg-[#212121] p-6 md:p-10">
        <p className="mb-3 text-sm text-[#9e9e9e]">{card.number}</p>
        <h2 className="mb-4 text-2xl font-medium text-[#eeeeee] md:text-3xl">{card.title}</h2>
        <p className="whitespace-pre-line text-base leading-relaxed text-[#bdbdbd] md:text-lg">{card.content}</p>
        {card.image_url && <img src={card.image_url} alt={card.title} loading="lazy" className="mt-6 block h-auto w-full rounded-lg" />}
        {card.clients?.length ? <ul className="mt-6 divide-y divide-[#424242]">{card.clients.map((client, index) => <li key={index} className="flex justify-between gap-4 py-3 text-[#eeeeee]"><span>{client.name}</span><span className="text-[#9e9e9e]">{client.year}</span></li>)}</ul> : null}
        {card.contact_info?.length ? <ul className="mt-6 space-y-3">{card.contact_info.map((contact, index) => <li key={index} className="flex flex-wrap justify-between gap-4 text-[#eeeeee]"><span className="text-[#9e9e9e]">{contact.label}</span>{contact.type === 'email' ? <a href={`mailto:${contact.value}`}>{contact.value}</a> : /^https?:\/\//.test(contact.value) ? <a href={contact.value} target="_blank" rel="noreferrer">{contact.value}</a> : <span>{contact.value}</span>}</li>)}</ul> : null}
      </section>)}
    </div>
  </div>;
}
