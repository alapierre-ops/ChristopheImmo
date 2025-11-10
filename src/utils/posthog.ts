/**
 * Utilitaire pour tracker les événements PostHog
 * Vérifie si PostHog est disponible avant d'envoyer les événements
 */

declare global {
	interface Window {
		posthog?: {
			capture: (eventName: string, properties?: Record<string, any>) => void;
		};
	}
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
	if (typeof window !== 'undefined' && window.posthog) {
		window.posthog.capture(eventName, properties);
	}
}

export const events = {
	propertyViewed: (propertyId: string, propertyTitle: string) => 
		trackEvent('property_viewed', { property_id: propertyId, property_title: propertyTitle }),
	
	propertyCardClicked: (propertyId: string, propertyTitle: string) => 
		trackEvent('property_card_clicked', { property_id: propertyId, property_title: propertyTitle }),
	
	backToListClicked: () => 
		trackEvent('back_to_list_clicked'),
	
	emailClicked: (propertyId: string, propertyTitle: string) => 
		trackEvent('email_clicked', { property_id: propertyId, property_title: propertyTitle }),
	
	phoneClicked: (propertyId: string, propertyTitle: string) => 
		trackEvent('phone_clicked', { property_id: propertyId, property_title: propertyTitle }),
	
	galleryImageChanged: (propertyId: string, imageIndex: number) => 
		trackEvent('gallery_image_changed', { property_id: propertyId, image_index: imageIndex }),
	
	pageView: (pageName: string) => 
		trackEvent('$pageview', { page_name: pageName }),
};