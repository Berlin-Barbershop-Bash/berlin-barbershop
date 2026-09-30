<script setup lang="ts">
import majorsFromBajor from '@/assets/images/majors-from-bajor.jpg'
import InterestForm from '@/component/InterestForm.vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()
</script>

<template>
	<div id="bash-section" class="content-page">
		<div class="content-page-left">
			<v-img :src="majorsFromBajor" />
		</div>
		<div class="content-page-right">
			<div class="spiel-container">
				<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
				<interest-form />
			</div>
		</div>
	</div>
</template>
