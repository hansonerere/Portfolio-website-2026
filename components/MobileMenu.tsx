import { Project } from './ProjectData';
// import { ImageWithFallback } from './figma/ImageWithFallback';

interface MobileMenuProps {
  projects: Project[];
  activeProject: string | null;
  onProjectSelect: (projectId: string) => void;
  onHomeSelect: () => void;
}

export function MobileMenu({ projects, activeProject, onProjectSelect, onHomeSelect }: MobileMenuProps) {
  return (
    <div className="bg-[#0f0f0f] border-b border-[#212121] sticky top-0 z-50">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 relative">
            <svg className="w-full h-full" fill="none" viewBox="0 0 37 37">
              <path d="M33.095 25.988H4.10849C4.04856 25.988 3.99997 26.0366 3.99997 26.0965V29.938C3.99997 31.7361 5.45759 33.1937 7.25565 33.1937H29.9479C31.7459 33.1937 33.2035 31.7361 33.2035 29.938V26.0965C33.2035 26.0366 33.1549 25.988 33.095 25.988Z" fill="white"/>
              <path d="M25.9296 7.67007C25.9296 5.64315 27.5727 4.00001 29.5996 4.00001V4.00001C31.6265 4.00001 33.2697 5.64316 33.2697 7.67008V15.1238C33.2697 17.1507 31.6265 18.7939 29.5996 18.7939V18.7939C27.5727 18.7939 25.9296 17.1507 25.9296 15.1238V7.67007Z" stroke="white" strokeWidth="6"/>
              <path d="M11.2073 11.9543H8.16868V18.0316H11.2073V11.9543ZM3.99997 21.8398H7.0386V7.85756H3.99997H0.96134V21.8398H3.99997ZM4.06746 7.79007V10.8287H15.115V7.79007V4.75144H4.06746V7.79007ZM15.115 14.993V11.9543H11.2073V14.993V18.0316H15.115V14.993ZM18.7164 11.3915H15.6778C15.6778 11.7023 15.4258 11.9543 15.115 11.9543V14.993V18.0316C18.7822 18.0316 21.7551 15.0587 21.7551 11.3915H18.7164ZM15.115 7.79007V10.8287C15.4258 10.8287 15.6778 11.0807 15.6778 11.3915H18.7164H21.7551C21.7551 7.72431 18.7822 4.75144 15.115 4.75144V7.79007ZM3.99997 7.85756H7.0386C7.0386 9.49845 5.7084 10.8287 4.06746 10.8287V7.79007V4.75144C2.35197 4.75144 0.96134 6.14213 0.96134 7.85756H3.99997Z" fill="white"/>
            </svg>
          </div>
          <span className="text-white text-base font-['Red_Hat_Display'] leading-none">POD studio</span>
        </div>
      </div>

      {/* Horizontal Scrolling Menu */}
      <div className="px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {/* Home Card */}
          <div
            onClick={onHomeSelect}
            className={`
              flex-shrink-0 w-32 h-20 rounded-xl p-3 cursor-pointer transition-all duration-200
              ${activeProject === null ? 'bg-[#eeeeee]' : 'bg-[#212121]'}
            `}
          >
            <div className="h-full flex flex-col justify-center">
              <div className={`text-xs mb-1 ${
                activeProject === null ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
              }`}>
                Home
              </div>
              <div className={`text-sm font-medium ${
                activeProject === null ? 'text-[#0f0f0f]' : 'text-[#eeeeee]'
              }`}>
                Welcome
              </div>
            </div>
          </div>

          {/* Project Cards */}
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => onProjectSelect(project.id)}
              className={`
                flex-shrink-0 w-32 h-20 rounded-xl p-3 cursor-pointer transition-all duration-200
                ${activeProject === project.id ? 'bg-[#eeeeee]' : 'bg-[#212121]'}
              `}
            >
              <div className="h-full flex flex-col justify-center">
                <div className={`text-xs mb-1 ${
                  activeProject === project.id ? 'text-[#9e9e9e]' : 'text-[#9e9e9e]'
                }`}>
                  {project.category}
                </div>
                <div className={`text-sm font-medium leading-tight ${
                  activeProject === project.id ? 'text-[#0f0f0f]' : 'text-[#eeeeee]'
                }`}>
                  {project.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}