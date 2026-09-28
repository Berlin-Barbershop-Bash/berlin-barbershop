<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="chorus-view" class="content-page">
		<div class="content-page-left">
			<p v-for="(spiel, idx) in tm('chorus.wibs.spiel')" :key="idx">{{ spiel }}</p>
			<h2 class="subtitle">{{ t('chorus.wibs.title') }}</h2>
		</div>
		<div class="content-page-right">
			<p v-for="(spiel, idx) in tm('chorus.capitol.spiel')" :key="idx">{{ spiel }}</p>
			<h2 class="subtitle">{{ t('chorus.capitol.title') }}</h2>
		</div>
	</div>
</template>

<style lang="scss"></style>
