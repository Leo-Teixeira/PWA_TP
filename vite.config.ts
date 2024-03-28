import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import {VitePWA} from "vite-plugin-pwa"
// import vitePluginSass  from 'vite-plugin-sass'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
            injectRegister: 'auto',
			devOptions: {
				enabled: true,
			},
		}),
	],
})
