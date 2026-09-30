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
			>
				<v-carousel-item
					v-for="photo in photos"
					:key="photo"
					transition="fade-transition"
					reverse-transition="fade-transition"
				>
					<v-img :src="photo" />
				</v-carousel-item>
			</v-carousel>
		</template>
		<template v-slot:right-column>
			<div class="spiel-container">
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
.calm-carousel {
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
