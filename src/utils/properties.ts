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
}

/**
 * Loads images from a folder in the public directory
 * Returns an array of image paths sorted alphabetically
 */
async function loadImagesFromFolder(folderName: string): Promise<string[]> {
	try {
		const imagesDir = join(process.cwd(), 'public', 'images', folderName);
		const files = await readdir(imagesDir);
		
		// Filter for common image extensions and sort
		const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP'];
		const imageFiles = files
			.filter(file => imageExtensions.some(ext => file.toLowerCase().endsWith(ext.toLowerCase())))
			.sort((a, b) => {
				// Natural sort: extract numbers and compare
				const numA = parseInt(a.match(/\d+/)?.[0] || '0');
				const numB = parseInt(b.match(/\d+/)?.[0] || '0');
				if (numA !== numB) return numA - numB;
				return a.localeCompare(b);
			});
		
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
export async function processProperties(properties: Property[]): Promise<Property[]> {
	return Promise.all(
		properties.map(async (property) => {
			if (property.imagesFolder) {
				const images = await loadImagesFromFolder(property.imagesFolder);
				return {
					...property,
					images,
				};
			}
			// If no imagesFolder and no images array, return empty array
			return {
				...property,
				images: property.images || [],
			};
		})
	);
}

export type { Property };

