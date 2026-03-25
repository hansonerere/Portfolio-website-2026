import { useEffect, useState } from 'react';
import { preloadNotionAbout } from '../lib/notionWarmup';

const NOTION_ABOUT_URL = 'https://hansonerere.notion.site/Hanson-22a66e7675f944a1972e7f38c411e9d5';
const NOTION_ABOUT_EMBED_URL = 'https://hansonerere.notion.site/ebd/22a66e7675f944a1972e7f38c411e9d5';

interface AboutContentAreaNotionProps {
  projectId: string;
  isVisible: boolean;
  shouldLoad: boolean;
  resetToken: number;
  preloadEmbed?: boolean;
}

export function AboutContentAreaNotion({
  projectId,
  isVisible,
  shouldLoad,
  resetToken,
  preloadEmbed = true,
}: AboutContentAreaNotionProps) {
  void projectId;

  const [isIframeReady, setIsIframeReady] = useState(false);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (shouldLoad || isVisible) {
      preloadNotionAbout();
      if (preloadEmbed || isVisible) {
        setHasStartedLoading(true);
      }
    }
  }, [preloadEmbed, shouldLoad, isVisible]);

  useEffect(() => {
    if (hasStartedLoading) {
      setIsIframeReady(false);
      setShowFallback(false);
    }
  }, [resetToken, hasStartedLoading]);

  useEffect(() => {
    if (!isVisible || isIframeReady || !hasStartedLoading) return;

    const timer = window.setTimeout(() => {
      setShowFallback(true);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [hasStartedLoading, isIframeReady, isVisible, resetToken]);

  const shouldRenderIframe = hasStartedLoading && (preloadEmbed || isVisible);

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
        {shouldRenderIframe && (
          <iframe
            key={`about-notion-${resetToken}`}
            src={NOTION_ABOUT_EMBED_URL}
            title="About Hanson"
            loading="eager"
            onLoad={() => setIsIframeReady(true)}
            className="block w-full min-h-[100dvh] bg-white border-0"
          />
        )}

        {isVisible && !isIframeReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f0f] text-[#9e9e9e] px-6">
            <div className="text-center space-y-4">
              <p>Loading About content...</p>
              {showFallback && (
                <a
                  href={NOTION_ABOUT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#eeeeee] px-5 py-2 text-sm font-medium text-[#0f0f0f]"
                >
                  Open in Notion
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
