import { useEffect, useState } from 'react';
import { preloadNotionAbout } from '../lib/notionWarmup';

const NOTION_ABOUT_URL = 'https://hansonerere.notion.site/Hanson-22a66e7675f944a1972e7f38c411e9d5';

function getEmbedUrl(url: string) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}embed=true`;
}

interface AboutContentAreaNotionProps {
  projectId: string;
  isVisible: boolean;
  shouldLoad: boolean;
  resetToken: number;
}

export function AboutContentAreaNotion({ projectId, isVisible, shouldLoad, resetToken }: AboutContentAreaNotionProps) {
  void projectId;

  const [isIframeReady, setIsIframeReady] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  useEffect(() => {
    if (shouldLoad || isVisible) {
      preloadNotionAbout();
      setHasStartedLoading(true);
    }
  }, [shouldLoad, isVisible]);

  useEffect(() => {
    if (hasStartedLoading) {
      setIsIframeReady(false);
    }
  }, [resetToken, hasStartedLoading]);

  return (
    <div
      className={
        isVisible
          ? 'absolute inset-0 bg-[#0f0f0f] overflow-y-auto'
          : 'absolute inset-0 bg-[#0f0f0f] overflow-y-auto invisible pointer-events-none'
      }
      aria-hidden={!isVisible}
    >
      <div className="max-w-full mx-auto">
        {hasStartedLoading && (
          <iframe
            key={`about-notion-${resetToken}`}
            src={getEmbedUrl(NOTION_ABOUT_URL)}
            title="About Hanson"
            loading="eager"
            onLoad={() => setIsIframeReady(true)}
            className="w-full min-h-[100vh] bg-white border-0 rounded-lg"
          />
        )}

        {isVisible && !isIframeReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f0f] text-[#9e9e9e]">
            Loading About content...
          </div>
        )}
      </div>
    </div>
  );
}
