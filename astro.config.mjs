// @ts-check
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

/** Set in deploy env so canonical URLs, OG tags, and sitemap use your real domain. */
const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ?? undefined;

function robotsTxtIntegration() {
	return {
		name: 'robots-txt',
		hooks: {
			/** @param {{ dir: URL }} opts */
			'astro:build:done': ({ dir }) => {
				if (!site) return;
				const body = [
					'User-agent: *',
					'Allow: /',
					'',
					`Sitemap: ${site}/sitemap-index.xml`,
					'',
				].join('\n');
				writeFileSync(fileURLToPath(new URL('robots.txt', dir)), body);
			},
		},
	};
}

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [...(site ? [sitemap()] : []), robotsTxtIntegration()],
	vite: {
		// Avoids dev-server 504 "Outdated Optimize Dep" on Leaflet after dep changes / HMR
		optimizeDeps: {
			include: ['leaflet'],
		},
	},
});
