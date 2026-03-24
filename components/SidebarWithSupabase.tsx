import { useProjects } from '../hooks/useSupabaseData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Vector from '../imports/Vector';

const ABOUT_EXTERNAL_URL = 'https://hansonerere.notion.site/Hanson-22a66e7675f944a1972e7f38c411e9d5';

interface SidebarProps {
  activeProject: string | null;
  onProjectSelect: (projectId: string) => void;
  onHomeSelect: () => void;
  isMobile?: boolean;
}

function ProjectCardSkeleton({ isMobile }: { isMobile: boolean }) {
  return (
    <div className={`bg-[#212121] rounded-xl cursor-pointer transition-all duration-200 animate-pulse ${
      isMobile ? 'p-4' : 'p-3'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <div className={`h-4 bg-[#2a2a2a] rounded w-16 ${isMobile ? 'text-base' : 'text-sm'}`}></div>
        <div className={`h-4 bg-[#2a2a2a] rounded w-20 ${isMobile ? 'text-base' : 'text-sm'}`}></div>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className={`bg-[#2a2a2a] rounded-lg flex-shrink-0 ${
          isMobile ? 'w-16 h-16' : 'w-12 h-12'
        }`}></div>
        <div className="flex-1 min-w-0">
          <div className={`h-4 bg-[#2a2a2a] rounded mb-1 ${isMobile ? 'text-base' : 'text-sm'}`}></div>
          <div className={`h-8 bg-[#2a2a2a] rounded ${isMobile ? 'text-base' : 'text-sm'}`}></div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-px bg-[#2a2a2a] flex-1"></div>
        <div className={`h-3 bg-[#2a2a2a] rounded w-12 ml-3 ${isMobile ? 'text-sm' : 'text-xs'}`}></div>
      </div>
    </div>
  );
}

export function SidebarWithSupabase({ activeProject, onProjectSelect, onHomeSelect, isMobile = false }: SidebarProps) {
  const { projects, loading, error } = useProjects();

  const handleProjectClick = (projectId: string, title: string, category: string) => {
    if (title === 'About me' || category === 'Info') {
      window.open(ABOUT_EXTERNAL_URL, '_blank', 'noopener,noreferrer');
      return;
    }

    onProjectSelect(projectId);
  };

  return (
    <div className={`bg-[#0f0f0f] flex flex-col ${
      isMobile ? 'h-full' : 'h-screen border-r border-[#212121]'
    }`}>
      {/* Header */}
      <div className={`px-4 ${isMobile ? 'py-6' : 'py-6'}`}>
        <div className="flex items-center justify-center gap-3 mb-8 pt-4 md:pt-6">
          <div className={`relative ${isMobile ? 'w-8 h-8' : 'w-6 h-6'}`}>
            <Vector />
          </div>
          <span className={`text-white font-['Red_Hat_Display'] leading-none ${
            isMobile ? 'text-xl' : 'text-lg'
          }`}>
            POD studio
          </span>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {/* Home Card */}
        <div
          onClick={onHomeSelect}
          className={`
            rounded-xl p-3 cursor-pointer transition-all duration-200 
            ${activeProject === null ? 'bg-[#eeeeee]' : 'bg-[#212121] hover:bg-[#424242]'}
            ${isMobile ? 'p-4' : 'p-3'}
          `}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`${isMobile ? 'text-base' : 'text-sm'} ${
              activeProject === null ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
            }`}>
              Home
            </span>
            <span className={`${isMobile ? 'text-base' : 'text-sm'} ${
              activeProject === null ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
            }`}>
              Landing
            </span>
          </div>
          <div className="space-y-2">
            <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-sm'} ${
              activeProject === null ? 'text-[#0f0f0f]' : 'text-[#eeeeee]'
            }`}>
              Welcome
            </h3>
            <p className={`${isMobile ? 'text-base' : 'text-sm'} ${
              activeProject === null ? 'text-[#212121]' : 'text-[#9e9e9e]'
            }`}>
              Explore our creative portfolio and discover our design approach.
            </p>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 text-center">
            <p className="text-red-400 text-sm mb-2">Failed to load projects</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-xs text-red-300 hover:text-red-200 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectCardSkeleton key={index} isMobile={isMobile} />
            ))}
          </>
        )}

        {/* Project Cards */}
        {!loading && !error && projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id, project.title, project.category)}
            className={`
              rounded-xl cursor-pointer transition-all duration-200 group
              ${activeProject === project.id ? 'bg-[#eeeeee]' : 'bg-[#212121] hover:bg-[#424242]'}
              ${isMobile ? 'p-4' : 'p-3'}
            `}
          >
            {/* Category and Show more */}
            <div className="flex justify-between items-center mb-2">
              <span className={`${isMobile ? 'text-base' : 'text-sm'} ${
                activeProject === project.id ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
              }`}>
                {project.category}
              </span>
              <span className={`${isMobile ? 'text-base' : 'text-sm'} ${
                activeProject === project.id ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
              }`}>
                Show more
              </span>
            </div>

            {project.category !== 'Info' && (
              <>
                {/* Project thumbnail and details */}
                <div className="flex items-center gap-2 mb-2">
                  {project.cover_image && (
                    <div className={`rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 ${
                      isMobile ? 'w-16 h-16' : 'w-12 h-12'
                    }`}>
                      <ImageWithFallback
                        src={project.cover_image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium mb-1 ${isMobile ? 'text-base' : 'text-sm'} ${
                      activeProject === project.id ? 'text-[#0f0f0f]' : 'text-[#eeeeee]'
                    }`}>
                      {project.title}
                    </h3>
                    <p className={`line-clamp-2 ${isMobile ? 'text-base' : 'text-sm'} ${
                      activeProject === project.id ? 'text-[#212121]' : 'text-[#9e9e9e]'
                    }`}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Year divider */}
                <div className="flex items-center justify-between">
                  <div className={`h-[0.5px] flex-1 ${
                    activeProject === project.id ? 'bg-[#cccccc]' : 'bg-[#616161]'
                  }`} />
                  <span className={`ml-3 ${isMobile ? 'text-sm' : 'text-xs'} ${
                    activeProject === project.id ? 'text-[#212121]' : 'text-[#9e9e9e]'
                  }`}>
                    {project.year}
                  </span>
                </div>
              </>
            )}

            {project.category === 'Info' && (
              <div className="space-y-2">
                <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-sm'} ${
                  activeProject === project.id ? 'text-[#0f0f0f]' : 'text-[#eeeeee]'
                }`}>
                  {project.title}
                </h3>
                <p className={`${isMobile ? 'text-base' : 'text-sm'} ${
                  activeProject === project.id ? 'text-[#212121]' : 'text-[#9e9e9e]'
                }`}>
                  {project.description}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
