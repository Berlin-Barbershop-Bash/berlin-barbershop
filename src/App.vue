<script setup lang="ts"></script>

<template>
	<v-app class="application-container">
		<v-container class="router">
			<router-view />
		</v-container>
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

	h2 {
		font-family: var(--header-text-font);
		font-feature-settings: var(--font-feat-global);
		text-transform: lowercase;

		text-align: center;
	}

	p {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
	}

	.v-img {
		max-height: 480px;
		max-width: 100%;
	}

	.v-btn {
		background-color: var(--content-button-color);
		color: var(--content-button-text-color);

		font-family: var(--content-button-text-font);
		font-size: var(--content-button-text-size);
		font-weight: var(--content-button-text-weight);
	}

	div.content-page-left {
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
}
</style>
