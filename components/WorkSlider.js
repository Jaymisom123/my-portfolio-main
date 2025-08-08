'use client';
// Usaremos <img> para maior compatibilidade com imagens remotas de serviços de screenshot
import { BsPlayFill } from 'react-icons/bs';
import { projects } from '../utils/projects';

function getPreviewSrc(url) {
  const encoded = encodeURIComponent(url);
  // Usa serviço de screenshot direto (mais estável que parsing OG via API)
  return `https://image.thum.io/get/width/1000/crop/562/noanimate/${encoded}`;
}

const WorkGallery = () => {
  return (
    <section className="w-full px-4 py-6 sm:py-8 lg:py-10 mt-2 relative flex justify-center items-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 z-10 w-full max-w-7xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden group bg-neutral-800/80 border border-white/5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative w-full aspect-video">
              <img
                src={project.thumb || getPreviewSrc(project.url)}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (project.thumb && !target.dataset.fallbackTried) {
                    // Se a imagem local falhar, tenta screenshot do site
                    target.dataset.fallbackTried = '1';
                    target.src = getPreviewSrc(project.url);
                    return;
                  }
                  target.src = `https://placehold.co/1000x562/1f2937/ffffff?text=${encodeURIComponent(project.title)}`;
                }}
              />
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/15 backdrop-blur rounded-full p-3 hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
                  <BsPlayFill className="text-white text-3xl" />
                </div>
              </a>
            )}

            <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between gap-2 z-10">
              <div className="bg-black/70 text-white px-3 py-1 rounded text-xs md:text-sm max-w-[75%] truncate">
                {project.title}
              </div>
              {project.category && (
                <div className="bg-white/15 backdrop-blur px-2 py-1 rounded text-[10px] md:text-xs text-white">
                  {project.category}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* efeito glow removido para melhor performance */}
    </section>
  );
};

export default WorkGallery;
