import { useState, useEffect } from 'react';
import { useAboutPage } from '../hooks/useSupabaseData';
import { ContactInfo, Client } from '../lib/supabase';

interface AboutPageProps {
  onClose: () => void;
}

function StaggeredContent({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number; 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`content-stagger-hidden p-0 ${
        isVisible ? 'content-stagger-animate' : ''
      }`}
    >
      {children}
    </div>
  );
}

// 骨架屏组件
function AboutCardSkeleton() {
  return (
    <div className="bg-[#212121] rounded-lg p-[24px] flex flex-col h-full animate-pulse">
      <div className="h-4 bg-[#2a2a2a] rounded mb-3 w-12"></div>
      <div className="h-6 bg-[#2a2a2a] rounded mb-3 w-32"></div>
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-4 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 bg-[#2a2a2a] rounded"></div>
        <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
      </div>
      <div className="aspect-[4/3] bg-[#2a2a2a] rounded mt-auto"></div>
    </div>
  );
}

export function AboutPageWithSupabase({ onClose }: AboutPageProps) {
  const { aboutPage, aboutCards, loading, error } = useAboutPage();

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading content: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#212121] text-white px-4 py-2 rounded hover:bg-[#2a2a2a] transition-colors mr-4"
          >
            Retry
          </button>
          <button
            onClick={onClose}
            className="bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 rounded hover:bg-white transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white overflow-y-auto">
      {/* Header */}
      <StaggeredContent delay={50}>
        <header className="flex justify-between items-center p-6 md:p-8">
          <div className="flex items-center space-x-6">
            <div className="text-sm font-['Red_Hat_Display'] text-[#9e9e9e]">
              STUDIO KOLLEKTIV
            </div>
            <div className="text-sm font-['Red_Hat_Display'] text-[#9e9e9e]">
              STUDIO—CREATIVE<br/>COLLECTIVE
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-[#eeeeee] text-[#0f0f0f] px-4 py-2 rounded-full text-sm font-['Red_Hat_Display'] hover:bg-white transition-colors duration-200"
          >
            OUR PROJECTS
          </button>
        </header>
      </StaggeredContent>

      {/* Main Content */}
      <div className="px-6 md:px-8">
        {/* Large Title */}
        <StaggeredContent delay={100}>
          <div className="mb-12 md:mb-16">
            {loading ? (
              <div className="h-32 bg-[#212121] rounded animate-pulse"></div>
            ) : (
              <h1 className="text-[12vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw] font-['Red_Hat_Display'] font-bold leading-none tracking-tight">
                {aboutPage?.hero_title || 'Hanson'}
              </h1>
            )}
          </div>
        </StaggeredContent>

        {/* Four Card Layout - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
          {loading ? (
            // 显示4个骨架屏
            Array.from({ length: 4 }).map((_, index) => (
              <StaggeredContent key={index} delay={150 + index * 50}>
                <AboutCardSkeleton />
              </StaggeredContent>
            ))
          ) : (
            aboutCards.map((card, index) => (
              <StaggeredContent key={card.id} delay={150 + index * 50}>
                <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
                  <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">{card.number}</div>
                  <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-3">{card.title}</h2>
                  
                  {/* 根据卡片类型显示不同内容 */}
                  {card.contact_info ? (
                    // Contact卡片
                    <div className="space-y-3 text-sm md:text-base flex-grow">
                      {(card.contact_info as ContactInfo[]).map((contact, idx) => (
                        <div key={idx}>
                          <div className="text-[#eeeeee]">{contact.value}</div>
                          <div className="text-[#9e9e9e] text-xs">{contact.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : card.clients ? (
                    // Clients卡片
                    <div className="space-y-3 text-sm md:text-base flex-grow">
                      {(card.clients as Client[]).map((client, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span className="text-[#eeeeee]">{client.name}</span>
                          <span className="text-[#9e9e9e]">{client.year}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 普通内容卡片
                    <p className="text-[#9e9e9e] text-sm md:text-base mb-4 leading-relaxed flex-grow">
                      {card.content}
                    </p>
                  )}
                  
                  {/* 底部图片或色块 */}
                  <div className="mt-auto">
                    {card.image_url ? (
                      <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={card.image_url}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`aspect-[4/3] rounded ${
                        card.number === '/03' ? 'bg-gradient-to-b from-purple-300 to-purple-500' :
                        card.number === '/04' ? 'bg-gradient-to-b from-blue-300 to-blue-500' :
                        'bg-gradient-to-b from-gray-300 to-gray-500'
                      }`}></div>
                    )}
                  </div>
                </div>
              </StaggeredContent>
            ))
          )}
        </div>

        {/* Bottom CTA */}
        <StaggeredContent delay={300}>
          <div className="text-center py-12 border-t border-[#212121]">
            <button 
              onClick={onClose}
              className="bg-[#eeeeee] text-[#0f0f0f] px-8 py-3 rounded-full text-base font-['Red_Hat_Display'] font-medium hover:bg-white transition-colors duration-200"
            >
              Discover projects we've worked on
            </button>
          </div>
        </StaggeredContent>

        {/* Footer */}
        <StaggeredContent delay={350}>
          <footer className="flex justify-between items-center py-8 text-sm text-[#9e9e9e] font-['Red_Hat_Display']">
            <div className="flex space-x-6">
              <span>Instagram</span>
              <span>Linkedin</span>
            </div>
            <div className="text-right">
              <div>studio@kollektiv@contact.com</div>
              <div>2025 — LA | U.S.A</div>
              <div className="mt-2">Creativity never sleeps.</div>
            </div>
          </footer>
        </StaggeredContent>
      </div>
    </div>
  );
}
