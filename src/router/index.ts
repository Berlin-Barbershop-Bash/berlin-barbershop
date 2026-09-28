import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/', redirect: '/bash' },
		{ path: '/chorus', component: () => import('../views/ChorusView.vue') },
		{ path: '/event', component: () => import('../views/EventView.vue') },
		{ path: '/bash', component: () => import('../views/BashView.vue') },
		{ path: '/hair', component: () => import('../views/HairView.vue') },
	],
})

export default router
