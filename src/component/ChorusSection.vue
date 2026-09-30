<script setup lang="ts">
import capitol from '@/assets/images/capitol-chords-duotone.jpg'
import wibs from '@/assets/images/women-in-black-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<content-page id="chorus-view">
		<template v-slot:left-column>
			<v-img :src="wibs" />
			<h2 class="subtitle">
				<a href="https://www.womeninblack.de/" target="_blank">
					{{ t('chorus.wibs.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:right-column>
			<v-img :src="capitol" />
			<h2 class="subtitle">
				<a href="https://capitalchords.de/" target="_blank">
					{{ t('chorus.capitol.title') }}
				</a>
			</h2>
		</template>
	</content-page>
</template>

<style lang="scss">
#chorus-view {
	// Keep both photos level, whatever the headings below them do
	align-items: flex-start;

	.content-page-left,
	.content-page-right {
		container-type: inline-size;
	}

	// Shrink the headings with their column so they stay on one line.
	// "Women in Black" is the longest, at about 7.1em wide, so 13.5cqi leaves a little slack.
	h2.subtitle {
		font-size: min(var(--sub-header-text-size), 13.5cqi);
		line-height: 1.24;
		white-space: nowrap;
	}
}
</style>
