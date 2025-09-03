import { useState, useEffect } from 'react';

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

function LoadingVideo({ src, poster }: { src: string[]; poster?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <div className="aspect-video bg-black overflow-hidden rounded-lg relative">
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 skeleton-image flex items-center justify-center">
          <div className="text-[#9e9e9e] text-sm">Loading video...</div>
        </div>
      )}
      
      {/* Video */}
      <video 
        className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay 
        muted 
        loop 
        playsInline
        poster={poster}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
      >
        {src.map((source, index) => (
          <source key={index} src={source} type="video/mp4" />
        ))}
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export function LandingPage() {
  return (
    <div className="flex-1 bg-[#0f0f0f] min-h-screen p-[0px]">
      {/* Video Section - 16:9 Aspect Ratio at Top */}
      <StaggeredContent delay={50}>
        <div className="mb-2">
          <div className="w-full">
            <LoadingVideo
              src={[
                "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
                "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              ]}
              poster="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop"
            />
          </div>
        </div>
      </StaggeredContent>

      {/* Services Grid */}
      <StaggeredContent delay={250}>
        <div className="mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {/* Web design */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/01</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">Web design</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                Responsive, editorial-driven sites that balance form and function. Built to scale and stand out.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-gray-300 to-gray-500 rounded mt-auto"></div>
            </div>

            {/* Branding */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/02</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">Branding</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                From logo to launch, we craft brand systems that speak with confidence.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-blue-300 to-blue-500 rounded mt-auto"></div>
            </div>

            {/* Art Direction */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/03</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">Art Direction</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                Conceptual direction for photo shoots, campaigns, and digital experiences. Visual storytelling with precision.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-orange-300 to-orange-500 rounded mt-auto"></div>
            </div>

            {/* Campaigns */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/04</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">Campaigns</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                Ideas that travel across mediums. From social to print to outdoor.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-green-300 to-green-500 rounded mt-auto"></div>
            </div>

            {/* UX/UI */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/05</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">UX/UI</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                User-centered interfaces, informed by research and made to feel intuitive.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-purple-300 to-purple-500 rounded mt-auto"></div>
            </div>

            {/* Copywriting */}
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/06</div>
              <h3 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-1">Copywriting</h3>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-3 leading-relaxed flex-grow">
                Messaging, tone of voice, and product copy that speaks like a human — not a brochure.
              </p>
              <div className="aspect-[4/6] bg-gradient-to-b from-red-300 to-red-500 rounded mt-auto"></div>
            </div>
          </div>
        </div>
      </StaggeredContent>

      {/* Footer */}
      <StaggeredContent delay={300}>
        <div className="px-4 md:px-6 lg:px-8 py-8 lg:py-12 mt-2">
          <div className="border-t border-[#616161] pt-6 lg:pt-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <div className="text-[#eeeeee] text-sm md:text-base hover:text-white transition-colors duration-200 cursor-pointer">Instagram</div>
                <div className="text-[#eeeeee] text-sm md:text-base hover:text-white transition-colors duration-200 cursor-pointer">Linkedin</div>
              </div>
              <div className="text-left md:text-right space-y-1">
                <div className="text-[#eeeeee] text-sm md:text-base">studiokollektiv@contact.com</div>
                <div className="flex items-center gap-2 text-[#9e9e9e] text-sm md:text-base">
                  <span>©2025</span>
                  <span>L.A | U.S.A.</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-6 lg:mt-8">
              <div className="text-[#9e9e9e] text-sm md:text-base">Creativity never sleeps.</div>
            </div>
          </div>
        </div>
      </StaggeredContent>
    </div>
  );
}