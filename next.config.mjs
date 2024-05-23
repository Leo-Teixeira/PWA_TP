import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js"

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
      reloadOnOnline: false,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/localhost:\d+\/socket\.io\//,
          handler: 'NetworkOnly',
        },
        // Ajoute ici d'autres stratégies de mise en cache si nécessaire
      ],
    })
    return withPWA(nextConfig)
  }
  return nextConfig
}

export default nextConfigFunction
