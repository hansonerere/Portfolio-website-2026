import { useState, useEffect } from 'react';
import { useProject } from '../hooks/useSupabaseData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useIntersectionObserver } from './useIntersectionObserver';

interface ContentAreaProps {
  projectId: string;
}

function GalleryImage({ 
  src, 
  alt, 
  index 
}: { 
  src: string; 
  alt: string; 
  index: number; 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });

  const delay = Math.min((index * 75), 600);
  const delayClass = `delay-${Math.min(Math.round(delay / 50) * 50, 600)}`;

  const handleImageLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  return (
    <div 
      ref={ref}
      className={`break-inside-avoid inline-block w-full mb-2 gallery-fade-in ${
        hasBeenVisible ? 'animate' : ''
      } ${delayClass}`}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 skeleton-image"></div>
        )}
        
        <ImageWithFallback
          src={src}
          alt={alt}
          className={`w-full h-auto object-cover rounded-lg transition-opacity duration-300 ${
            isLoaded ? 'image-loaded' : 'image-loading'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

function GalleryVideo({ 
  src, 
  index 
}: { 
  src: string; 
  index: number; 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, hasBeenVisible } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
    freezeOnceVisible: true,
  });

  const delay = Math.min((index * 75), 600);
  const delayClass = `delay-${Math.min(Math.round(delay / 50) * 50, 600)}`;

  const handleVideoLoad = () => {
    setIsLoading(false);
    setIsLoaded(true);
  };

  return (
    <div 
      ref={ref}
      className={`break-inside-avoid inline-block w-full mb-2 gallery-fade-in ${
        hasBeenVisible ? 'animate' : ''
      } ${delayClass}`}
    >
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 skeleton-image flex items-center justify-center">
            <div className="text-[#9e9e9e] text-sm">Loading video...</div>
          </div>
        )}
        
        <video
          className={`w-full h-auto object-cover rounded-lg transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export function ContentAreaWithSupabase({ projectId }: ContentAreaProps) {
  const { project, sections, gallery, loading, error } = useProject(projectId);
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoAnimated, setVideoAnimated] = useState(false);

  useEffect(() => {
    setVideoAnimated(false);
    setVideoLoading(true);
    setVideoError(false);
    
    const timer = setTimeout(() => {
      setVideoAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [projectId]);

  const handleVideoError = () => {
    console.error('Video failed to load:', project?.hero_video_url);
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoCanPlay = () => {
    console.log('Video can play');
    setVideoLoading(false);
    setVideoError(false);
  };

  if (error) {
    return (
      <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error loading project: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#212121] text-white px-4 py-2 rounded hover:bg-[#2a2a2a] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto">
        {/* Hero Section Skeleton */}
        <div className="p-0 mb-2">
          <div className="max-w-full mx-auto">
            <div className="aspect-video bg-[#212121] rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-[#9e9e9e] text-sm">Loading project...</div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-full mx-auto space-y-2">
          <div className="bg-[#212121] rounded-lg p-4 md:p-6 lg:p-8 animate-pulse">
            <div className="h-4 bg-[#2a2a2a] rounded mb-4 w-12"></div>
            <div className="h-8 bg-[#2a2a2a] rounded mb-4 w-48"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#2a2a2a] rounded"></div>
              <div className="h-4 bg-[#2a2a2a] rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto flex items-center justify-center">
        <div className="text-center text-[#9e9e9e]">
          <p>Project not found</p>
        </div>
      </div>
    );
  }

  const heroImageSrc = project.cover_image || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop";

  return (
    <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto">
      {/* Hero Section */}
      <div className="p-0 mb-2">
        <div className="max-w-full mx-auto">
          <div className={`aspect-video bg-black overflow-hidden rounded-lg relative video-entrance ${
            videoAnimated ? 'animate' : ''
          }`}>
            {/* Base Hero Image */}
            <ImageWithFallback
              src={heroImageSrc}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Video Overlay */}
            {project.hero_video_url && (
              <>
                {videoLoading && !videoError && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-[#9e9e9e] text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9e9e9e] mx-auto mb-2"></div>
                      <div className="text-sm">Loading video...</div>
                    </div>
                  </div>
                )}
                
                {!videoError && (
                  <video
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                      videoLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={project.hero_video_poster || heroImageSrc}
                    onError={handleVideoError}
                    onCanPlay={handleVideoCanPlay}
                    onLoadStart={() => setVideoLoading(true)}
                    crossOrigin="anonymous"
                  >
                    <source src={project.hero_video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </>
            )}

            {/* Project Title Overlay */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-black/50 text-[#eeeeee] px-4 py-2 rounded-lg backdrop-blur-sm">
                <div className="text-sm font-medium">{project.title}</div>
                <div className="text-xs text-[#9e9e9e]">{project.year}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-full mx-auto space-y-2">
        {/* Project Info */}
        <div className="bg-[#212121] rounded-lg p-4 md:p-6 lg:p-8 hover:bg-[#2a2a2a] transition-colors duration-200">
          <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/01</div>
          <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 md:mb-4">Overview</h2>
          <p className="text-[#9e9e9e] text-sm md:text-base lg:text-lg leading-relaxed mb-4 md:mb-6">
            {project.description}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8">
            <div>
              <div className="text-[#9e9e9e] text-xs mb-1">Year</div>
              <div className="text-[#eeeeee] text-sm md:text-base lg:text-lg">{project.year}</div>
            </div>
            <div>
              <div className="text-[#9e9e9e] text-xs mb-1">Category</div>
              <div className="text-[#eeeeee] text-sm md:text-base lg:text-lg">{project.category}</div>
            </div>
          </div>
        </div>

        {/* Additional Content Sections */}
        {sections && sections.length > 0 && (
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-[#212121] rounded-lg p-4 md:p-6 lg:p-8 hover:bg-[#2a2a2a] transition-colors duration-200">
                <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/{String(index + 2).padStart(2, '0')}</div>
                <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 md:mb-4">
                  {section.title}
                </h2>
                <p className="text-[#9e9e9e] text-sm md:text-base lg:text-lg leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Items */}
      {gallery && gallery.length > 0 && (
        <div className="p-0 mt-2">
          <div className="max-w-full mx-auto">
            <div className="columns-1 md:columns-2 gap-2 space-y-2">
              {gallery.map((item, index) => (
                item.type === 'image' ? (
                  <GalleryImage
                    key={item.id}
                    src={item.url}
                    alt={item.alt_text || `${project.title} gallery image ${index + 1}`}
                    index={index}
                  />
                ) : (
                  <GalleryVideo
                    key={item.id}
                    src={item.url}
                    index={index}
                  />
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 md:px-6 lg:px-8 py-8 lg:py-12 mt-8 lg:mt-16">
        <div className="border-t border-[#616161] pt-6 lg:pt-8 max-w-full mx-auto">
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
    </div>
  );
}
