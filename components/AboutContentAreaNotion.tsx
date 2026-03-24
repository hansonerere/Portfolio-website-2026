const NOTION_ABOUT_URL = 'https://hansonerere.notion.site/Hanson-22a66e7675f944a1972e7f38c411e9d5';

function getEmbedUrl(url: string) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}embed=true`;
}

interface AboutContentAreaNotionProps {
  projectId: string;
}

export function AboutContentAreaNotion({ projectId }: AboutContentAreaNotionProps) {
  void projectId;

  return (
    <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto">
      <div className="max-w-full mx-auto">
        <iframe
          src={getEmbedUrl(NOTION_ABOUT_URL)}
          title="About Hanson"
          className="w-full min-h-[100vh] bg-white border-0 rounded-lg"
        />
      </div>
    </div>
  );
}
