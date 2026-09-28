<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="bash-view" class="content-page">
		<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
		<v-btn>
			{{ t('bash.interest_form') }}
		</v-btn>
	</div>
</template>

<style lang="scss"></style>
