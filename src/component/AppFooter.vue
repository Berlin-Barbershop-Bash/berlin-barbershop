<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<footer>
		<h1 class="title">
			{{ t('home.footer') }}
		</h1>
	</footer>
</template>

<style lang="scss"></style>
