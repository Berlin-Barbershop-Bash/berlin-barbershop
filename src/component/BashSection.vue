<script setup lang="ts">

import bariNice from '@/assets/images/bari-nice-to-meet-you-duotone-cropped.jpg'
import majorsFromBajor from '@/assets/images/majors-from-bajor-duotone.jpg'
import oneNightFriends from '@/assets/images/one-night-friends-duotone.jpg'
import trickiRicki from '@/assets/images/tricki-ricki-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import InterestForm from '@/component/InterestForm.vue'
import { useI18n } from 'vue-i18n'
import StyledButton from './StyledButton.vue'

const { tm } = useI18n()
</script>

<template>
	<content-page id="bash-section">
		<template v-slot:left-column>
			<v-carousel hide-delimiters :show-arrows="false" cycle hide-delimiter-background>
				<v-carousel-item>
					<v-img :src="majorsFromBajor" />
				</v-carousel-item>
				<v-carousel-item>
					<v-img :src="bariNice" />
				</v-carousel-item>
				<v-carousel-item>
					<v-img :src="oneNightFriends" />
				</v-carousel-item>
				<v-carousel-item>
					<v-img :src="trickiRicki" />
				</v-carousel-item>
			</v-carousel>
		</template>
		<template v-slot:right-column>
			<div class="spiel-container">
				<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
				<styled-button :text="t('bash.interest_form')" />
				<interest-form />
			</div>
		</template>
	</content-page>
</template>
