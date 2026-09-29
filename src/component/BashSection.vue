<script setup lang="ts">
import majorsFromBajor from '@/assets/images/majors-from-bajor.jpg'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="bash-section" class="content-page">
		<div class="content-page-left">
			<v-img :src="majorsFromBajor" />
		</div>
		<div class="content-page-right">
			<div class="spiel-container">
				<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
				<v-btn>
					{{ t('bash.interest_form') }}
				</v-btn>
			</div>
		</div>
	</div>
</template>
