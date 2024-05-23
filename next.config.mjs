
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants.js';

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias['@sw.js'] = require.resolve('./public/sw.js');
    }
    return config;
  },
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import('@ducanh2912/next-pwa')).default({
      dest: 'public',
      register: true,
      skipWaiting: true,
      customWorkerSrc: "worker",
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/.*\/socket\.io\//,
          handler: 'NetworkOnly', // Ne pas mettre en cache les requêtes WebSocket
          options: {
            cacheName: 'socket-io',
            networkTimeoutSeconds: 10,
          },
        },
        // Ajoutez d'autres stratégies de mise en cache si nécessaire
      ],
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};

export default nextConfigFunction;