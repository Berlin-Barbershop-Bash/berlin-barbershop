<script setup lang="ts">
import capital from '@/assets/images/capital-chords-duotone.jpg'
import wibs from '@/assets/images/women-in-black-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import DoubleArrow from '@/component/DoubleArrow.vue'
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Share each photo's on-screen width as --chorus-left-photo-width / --chorus-right-photo-width, so
// the bash section below can line up with them (carousel left, welcome text right). The photos
// shrink to fit the landing screen (object-fit: contain), so their visible widths depend on the
// window's height as well as its width.
const photos = {
	'--chorus-left-photo-width': useTemplateRef<HTMLImageElement>('wibsPhoto'),
	'--chorus-right-photo-width': useTemplateRef<HTMLImageElement>('capitalPhoto'),
}
function sharePhotoWidths() {
	for (const [property, photo] of Object.entries(photos)) {
		const img = photo.value
		if (!img?.naturalWidth) continue
		const box = img.getBoundingClientRect()
		const width = Math.min(box.width, (box.height * img.naturalWidth) / img.naturalHeight)
		document.documentElement.style.setProperty(property, `${width}px`)
	}
}
const observer = new ResizeObserver(sharePhotoWidths)
onMounted(() => {
	for (const photo of Object.values(photos)) if (photo.value) observer.observe(photo.value)
})
onUnmounted(() => {
	observer.disconnect()
	for (const property of Object.keys(photos)) document.documentElement.style.removeProperty(property)
})

</script>

<template>
	<content-page id="chorus-view">
		<template v-slot:left-column>
			<img ref="wibsPhoto" :src="wibs" alt="" class="chorus-photo" @load="sharePhotoWidths" />
			<h2 class="subtitle">
				<a href="https://www.womeninblack.de/" target="_blank">
					{{ t('chorus.wibs.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:right-column>
			<img
				ref="capitalPhoto"
				:src="capital"
				alt=""
				class="chorus-photo"
				@load="sharePhotoWidths"
			/>
			<h2 class="subtitle">
				<a href="https://capitalchords.de/" target="_blank">
					{{ t('chorus.capital.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:full-width>
			<!-- Word joiners (&#8288;) keep the arrows on the same line as the text next to them -->
			<p class="cohost-line">
				<double-arrow class="cohost-arrow" />&#8288;<i18n-t keypath="chorus.cohosting" scope="global">
					<template #bash>
						<em>{{ t('chorus.cohosting_bash') }}</em>
					</template>
				</i18n-t>&#8288;<double-arrow class="cohost-arrow" />
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
		vertical-align: baseline;
		margin-inline: 0.3em;
	}
}
</style>
