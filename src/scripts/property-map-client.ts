import L from 'leaflet';

const DEFAULT_RADIUS_M = 150;

/** Max zoom passed to `fitBounds` only (ceiling). Must be high enough that a small circle can fill the frame; a low value (e.g. 12) forces a wide, “zoomed out” view. */
const FIT_BOUNDS_MAX_ZOOM = 14;

/** Circle only — no pin/marker images (privacy + avoids broken Leaflet icon URLs). */
export function initPropertyMap(el: HTMLElement): void {
	const lat = parseFloat(el.dataset.lat || '');
	const lng = parseFloat(el.dataset.lng || '');
	const title = el.dataset.title || '';
	let radiusM = parseFloat(el.dataset.radiusMeters || '');
	if (Number.isNaN(radiusM) || radiusM < 25) {
		radiusM = DEFAULT_RADIUS_M;
	}

	if (Number.isNaN(lat) || Number.isNaN(lng)) return;
	if (el.dataset.mapInit === 'true') return;
	el.dataset.mapInit = 'true';

	// Initial view is replaced immediately by fitBounds — tuning zoom only happens there.
	const map = L.map(el, {
		scrollWheelZoom: false,
		attributionControl: true,
	}).setView([lat, lng], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	const circle = L.circle([lat, lng], {
		radius: radiusM,
		stroke: true,
		color: '#667eea',
		weight: 2,
		opacity: 0.55,
		fillColor: '#667eea',
		fillOpacity: 0.18,
	}).addTo(map);

	const popupHtml = `
		<div class="property-map-popup">
			<strong>${escapeHtml(title)}</strong>
			<p class="property-map-popup-note">Zone indicative — l’emplacement exact n’est pas affiché.</p>
		</div>`;
	circle.bindPopup(popupHtml);

	// Frame the circle. `setView` above is ignored for the final zoom — only this matters.
	// `maxZoom` is a ceiling: leaflet chooses zoom to fit bounds + padding, but not above this (street-level ~17+ would be too tight).
	map.fitBounds(circle.getBounds(), {
		padding: [30, 30],
		maxZoom: FIT_BOUNDS_MAX_ZOOM,
	});

	const fixSize = () => map.invalidateSize();
	requestAnimationFrame(fixSize);
	setTimeout(fixSize, 400);
	window.addEventListener('resize', fixSize);

	window.addEventListener(
		'pagehide',
		() => {
			window.removeEventListener('resize', fixSize);
			map.remove();
		},
		{ once: true }
	);
}

function escapeHtml(s: string): string {
	const div = document.createElement('div');
	div.textContent = s;
	return div.innerHTML;
}

export function mountAllPropertyMaps(): void {
	document.querySelectorAll('.property-map-root[data-lat][data-lng]').forEach((node) => {
		if (node instanceof HTMLElement) initPropertyMap(node);
	});
}
