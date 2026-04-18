// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	vite: {
		// Avoids dev-server 504 "Outdated Optimize Dep" on Leaflet after dep changes / HMR
		optimizeDeps: {
			include: ['leaflet'],
		},
	},
});
