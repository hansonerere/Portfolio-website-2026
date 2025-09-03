import { useState, useEffect } from 'react';

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

export function AboutPage({ onClose }: AboutPageProps) {
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
            <h1 className="text-[12vw] md:text-[8vw] lg:text-[6vw] xl:text-[5vw] font-['Red_Hat_Display'] font-bold leading-none tracking-tight">
              Hanson
            </h1>
          </div>
        </StaggeredContent>

        {/* Four Card Layout - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
          {/* Card 1 - Our studio */}
          <StaggeredContent delay={150}>
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/01</div>
              <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-3">Our studio</h2>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-4 leading-relaxed flex-grow">
                Our studio centers on contemporary design studio creating thoughtful, modern brands and experiences that stand out 
                and stand for something. Rooted in collaboration, clarity and experimentation, we work closely with companies, 
                creatives, and culture-makers to bring ideas into sharp visual focus.
              </p>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-4 leading-relaxed">
                From early-stage startups to established institutions, our work lives across digital products, brand identities, 
                editorial systems, campaigns, and cultural platforms.
              </p>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=450&fit=crop&crop=faces"
                  alt="Studio workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </StaggeredContent>

          {/* Card 2 - Background */}
          <StaggeredContent delay={200}>
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/02</div>
              <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-3">Background</h2>
              <p className="text-[#9e9e9e] text-sm md:text-base mb-4 leading-relaxed flex-grow">
                Founded by a team with diverse design, art direction, visual identity, and digital projects STUDIO KOLLEKTIV 
                brings strategic and craft to build flexible design systems for ambitious ideas. Our studio was shaped by 
                real-world constraints — tight timelines, lean teams, and the need to punch above our weight.
              </p>
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&h=450&fit=crop"
                  alt="Creative workspace"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </StaggeredContent>

          {/* Card 3 - Clients */}
          <StaggeredContent delay={250}>
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/03</div>
              <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-3">Clients</h2>
              <div className="space-y-3 text-sm md:text-base flex-grow">
                <div className="flex justify-between items-center">
                  <span className="text-[#eeeeee]">[Start-up Client Name]</span>
                  <span className="text-[#9e9e9e]">2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#eeeeee]">[Independent Creator Work]</span>
                  <span className="text-[#9e9e9e]">2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#eeeeee]">[Culture-focused Brand]</span>
                  <span className="text-[#9e9e9e]">2024</span>
                </div>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-b from-purple-300 to-purple-500 rounded mt-auto"></div>
            </div>
          </StaggeredContent>

          {/* Card 4 - Contact */}
          <StaggeredContent delay={300}>
            <div className="bg-[#212121] rounded-lg hover:bg-[#2a2a2a] transition-colors duration-200 p-[24px] flex flex-col h-full">
              <div className="text-[#9e9e9e] text-sm md:text-base mb-2 md:mb-3">/04</div>
              <h2 className="text-[#eeeeee] text-lg md:text-xl lg:text-2xl mb-3">Contact</h2>
              <div className="space-y-3 text-sm md:text-base flex-grow">
                <div>
                  <div className="text-[#eeeeee]">hello@studiokollektiv.co</div>
                  <div className="text-[#9e9e9e] text-xs">General enquiries</div>
                </div>
                <div>
                  <div className="text-[#eeeeee]">projects@studiokollektiv.co</div>
                  <div className="text-[#9e9e9e] text-xs">Business enquiries</div>
                </div>
                <div>
                  <div className="text-[#eeeeee]">Linkedin</div>
                  <div className="text-[#eeeeee]">Twitter</div>
                  <div className="text-[#9e9e9e] text-xs">Social media</div>
                </div>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-b from-blue-300 to-blue-500 rounded mt-auto"></div>
            </div>
          </StaggeredContent>
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
