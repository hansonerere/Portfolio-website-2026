import { Project } from './ProjectData';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <div className="flex-1 bg-[#0f0f0f] min-h-screen">
      {/* Header with back button */}
      <div className="px-8 py-6">
        <button 
          onClick={onBack}
          className="bg-[#212121] text-[#eeeeee] px-4 py-2 rounded-full mb-8 hover:bg-[#333333] transition-colors"
        >
          ← Home
        </button>
      </div>

      {/* Hero Image */}
      {project.coverImage && (
        <div className="px-8 mb-8">
          <div className="rounded-lg overflow-hidden">
            <ImageWithFallback
              src={project.coverImage}
              alt={project.title}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      )}

      {/* Project Info */}
      <div className="px-8 mb-8">
        <div className="bg-[#212121] rounded-lg p-6">
          <div className="text-[#9e9e9e] text-[16px] mb-3">/01</div>
          <h1 className="text-[#eeeeee] text-[24px] font-medium mb-4">{project.title}</h1>
          <p className="text-[#9e9e9e] text-[16px] leading-[22.4px] mb-6">
            {project.description}
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="px-8 mb-8">
        <div className="bg-[#212121] rounded-lg p-6">
          <div className="text-[#9e9e9e] text-[16px] mb-3">/02</div>
          <h2 className="text-[#eeeeee] text-[24px] font-medium mb-4">Process</h2>
          <p className="text-[#9e9e9e] text-[16px] leading-[22.4px]">
            We began by stripping the brand back to its foundations. The previous identity leaned heavily on ornament — we replaced it with structural elegance, minimal type, and a calming, sun-washed palette.
          </p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="px-8 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#212121] rounded-lg p-6">
            <div className="text-[#9e9e9e] text-[16px] mb-3">/03</div>
            <h3 className="text-[#eeeeee] text-[24px] font-medium mb-4">What we did</h3>
            <div className="space-y-2">
              <div className="text-[#eeeeee] text-[16px]">Brand strategy</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
              <div className="text-[#eeeeee] text-[16px]">Art direction</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
              <div className="text-[#eeeeee] text-[16px]">Web design</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
            </div>
          </div>

          <div className="bg-[#212121] rounded-lg p-6">
            <div className="text-[#9e9e9e] text-[16px] mb-3">/04</div>
            <h3 className="text-[#eeeeee] text-[24px] font-medium mb-4">Tools we used</h3>
            <div className="space-y-2">
              <div className="text-[#eeeeee] text-[16px]">Figma</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
              <div className="text-[#eeeeee] text-[16px]">Illustrator</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
              <div className="text-[#eeeeee] text-[16px]">Framer</div>
              <div className="h-[0.5px] bg-[#616161]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome Section */}
      <div className="px-8 mb-8">
        <div className="bg-[#212121] rounded-lg p-6">
          <div className="text-[#9e9e9e] text-[16px] mb-3">/05</div>
          <h2 className="text-[#eeeeee] text-[24px] font-medium mb-4">Outcome</h2>
          <p className="text-[#9e9e9e] text-[16px] leading-[22.4px]">
            The rebrand positioned {project.title} as a quiet force in the luxury space — helping them secure retail partnerships, elevate their experience, and speak to a new generation of design-led buyers.
          </p>
        </div>
      </div>

      {/* Additional Content */}
      {project.content && project.content.map((content, index) => (
        <div key={index} className="px-8 mb-8">
          {content.type === 'image' && (
            <div className="rounded-lg overflow-hidden">
              <ImageWithFallback
                src={content.content}
                alt=""
                className="w-full h-[600px] object-cover"
              />
            </div>
          )}
        </div>
      ))}

      {/* Footer */}
      <div className="px-8 py-12 mt-16">
        <div className="border-t border-[#616161] pt-8">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="text-[#eeeeee] text-[16px]">Instagram</div>
              <div className="text-[#eeeeee] text-[16px]">Linkedin</div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-[#eeeeee] text-[16px]">studiokollektiv@contact.com</div>
              <div className="flex items-center gap-2 text-[#9e9e9e] text-[16px]">
                <span>©2025</span>
                <span>L.A | U.S.A.</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <div className="text-[#9e9e9e] text-[16px]">Creativity never sleeps.</div>
          </div>
        </div>
      </div>
    </div>
  );
}