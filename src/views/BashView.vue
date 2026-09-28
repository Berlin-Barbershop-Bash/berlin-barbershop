<script setup lang="ts">
import signedMusic from '@/assets/images/signed-music.jpg'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
	<div id="bash-view" class="content-page">
		<div class="content-page-left">
			<v-img :src="signedMusic" />
		</div>
		<div class="content-page-right">
			<p v-for="(spiel, idx) in tm('bash.spiel')" :key="idx">{{ spiel }}</p>
			<v-btn>
				{{ t('bash.interest_form') }}
			</v-btn>
		</div>
	</div>
</template>

<style lang="scss"></style>
