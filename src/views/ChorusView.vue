<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="chorus-view" class="content-page">
		<v-container class="chorus-container">
			<h2>{{ t('chorus.capitol.title') }}</h2>
			<p v-for="(spiel, idx) in tm('chorus.capitol.spiel')" :key="idx">{{ spiel }}</p>
		</v-container>
		<v-container class="chorus-container">
			<h2>{{ t('chorus.wibs.title') }}</h2>
			<p v-for="(spiel, idx) in tm('chorus.wibs.spiel')" :key="idx">{{ spiel }}</p>
		</v-container>
	</div>
</template>

<style lang="scss"></style>
