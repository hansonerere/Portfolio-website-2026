import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarWithSupabase } from './components/SidebarWithSupabase';
import { ContentAreaWithSupabase } from './components/ContentAreaWithSupabase';
import { LandingPageWithSupabase } from './components/LandingPageWithSupabase';
import { AboutContentAreaNotion } from './components/AboutContentAreaNotion';
import { AdminAuthGate } from './components/AdminAuthGate';
import { prefetchProjectDetails, useProjects } from './hooks/useSupabaseData';
import { preloadNotionAbout } from './lib/notionWarmup';

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const isAdminPath =
    normalizedPath === '/admin' ||
    normalizedPath === '/admin/login' ||
    normalizedPath.startsWith('/admin/');

  if (isAdminPath) {
    return <AdminAuthGate pathname={normalizedPath} />;
  }

  return <PublicSiteApp />;
}

function PublicSiteApp() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileContent, setShowMobileContent] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldWarmNotion, setShouldWarmNotion] = useState(false);
  const [aboutOpenVersion, setAboutOpenVersion] = useState(0);
  // 生产模式：始终使用Supabase数据
  const contentRef = useRef<HTMLDivElement>(null);
  const wasAboutVisibleRef = useRef(false);

  // Get Supabase projects data
  const { projects: supabaseProjects, loading: projectsLoading } = useProjects();

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // 生产模式：始终使用Supabase数据
  useEffect(() => {
    console.log('Production Mode: Using Supabase data');
  }, []);

  // Page loading animation
  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
      // Reset initial load flag after animations complete
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 600); // After page load animations complete
    }, 100); // Brief delay to ensure smooth loading

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const warmupTimer = window.setTimeout(() => {
      setShouldWarmNotion(true);
      preloadNotionAbout();
    }, 1200);

    return () => window.clearTimeout(warmupTimer);
  }, []);

  useEffect(() => {
    if (!supabaseProjects.length) return;

    // Warm the first two non-about projects to reduce first-open latency.
    supabaseProjects
      .filter((project) => project.category !== 'Info' && project.title !== 'About me')
      .slice(0, 2)
      .forEach((project) => prefetchProjectDetails(project.id));
  }, [supabaseProjects]);

  const scrollToTop = () => {
    if (contentRef.current) {
      // Instant scroll to top without animation
      contentRef.current.scrollTop = 0;
    }
  };

  const handleProjectSelect = (projectId: string) => {
    if (projectId === activeProject) return; // Prevent unnecessary transitions
    if (projectsLoading) return; // Wait for projects to load

    setActiveProject(projectId);
    if (isMobile) {
      setShowMobileContent(true);
    }
    
    // Instant scroll to top after state change
    setTimeout(() => {
      scrollToTop();
    }, 0);
  };

  const handleHomeSelect = () => {
    if (activeProject === null) return; // Prevent unnecessary transitions

    setActiveProject(null);
    if (isMobile) {
      setShowMobileContent(true);
    }
    
    // Instant scroll to top after state change
    setTimeout(() => {
      scrollToTop();
    }, 0);
  };

  const handleMobileBack = () => {
    setShowMobileContent(false);
  };

  const handleAboutHover = () => {
    setShouldWarmNotion(true);
    preloadNotionAbout();
  };

  const handleProjectHover = (projectId: string) => {
    prefetchProjectDetails(projectId);
  };

  // Get current project from Supabase data
  const currentProject = activeProject ? supabaseProjects.find(p => p.id === activeProject) : null;
  const isAboutProject = Boolean(currentProject && (currentProject.title === 'About me' || currentProject.category === 'Info'));

  useEffect(() => {
    if (!isAboutProject && wasAboutVisibleRef.current) {
      setAboutOpenVersion((value) => value + 1);
    }
    wasAboutVisibleRef.current = isAboutProject;
  }, [isAboutProject]);

  // Content animation variants for Framer Motion - opacity only
  const contentVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };

  const transition = {
    duration: 0.25,
    ease: "easeOut"
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen h-screen overflow-hidden">
        {/* Mobile Navigation - Full Screen */}
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          showMobileContent ? '-translate-x-full' : 'translate-x-0'
        } ${isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''} ${
          isInitialLoad && isPageLoaded ? 'page-load-animate' : ''
        }`}>
                  <div className="h-full overflow-y-auto">
          <SidebarWithSupabase 
            activeProject={activeProject}
            onProjectSelect={handleProjectSelect}
            onHomeSelect={handleHomeSelect}
            isMobile={true}
            onAboutHover={handleAboutHover}
            onProjectHover={handleProjectHover}
          />
        </div>
        </div>
        
        {/* Mobile Content - Full Screen */}
        <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
          showMobileContent ? 'translate-x-0' : 'translate-x-full'
        } ${isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''} ${
          isInitialLoad && isPageLoaded ? 'page-load-animate page-load-delay' : ''
        }`}>
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-50">
            <button
              onClick={handleMobileBack}
              className="bg-[#212121] hover:bg-[#424242] text-white p-3 rounded-xl transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          {/* Content with Framer Motion animation */}
          <div 
            ref={contentRef}
            className="relative h-full overflow-y-auto"
          >
            {!isAboutProject && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject || 'home'}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={contentVariants}
                  transition={transition}
                >
                  {activeProject === null ? (
                    <LandingPageWithSupabase />
                  ) : currentProject ? (
                    <ContentAreaWithSupabase projectId={activeProject} />
                  ) : (
                    <LandingPageWithSupabase />
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            <AboutContentAreaNotion
              projectId={activeProject || 'about'}
              isVisible={isAboutProject}
              shouldLoad={shouldWarmNotion}
              resetToken={aboutOpenVersion}
            />
          </div>
        </div>
      </div>
    );
  }

  // Tablet Layout
  if (isTablet) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen h-screen flex overflow-hidden">
        {/* Left Sidebar - with max-width of 480px */}
        <div className={`w-4/11 max-w-[480px] flex-shrink-0 h-full overflow-y-auto ${
          isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''
        } ${isInitialLoad && isPageLoaded ? 'page-load-animate' : ''}`}>
          <SidebarWithSupabase 
            activeProject={activeProject}
            onProjectSelect={handleProjectSelect}
            onHomeSelect={handleHomeSelect}
            onAboutHover={handleAboutHover}
            onProjectHover={handleProjectHover}
          />
        </div>
        
        {/* Right Content - flex-1 to take remaining space with Framer Motion animation */}
        <div 
          ref={contentRef}
          className={`relative flex-1 h-full overflow-y-auto mr-2 ${
            isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''
          } ${isInitialLoad && isPageLoaded ? 'page-load-animate page-load-delay' : ''}`}
        >
          {!isAboutProject && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject || 'home'}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={contentVariants}
                transition={transition}
              >
                {activeProject === null ? (
                  <LandingPageWithSupabase />
                ) : currentProject ? (
                  <ContentAreaWithSupabase projectId={activeProject} />
                ) : (
                  <LandingPageWithSupabase />
                )}
              </motion.div>
            </AnimatePresence>
          )}

          <AboutContentAreaNotion
            projectId={activeProject || 'about'}
            isVisible={isAboutProject}
            shouldLoad={shouldWarmNotion}
            resetToken={aboutOpenVersion}
          />
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="bg-[#0f0f0f] min-h-screen h-screen flex overflow-hidden">
      {/* Left Sidebar - with max-width of 480px */}
      <div className={`w-1/3 max-w-[480px] flex-shrink-0 h-full overflow-y-auto ${
        isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''
      } ${isInitialLoad && isPageLoaded ? 'page-load-animate' : ''}`}>
        <SidebarWithSupabase 
          activeProject={activeProject}
          onProjectSelect={handleProjectSelect}
          onHomeSelect={handleHomeSelect}
          onAboutHover={handleAboutHover}
          onProjectHover={handleProjectHover}
        />
      </div>
      
      {/* Right Content - flex-1 to take remaining space with Framer Motion animation */}
      <div 
        ref={contentRef}
        className={`relative flex-1 h-full overflow-y-auto mr-2 ${
          isInitialLoad && !isPageLoaded ? 'page-load-hidden' : ''
        } ${isInitialLoad && isPageLoaded ? 'page-load-animate page-load-delay' : ''}`}
      >
        {!isAboutProject && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject || 'home'}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentVariants}
              transition={transition}
            >
                {activeProject === null ? (
                  <LandingPageWithSupabase />
                ) : currentProject ? (
                  <ContentAreaWithSupabase projectId={activeProject} />
                ) : (
                <LandingPageWithSupabase />
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <AboutContentAreaNotion
          projectId={activeProject || 'about'}
          isVisible={isAboutProject}
          shouldLoad={shouldWarmNotion}
          resetToken={aboutOpenVersion}
        />
      </div>
    </div>
  );
}
