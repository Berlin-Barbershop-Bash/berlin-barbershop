import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	// New pages open at the top; back/forward restores; same-page hash changes (the interest
	// form) leave the scroll alone
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition
		return to.path === from.path ? false : { top: 0 }
	},
	routes: [
		{ path: '/', redirect: '/bash' },
		{ path: '/chorus', redirect: '/bash' },
		{ path: '/event', redirect: '/bash' },
		{ path: '/bash', component: () => import('../views/HomeView.vue') },
		{ path: '/hair', component: () => import('../views/HairView.vue') },
		{
			path: '/impressum',
			component: () => import('../views/LegalView.vue'),
			props: { page: 'impressum' },
		},
		{
			path: '/privacy',
			component: () => import('../views/LegalView.vue'),
			props: { page: 'privacy' },
		},
		{ path: '/datenschutz', redirect: '/privacy' },
	],
})

export default router
