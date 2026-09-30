<script setup lang="ts">

import bariNice from '@/assets/images/bari-nice-to-meet-you-duotone-cropped.jpg'
import majorsFromBajor from '@/assets/images/majors-from-bajor-duotone.jpg'
import oneNightFriends from '@/assets/images/one-night-friends-duotone.jpg'
import trickiRicki from '@/assets/images/tricki-ricki-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import InterestForm from '@/component/InterestForm.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const photos = [majorsFromBajor, bariNice, oneNightFriends, trickiRicki]
</script>

<template>
	<content-page id="bash-section" class="bash-details">
		<template v-slot:left-column>
			<!-- A slow crossfade every 10s instead of the default 6s slide -->
			<v-carousel
				class="calm-carousel"
				hide-delimiters
				:show-arrows="false"
				cycle
				interval="10000"
				hide-delimiter-background
				height="auto"
			>
				<v-carousel-item
					v-for="photo in photos"
					:key="photo"
					transition="fade-transition"
					reverse-transition="fade-transition"
				>
					<!-- eager: start loading as the slide mounts, not once it has faded in -->
					<v-img :src="photo" cover height="100%" eager />
				</v-carousel-item>
			</v-carousel>
		</template>
		<template v-slot:right-column>
			<div class="spiel-container welcome-container">
				<h2 class="subtitle">{{ t('bash.welcome.title') }}</h2>
				<p>{{ t('bash.welcome.body') }}</p>
				<i18n-t tag="p" keypath="bash.welcome.cta" scope="global">
					<template #link>
						<router-link :to="{ hash: '#interest-form' }">
							{{ t('bash.welcome.cta_link') }}
						</router-link>
					</template>
				</i18n-t>
				<interest-form />
			</div>
		</template>
	</content-page>
</template>

<style lang="scss">
// Two columns: the welcome text keeps to the "Capital Chords" photo's width above it, centred like
// the photo. (Stacked on phones it keeps the full width, as the photos may shrink to fit the screen.)
@media screen and (min-width: 801px) {
	.welcome-container {
		width: min(100%, var(--chorus-right-photo-width, 100%));
		margin-inline: auto;
	}
}

.calm-carousel {
	// A 4:3 frame sized by the column instead of Vuetify's fixed 500px, so the text follows the
	// photos directly on narrow screens; each photo fills the frame, cropped at the edges
	aspect-ratio: 4 / 3;
	// As wide as the "Women in Black" photo above (set by ChorusSection), centred like it
	width: min(100%, var(--chorus-left-photo-width, 100%));
	margin-inline: auto;

	.v-window__container,
	.v-window-item {
		height: 100%;
	}

	// Stack the outgoing and incoming photos so they crossfade in place
	.v-window-item {
		transition-duration: 1.5s !important;
	}

	.fade-transition-leave-active {
		position: absolute !important;
		inset: 0;
	}
}
</style>
