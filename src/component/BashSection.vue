<script setup lang="ts">
import majorsFromBajor from '@/assets/images/majors-from-bajor-duotone.jpg'
import ContentPage from '@/component/ContentPage.vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<content-page id="bash-section">
		<template v-slot:left-column>
			<v-img :src="majorsFromBajor" />
		</template>
		<template v-slot:right-column>
			<div class="spiel-container">
				<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
				<v-btn variant="flat">
					{{ t('bash.interest_form') }}
				</v-btn>
			</div>
		</template>
	</content-page>
</template>
