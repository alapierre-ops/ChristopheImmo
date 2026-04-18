const observerOptions: IntersectionObserverInit = {
	threshold: 0.08,
	rootMargin: '0px 0px -32px 0px',
};

function revealAllStatically(): void {
	document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
		el.classList.add('is-revealed');
	});
}

export function initScrollReveal(): void {
	if (typeof window === 'undefined') return;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		revealAllStatically();
		return;
	}

	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add('is-revealed');
			observer.unobserve(entry.target);
		}
	}, observerOptions);

	document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
	document.querySelectorAll('.reveal-stagger').forEach((el) => observer.observe(el));
}
