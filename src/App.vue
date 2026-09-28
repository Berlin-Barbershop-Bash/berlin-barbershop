<script setup lang="ts">
import AppFooter from '@/component/AppFooter.vue'
import AppHeader from '@/component/AppHeader.vue'
import { ref } from 'vue'

const headerHeight = ref<number>()
const setHeaderHeight = (v: number | undefined) => (headerHeight.value = v)
const footerHeight = ref<number>()
const setFooterHeight = (v: number | undefined) => (footerHeight.value = v)
</script>

<template>
	<v-app class="application-container">
		<app-header :set-header-height="setHeaderHeight" />
		<v-container
			class="router"
			:style="{ marginTop: `${headerHeight}px`, marginBottom: `${footerHeight}px` }"
		>
			<router-view />
		</v-container>
		<app-footer :set-footer-height="setFooterHeight" />
	</v-app>
</template>

<style lang="scss">
.application-container {
	background-color: var(--content-background-color);
}
.router {
	margin-bottom: 0;
	margin-left: 0;
	margin-right: 0;
	max-width: none;
	background-color: var(--content-background-color);
	color: var(--content-text-color);
}
h1.title {
	background-color: var(--header-background-color);
	color: var(--header-text-color);

	font-family: var(--header-text-font);
	font-size: var(--header-text-size);
	font-weight: var(--header-text-weight);
	font-feature-settings: var(--font-feat-global);

	display: block;
	text-align: center;
	text-transform: lowercase;
	margin: 0;
	padding: 0;
}
.content-page {
	display: flex;
	width: 100%;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	gap: 16px;

	p {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
	}

	div.content-page-left {
		.v-img {
			max-height: 480px;
		}
		@media screen and (min-width: 800px) {
			width: calc(50% - 8px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	div.content-page-right {
		@media screen and (min-width: 800px) {
			width: calc(50% - 8px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	.v-btn {
		background-color: var(--content-button-color);
		color: var(--content-button-text-color);

		font-family: var(--content-button-text-font);
		font-size: var(--content-button-text-size);
		font-weight: var(--content-button-text-weight);
	}
}
</style>
