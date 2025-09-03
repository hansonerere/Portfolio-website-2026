import { Project } from './ProjectData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface ContentAreaProps {
  project: Project;
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

  // Calculate staggered delay (50-100ms intervals)
  const delay = Math.min((index * 75), 600); // Cap at 600ms
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
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 skeleton-image"></div>
        )}
        
        {/* Image */}
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

export function ContentArea({ project }: ContentAreaProps) {
  const [videoError, setVideoError] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);
  const [videoAnimated, setVideoAnimated] = useState(false);

  useEffect(() => {
    // Reset video animation state when project changes
    setVideoAnimated(false);
    setVideoLoading(true);
    setVideoError(false);
    
    // Trigger video animation after a brief delay
    const timer = setTimeout(() => {
      setVideoAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [project.id]);

  const handleVideoError = () => {
    console.error('Video failed to load:', project.videoUrl);
    setVideoError(true);
    setVideoLoading(false);
  };

  const handleVideoCanPlay = () => {
    console.log('Video can play');
    setVideoLoading(false);
    setVideoError(false);
  };

  // Show hero image when there's no video or cover image
  const heroImageSrc = project.coverImage || "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop";

  return (
    <div className="flex-1 bg-[#0f0f0f] min-h-screen overflow-y-auto">
      {/* Hero Section - Always show image, with optional video overlay */}
      <div className="p-0 mb-2">
        <div className="max-w-full mx-auto">
          <div className={`aspect-video bg-black overflow-hidden rounded-lg relative video-entrance ${
            videoAnimated ? 'animate' : ''
          }`}>
            {/* Base Hero Image - Always present */}
            <ImageWithFallback
              src={heroImageSrc}
              alt={project.title}
              className="w-full h-full object-cover"
            />

            {/* Video Overlay - Only if videoUrl exists */}
            {project.videoUrl && (
              <>
                {/* Loading skeleton for video */}
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
                    poster={heroImageSrc}
                    onError={handleVideoError}
                    onCanPlay={handleVideoCanPlay}
                    onLoadStart={() => setVideoLoading(true)}
                    crossOrigin="anonymous"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
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

        {/* Additional Content - Only for non-Casablanco, non-Process content */}
        {project.content && project.content.length > 0 && (
          <div className="space-y-2">
            {project.content.filter(content => 
              content.title !== 'Casablanco' && 
              content.title !== 'Process'
            ).map((content, index) => (
              <div key={index} className="max-w-full">
                {content.type === 'text' && (
                  <div className="bg-[#212121] rounded-lg p-4 md:p-6 lg:p-8 hover:bg-[#2a2a2a] transition-colors duration-200">
                    {content.title && (
                      <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 md:mb-4">
                        {content.title}
                      </h2>
                    )}
                    <p className="text-[#9e9e9e] text-sm md:text-base lg:text-lg leading-relaxed">
                      {content.content}
                    </p>
                  </div>
                )}
                {content.type === 'image' && (
                  <div className="rounded-lg overflow-hidden relative">
                    <ImageWithFallback
                      src={content.content}
                      alt=""
                      className="w-full h-64 md:h-96 lg:h-[500px] xl:h-[600px] object-cover rounded-lg transition-opacity duration-300 image-loading"
                      onLoad={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.classList.remove('image-loading');
                        target.classList.add('image-loaded');
                      }}
                    />
                  </div>
                )}
                {content.type === 'video' && (
                  <div className="rounded-lg overflow-hidden aspect-video">
                    <video
                      src={content.content}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Images - Enhanced Masonry Layout with Staggered Animation */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <div className="p-0 mt-2">
          <div className="max-w-full mx-auto">
            {/* Masonry Column Layout with Intersection Observer */}
            <div className="columns-1 md:columns-2 gap-2 space-y-2">
              {project.galleryImages.map((image, index) => (
                <GalleryImage
                  key={`${project.id}-${index}`}
                  src={image}
                  alt={`${project.title} gallery image ${index + 1}`}
                  index={index}
                />
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