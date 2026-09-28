<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
const setLang = (loc: string) => (locale.value = loc)
</script>

<template>
	<div id="language-container" v-if="availableLocales.length > 0">
		<template v-for="(lang, idx) in availableLocales" :key="idx">
			<div v-if="idx > 0" class="divider">|</div>
			<v-btn @click="() => setLang(lang)" variant="plain" class="ma-0 pa-0 language-option">
				{{ lang }}
			</v-btn>
		</template>
	</div>
</template>

<style lang="scss">
#language-container {
	position: fixed;
	right: 0;
	top: 20px;

	.language-option {
		font-family: var(--language-option-text-font);
		font-size: var(--language-option-text-size);
		font-weight: var(--language-option-text-weight);
		line-height: var(--language-option-line-height);
		color: var(--language-option-text-color);
	}
}
</style>
