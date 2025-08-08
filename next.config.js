/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido 'output: export' para habilitar API Routes e permitir imagens dinâmicas
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Mantemos unoptimized para evitar dependência do otimizador em ambientes simples
    unoptimized: true,
  },
};

module.exports = nextConfig;
