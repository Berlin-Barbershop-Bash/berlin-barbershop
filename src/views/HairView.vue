<script setup lang="ts">
import TextPage from '@/component/TextPage.vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<text-page id="hair-view" :title="t('hair.title')">
		<p v-for="(spiel, idx) in tm('hair.spiel')" :key="idx">{{ spiel }}</p>
	</text-page>
</template>
