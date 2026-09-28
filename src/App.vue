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
	font-feature-settings: var(--font-feat-polymath);
	font-variation-settings: var(--font-var-polymath);
	line-height: var(--header-line-height);

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

	padding: 32px;
	gap: 24px;

	h2 {
		font-family: var(--sub-header-text-font);
		font-size: var(--sub-header-text-size);
		font-weight: var(--sub-header-text-weight);
		font-feature-settings: var(--font-feat-polymath);
		font-variation-settings: var(--font-var-polymath);
		line-height: var(--sub-header-line-height);
		text-transform: lowercase;
		text-align: center;

		padding: 0;
		margin: 0;
	}

	p {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
		line-height: var(--content-line-height);

		padding: 0;
		margin: 0;
	}

	.spiel-container {
		display: flex;
		flex-flow: column nowrap;
		gap: 24px;
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
		line-height: var(--content-button-line-height);

		border-radius: 40px;
		padding: 4px 20px;

		text-transform: lowercase;

		width: fit-content;
	}

	div.content-page-left {
		@media screen and (min-width: 800px) {
			width: calc(50% - 12px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	div.content-page-right {
		@media screen and (min-width: 800px) {
			width: calc(50% - 12px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}
}
</style>
