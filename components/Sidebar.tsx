import { Project } from './ProjectData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Vector from '../imports/Vector';

interface SidebarProps {
  projects: Project[];
  activeProject: string | null;
  onProjectSelect: (projectId: string) => void;
  onHomeSelect: () => void;
  isMobile?: boolean;
}

export function Sidebar({ projects, activeProject, onProjectSelect, onHomeSelect, isMobile = false }: SidebarProps) {
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

        {/* Project Cards */}
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => onProjectSelect(project.id)}
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
                  {project.coverImage && (
                    <div className={`rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 ${
                      isMobile ? 'w-16 h-16' : 'w-12 h-12'
                    }`}>
                      <ImageWithFallback
                        src={project.coverImage}
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