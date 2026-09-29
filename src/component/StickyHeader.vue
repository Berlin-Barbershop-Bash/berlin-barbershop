<script setup lang="ts">
defineProps<{ text: string; index: number }>()
</script>

<template>
	<h1 class="title" :style="{ top: `calc(var(--header-line-height) * ${index})` }">
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
