const NOTION_ORIGIN = 'https://hansonerere.notion.site';
let preloadInjected = false;

function injectLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  const existing = document.querySelector(`link[rel="${rel}"][href="${href}"]`);
  if (existing) return;

  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
}

export function preloadNotionAbout() {
  if (typeof document === 'undefined' || preloadInjected) return;
  preloadInjected = true;

  injectLink('dns-prefetch', NOTION_ORIGIN);
  injectLink('preconnect', NOTION_ORIGIN);
}
