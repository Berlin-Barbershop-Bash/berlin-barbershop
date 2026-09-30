<script setup lang="ts">
import { useI18n } from 'vue-i18n'

// A plain reading page (legal pages, /hair): a bar leading home, a title, and a text column
defineProps<{ title: string }>()

const { t } = useI18n()
</script>

<template>
	<div class="text-page">
		<router-link to="/bash" class="text-page-home">
			{{ t('home.berlin') }} {{ t('home.barbershop') }} {{ t('home.bash') }}
		</router-link>
		<article class="text-page-body">
			<h1>{{ title }}</h1>
			<slot />
		</article>
	</div>
</template>

<style lang="scss">
.text-page {
	.text-page-home {
		display: block;
		padding: 16px 32px;

		background-color: var(--header-background-color);
		color: var(--header-text-color);

		font-family: var(--header-text-font);
		font-weight: var(--header-text-weight);
		font-feature-settings: var(--font-feat-polymath);
		font-variation-settings: var(--font-var-polymath);
		font-size: var(--sub-header-text-size);
		line-height: var(--sub-header-line-height);
		text-align: center;
		text-transform: lowercase;
		text-decoration: none;

		transition:
			background-color 0.2s ease,
			color 0.2s ease;

		// Like the buttons: the colours flip rather than underlining
		&:hover {
			background-color: var(--header-text-color);
			color: var(--header-background-color);
		}

		&:focus-visible {
			outline: 3px solid var(--header-text-color);
			outline-offset: -3px;
		}

		// The hover fill is the outline's colour, so switch the outline to stay visible
		&:hover:focus-visible {
			outline-color: var(--header-background-color);
		}
	}

	.text-page-body {
		// A readable line length, left-aligned with the home page's columns
		max-width: calc(900px + 2 * var(--page-gutter));
		display: flex;
		flex-flow: column nowrap;
		gap: 16px;

		@media screen and (min-width: 801px) {
			padding: 64px var(--page-gutter) 96px;
		}
		@media screen and (max-width: 800px) {
			padding: 48px var(--page-gutter) 64px;
		}
		// Large screens: the same left column as the home page's two-column sections, whose
		// columns are half the row less half the gap; the width here includes the side padding
		@media screen and (min-width: 1200px) {
			max-width: none;
			width: calc(50% - var(--column-gap) / 2 + var(--page-gutter));
		}
	}

	h1,
	h2 {
		font-family: var(--header-text-font);
		font-weight: var(--header-text-weight);
		font-feature-settings: var(--font-feat-polymath);
		font-variation-settings: var(--font-var-polymath);
		text-transform: lowercase;
		margin: 0;
	}

	h1 {
		font-size: calc(var(--sub-header-text-size) * 1.4);
		line-height: 1.15;
		margin-bottom: 16px;
	}

	h2 {
		font-size: var(--sub-header-text-size);
		line-height: var(--sub-header-line-height);
		margin-top: 32px;
	}

	p,
	li {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
		line-height: var(--content-line-height);
		margin: 0;
	}

	a {
		color: inherit;
	}

	// Postal addresses and similar, one line per entry
	.lines {
		white-space: pre-line;
	}
}
</style>
