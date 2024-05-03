import {PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD} from "next/constants.js"

/** @type {import("next").NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}

const nextConfigFunction = async (phase) => {
	return nextConfig
}

export default nextConfigFunction
