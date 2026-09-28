<script setup lang="ts">
defineProps<{ href: string; title: string; selected: boolean }>()
</script>

<template>
	<v-btn :href="href" :class="`${selected ? 'selected' : ''} menu-button`">{{ title }}</v-btn>
</template>

<style lang="scss">
.menu-button {
	text-transform: lowercase;
}
.menu-button.selected {
	text-decoration: underline;
}
</style>
