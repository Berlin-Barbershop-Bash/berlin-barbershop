<script setup lang="ts">
defineProps<{ href: string; title: string; selected: boolean }>()
</script>

<template>
	<v-btn :href="href" :class="`${selected ? 'selected' : ''} menu-button`">{{ title }}</v-btn>
</template>

<style lang="scss">
.menu-button {
	text-transform: lowercase;
	font-family: var(--menu-text-font);
	font-size: var(--menu-text-size);
	font-weight: var(--menu-text-weight);
	font-feature-settings: var(--font-feat-polymath);
	font-variation-settings: var(--font-var-polymath);
}
.menu-button.selected {
	text-decoration: underline;
}
</style>
