import type { NextConfig } from 'next';

/**
 * Bazowa sciezka dla GitHub Pages.
 * Repo publikowane jako https://<user>.github.io/<repo>/ wymaga basePath.
 * Workflow ustawia NEXT_PUBLIC_BASE_PATH automatycznie; lokalnie jest pusty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Pelny static export - zero serwera, dziala na GitHub Pages.
  output: 'export',

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // GitHub Pages serwuje katalogi z index.html, wiec trailing slash jest wymagany,
  // inaczej /produkty zwraca 404 zamiast /produkty/index.html.
  trailingSlash: true,

  images: {
    // next/image nie ma serwera przy output:'export' - obrazy sa juz zoptymalizowane
    // przez scripts/optimize-images.mjs do AVIF/WebP.
    unoptimized: true,
  },

  // Blad typow lub lintu ma zatrzymac build produkcyjny.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
