<script setup lang="ts">
// stickBottom pins the header to the bottom of the window until it scrolls into place
defineProps<{ text: string; index: number; stickBottom?: boolean }>()
</script>

<template>
	<h1
		class="title"
		:style="{
			top: `calc(var(--header-line-height) * ${index})`,
			bottom: stickBottom ? 0 : undefined,
		}"
	>
		{{ text }}
	</h1>
</template>

<style lang="scss">
h1.title {
	background-color: var(--header-background-color);
	color: var(--header-text-color);

	font-size: var(--header-text-size);
	line-height: var(--header-line-height);

	position: sticky;
	z-index: 1000;
}
</style>
