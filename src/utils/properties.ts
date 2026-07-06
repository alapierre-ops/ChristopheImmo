import { readdir } from 'fs/promises';
import { join } from 'path';

interface Property {
	id: string;
	title: string;
	address: string;
	price: number;
	surface: number;
	rooms: number;
	description?: string;
	shortDescription?: string;
	/** Full text with blank lines between paragraphs (after normalization from JSON). */
	longDescription?: string;
	images?: string[];
	imagesFolder?: string;
	features: string[];
	priceNote?: string;
	leaseType?: string;
	leasePeriod?: string;
	floor?: string;
	additionalCharges?: {
		edf?: string;
		internet?: string;
		deposit?: string;
	};
	parking?: string;
	isColocation?: boolean;
	colocationPrice?: number | string;
	colocationDetails?: string;
	/**
	 * WGS84 center for an approximate map zone (not exact address).
	 * `radiusMeters` controls the privacy circle size (default 150 m).
	 */
	coordinates?: {
		lat: number;
		lng: number;
		/** Circle radius on the map; omit to use default (~150 m). */
		radiusMeters?: number;
	};
	/** Omit or `true` = listed as available; `false` = shown at the bottom as unavailable. */
	available?: boolean;
}

/** Raw shape in `properties.json`: paragraphs as separate strings for easier editing. */
export type PropertyJson = Omit<Property, 'longDescription'> & {
	longDescription?: string | string[];
};

function normalizeLongDescription(
	desc: string | string[] | undefined
): string | undefined {
	if (desc === undefined) return undefined;
	if (typeof desc === 'string') return desc;
	return desc
		.map((p) => p.trim())
		.filter(Boolean)
		.join('\n\n');
}

/** Natural numeric order: indus2 before indus10, not between indus19 and indus20. */
export function compareImageFilenames(a: string, b: string): number {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * Loads images from a folder in the public directory
 * Returns an array of image paths in natural numeric order
 */
async function loadImagesFromFolder(folderName: string): Promise<string[]> {
	try {
		const imagesDir = join(process.cwd(), 'public', 'images', folderName);
		const files = await readdir(imagesDir);
		
		// Filter for common image extensions and sort
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'];
		const imageFiles = files
			.filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext.toLowerCase())))
			.sort(compareImageFilenames);
		
		// Return paths relative to public directory
		return imageFiles.map(file => `/images/${folderName}/${file}`);
	} catch (error) {
		console.warn(`Could not load images from folder ${folderName}:`, error);
		return [];
	}
}

/**
 * Processes properties to ensure all have an images array
 * If imagesFolder is specified, loads images from that folder
 * Otherwise uses the existing images array or returns empty array
 */
export async function processProperties(properties: PropertyJson[]): Promise<Property[]> {
	const processed = await Promise.all(
		properties.map(async (property) => {
			const longDescription = normalizeLongDescription(property.longDescription);
			const base = { ...property, longDescription };
			if (property.imagesFolder) {
				const images = await loadImagesFromFolder(property.imagesFolder);
				return {
					...base,
					images,
				};
			}
			return {
				...base,
				images: property.images || [],
			};
		})
	);

	return processed.sort((a, b) => {
		const aAvailable = a.available !== false;
		const bAvailable = b.available !== false;
		if (aAvailable === bAvailable) return 0;
		return aAvailable ? -1 : 1;
	});
}

export type { Property };

