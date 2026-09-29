import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', redirect: '/bash' },
		{ path: '/chorus', redirect: '/bash' },
		{ path: '/event', redirect: '/bash' },
		{ path: '/bash', component: () => import('../views/HomeView.vue') },
		{ path: '/hair', component: () => import('../views/HairView.vue') },
	],
})

export default router
