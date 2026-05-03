/** Meta description length guideline for SERPs (~155–160 chars). */
export function truncateMetaDescription(text: string, maxLen = 158): string {
	const t = text.replace(/\s+/g, ' ').trim();
	if (t.length <= maxLen) return t;
	const cut = t.slice(0, maxLen + 1);
	const lastSpace = cut.lastIndexOf(' ');
	return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut.slice(0, maxLen)).trimEnd() + '…';
}

export function absoluteUrl(pathOrUrl: string, site: URL | undefined): string | undefined {
	if (!site) return undefined;
	try {
		return new URL(pathOrUrl, site).href;
	} catch {
		return undefined;
	}
}
