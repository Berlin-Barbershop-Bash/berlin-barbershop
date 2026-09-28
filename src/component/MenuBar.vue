<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t, availableLocales } = useI18n()

const languages = computed(() =>
	availableLocales.map((loc: string) => ({ title: t(`locale.lang_${loc}`), value: loc })),
)
const setLang = (loc: string) => (locale.value = loc)
</script>

<template>
	<div class="menu">
		<div class="left-container">
			<v-btn href="/bash">{{ t('bash.menu') }}</v-btn>
			<v-btn href="/chorus">{{ t('chorus.menu') }}</v-btn>
		</div>
		<div class="right-container" v-if="languages.length > 1">
			<template v-for="(lang, idx) in languages" :key="idx">
				<template v-if="idx > 0">|</template>
				<v-btn @click="() => setLang(lang.value)">{{ lang.title }}</v-btn>
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
