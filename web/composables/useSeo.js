export const useCreateSeoMeta = (data) => [
	{ hid: 'og:title', name: 'og:title', content: data.pageTitle },
	{ hid: 'og:site_name', name: 'og:site_name', content: data.pageTitle },
	{ hid: 'twitter:title', name: 'twitter:title', content: data.pageTitle },
	{ hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: data.pageTitle },

	{ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },

	{ hid: 'og:image', name: 'og:image', content: data.pageImage },
	{ hid: 'twitter:image', name: 'twitter:image', content: JSON.stringify(data.pageImage) },

	{ hid: 'description', name: 'description', content: data.pageDescription },
	{ hid: 'og:description', name: 'og:description', content: data.pageDescription },
	{ hid: 'twitter:description', name: 'twitter:description', content: data.pageDescription }
]