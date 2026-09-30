<script setup lang="ts">
import SiteFooter from '@/component/SiteFooter.vue'
</script>

<template>
	<v-app class="application-container">
		<v-container class="router">
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
