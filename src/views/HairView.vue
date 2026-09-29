<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="hair-view">
		<h1>{{ t('hair.title') }}</h1>
		<p v-for="(spiel, idx) in tm('hair.spiel')" :key="idx">{{ spiel }}</p>
	</div>
</template>
