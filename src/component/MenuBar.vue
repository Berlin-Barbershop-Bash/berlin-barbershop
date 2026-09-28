<script setup lang="ts">
import MenuButton from '@/component/MenuButton.vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { locale, t, availableLocales } = useI18n()
const setLang = (loc: string) => (locale.value = loc)

const route = useRoute()
</script>

<template>
	<div class="menu">
		<div class="left-container">
			<menu-button href="/bash" :title="t('bash.menu')" :selected="route.path == '/bash'" />
			<menu-button href="/chorus" :title="t('chorus.menu')" :selected="route.path == '/chorus'" />
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
	background-color: var(--menu-background-color);
	color: var(--menu-text-color);

	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	.left-container {
		flex-grow: 1;
		display: flex;
		flex-flow: row nowrap;
		.menu-button {
			flex-grow: 1;
		}
	}
}
</style>
