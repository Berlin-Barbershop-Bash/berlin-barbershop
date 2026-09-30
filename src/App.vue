<script setup lang="ts">
import SiteFooter from '@/component/SiteFooter.vue'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

// Tell browsers and screen readers the page's language, and give each page its own tab title
watchEffect(() => {
	document.documentElement.lang = locale.value
	const site = `${t('home.berlin')} ${t('home.barbershop')}`
	const titleKey = route.meta.titleKey as string | undefined
	document.title = titleKey ? `${t(titleKey)} · ${site}` : site
})
</script>

<template>
	<v-app class="application-container">
		<v-container tag="main" class="router">
			<router-view />
		</v-container>
		<site-footer />
	</v-app>
</template>

<style lang="scss">
.application-container {
	background-color: var(--content-background-color);
}

.router {
	background-color: var(--content-background-color);
	color: var(--content-text-color);

	margin: 0;
	padding: 0;
	max-width: none;

	// Fill the window on short pages so the footer sits at the bottom
	flex: 1 0 auto;
}
</style>
