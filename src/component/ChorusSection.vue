<script setup lang="ts">
import capitol from '@/assets/images/capitol-chords-duotone.jpg'
import wibs from '@/assets/images/women-in-black-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Double down-arrow from the design, 29×36
const arrowPaths = [
	'M16.6201 19.2909C15.4188 20.833 13.0871 20.8327 11.8862 19.2903L0.638383 4.84295C-0.895744 2.87244 0.508658 -0.000322079 3.00595 2.70838e-08L25.5054 0.00290206C28.0027 0.00322416 29.4063 2.87635 27.8717 4.84647L16.6201 19.2909Z',
	'M16.6201 34.2909C15.4188 35.833 13.0871 35.8327 11.8862 34.2902L0.638383 19.8429C-0.895744 17.8724 0.508658 14.9997 3.00595 15L25.5054 15.0029C28.0027 15.0032 29.4063 17.8764 27.8717 19.8465L16.6201 34.2909Z',
]
</script>

<template>
	<content-page id="chorus-view">
		<template v-slot:left-column>
			<img :src="wibs" alt="" class="chorus-photo" />
			<h2 class="subtitle">
				<a href="https://www.womeninblack.de/" target="_blank">
					{{ t('chorus.wibs.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:right-column>
			<img :src="capitol" alt="" class="chorus-photo" />
			<h2 class="subtitle">
				<a href="https://capitalchords.de/" target="_blank">
					{{ t('chorus.capitol.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:full-width>
			<!-- Word joiners (&#8288;) keep the arrows on the same line as the text next to them -->
			<p class="cohost-line">
				<svg class="cohost-arrow" viewBox="0 0 29 36" aria-hidden="true">
					<path v-for="d in arrowPaths" :key="d" :d="d" />
				</svg>&#8288;<i18n-t keypath="chorus.cohosting" scope="global">
					<template #bash>
						<em>{{ t('chorus.cohosting_bash') }}</em>
					</template>
				</i18n-t>&#8288;<svg class="cohost-arrow" viewBox="0 0 29 36" aria-hidden="true">
					<path v-for="d in arrowPaths" :key="d" :d="d" />
				</svg>
			</p>
		</template>
	</content-page>
</template>

<style lang="scss">
#chorus-view {
	// A grid whose photo rows can shrink to nothing, so the whole block fits
	// between "berlin" and "barbershop" (see .landing-fill in HomeView)
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: minmax(0, max-content) auto;
	align-content: center;
	// Columns fill their row so the photos shrink with it (and stay level side by side)
	align-items: stretch;
	gap: 24px;

	@media screen and (max-width: 800px) {
		grid-template-columns: 1fr;
		grid-template-rows: minmax(0, max-content) minmax(0, max-content) auto;
	}

	.content-page-left,
	.content-page-right {
		container-type: inline-size;
		width: auto;
		min-height: 0;

		display: flex;
		flex-flow: column nowrap;
	}

	.content-page-full {
		grid-column: 1 / -1;
	}

	// Full width when there's room; shrinks (keeping its shape) when there isn't
	.chorus-photo {
		width: 100%;
		min-height: 0;
		flex: 0 1 auto;
		object-fit: contain;
	}

	// Shrink the headings with their column so they stay on one line.
	// "Women in Black" is the longest, at about 7.1em wide, so 13.5cqi leaves a little slack.
	h2.subtitle {
		font-size: min(var(--sub-header-text-size), 13.5cqi);
		line-height: 1.24;
		white-space: nowrap;
	}

	// Body text (from .content-page p), centred under the two choruses
	.cohost-line {
		text-align: center;
		text-wrap: balance;
	}

	// Kept small next to the body text
	.cohost-arrow {
		height: 0.6em;
		width: auto;
		fill: currentColor;
		vertical-align: baseline;
		margin-inline: 0.3em;
	}
}
</style>
