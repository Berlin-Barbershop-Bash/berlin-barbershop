<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, t, availableLocales } = useI18n()

const setLang = (loc: string) => (locale.value = loc)
</script>

<template>
	<div class="menu">
		<div class="left-container">
			<v-btn href="/bash">{{ t('bash.menu') }}</v-btn>
			<v-btn href="/chorus">{{ t('chorus.menu') }}</v-btn>
		</div>
		<div class="right-container" v-if="availableLocales.length > 1">
			<template v-for="(lang, idx) in availableLocales" :key="idx">
				<template v-if="idx > 0">|</template>
				<v-btn @click="() => setLang(lang)">{{ lang }}</v-btn>
			</template>
		</div>
	</div>
</template>

<style lang="scss">
.menu {
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	.left-container {
		flex-grow: 1;
		display: flex;
		flex-flow: row nowrap;
		.v-btn {
			flex-grow: 1;
			text-transform: lowercase;
		}
	}
}
</style>
