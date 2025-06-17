'use client';
import Image from 'next/image';
import { BsPlayFill } from 'react-icons/bs';

const projects = [
  {
    title: 'JR movies',
    path: '/JRmovies.png',
    url: 'https://jrmovies.netlify.app/',
  },
  {
    title: 'clone netFlix',
    path: '/netfilx.png',
    url: 'https://jaymisom123.github.io/cafeteria/',
  },
  
  {
    title: 'JR <CodeIA>',
    path: '/codeIA.png',
    url: 'https://jrcodeia.netlify.app/',
  },

  {
    title: 'Cafeteria Landing Page',
    path: '/cafeteira.png',
    url: 'https://jaymisom123.github.io/cafeteria/',
  },
  {
    title: 'Burger show',
    path: '/devburger.png',
    url: 'https://github.com/Jaymisom123/devburger-interface',
  },
  {
    title: 'Sulla Jeans',
    path: '/sullajeans.png',
    url: 'https://sullajeans.netlify.app/',
  },
  {
    title: 'Loja de Roupas',
    path: '/loja.png',
    url: 'https://jaymisom123.github.io/loja/',
  },
  {
    title: 'Clínica JR',
    path: '/clinicajr.png',
    url: 'https://clinicajr.netlify.app/',
  },
  {
    title: 'JR studio',
    path: '/jrstudio.png',
    url: 'https://jrstudio.netlify.app/',
  },
  {
    title: 'Projeto 4',
    path: '/thumb4.jpg',
  },
];

const WorkGallery = () => {
  return (
    <section className="w-full px-4 py-10 mt-4 relative flex justify-center items-center animated-glow">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 w-full max-w-7xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden group bg-neutral-800 shadow-md"
          >
            <div className="relative w-full aspect-video">
              <Image
                src={project.path}
                alt={project.title}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4 hover:scale-110 transition-transform duration-300">
                  <BsPlayFill className="text-white text-4xl" />
                </div>
              </a>
            )}

            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded text-sm z-10">
              {project.title}
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .animated-glow::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 16px;
          background: linear-gradient(270deg, #8D939B, #F53125, #6A49E8, #8D939B);
          background-size: 800% 800%;
          z-index: 0;
          filter: blur(15px);
          animation: borderGlow 8s linear infinite;
        }

        @keyframes borderGlow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default WorkGallery;
