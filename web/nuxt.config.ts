export default defineNuxtConfig({

	app: {
		head: {
			title: process.env.SITE_TITLE,
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
				{ hid: 'robots', name: 'robots', content: 'index, follow' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: 'favicon.png' },
			]
		},
		pageTransition: false,
		layoutTransition: false
	},

	runtimeConfig: {
		public: {
			siteTitle: process.env.SITE_TITLE,
			FLODESK_API_KEY: process.env.FLODESK_API_KEY,
		}
	},

	css: [
		'~/assets/css/reset.css',
		'~/assets/css/global.scss'
	],

	vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/assets/scss/_mixins.scss";'
                }
            }
        }
    },

	experimental: { inlineSSRStyles: false },

	modules: [
		'@nuxtjs/sanity', 
		'@pinia/nuxt',
		'@nuxtjs/sitemap',
		'nuxt-fathom',
	],

	build: {
		transpile: ['swiper', 'gsap', 'pinia']
	},
	
	sanity: {
		'projectId': process.env.SANITY_PROJECT_ID,
    	'dataset': process.env.SANITY_PROJECT_DATASET,
		'apiVersion': process.env.SANITY_API_VERSION,
		'useCdn': false
	},

	fathom: {
		siteId: "FHYWDQYE",
	},

	site: {
		url: process.env.SITE_URL,
	},

	sitemap: {
		xsl: false,
	},

	routeRules: {

		// Redirects
		'/agency/danaya': {
			redirect: {
				to: '/agency/djekady',
				statusCode: 301 
			},
		},

	},

})
