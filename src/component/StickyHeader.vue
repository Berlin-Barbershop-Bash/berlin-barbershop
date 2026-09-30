<script setup lang="ts">
import { useTemplateRef } from 'vue'

// stickBottom pins the header to the bottom of the window until it scrolls into place;
// collapsed hides it while CollapsedHeader shows all the headers on one line
defineProps<{ text: string; index: number; stickBottom?: boolean; collapsed?: boolean }>()

// CollapsedHeader glides this word between the stack and the one-line bar
const textEl = useTemplateRef<HTMLElement>('text')
defineExpose({ textEl })
</script>

<template>
	<h1
		class="title"
		:class="{ collapsed }"
		:style="{
			top: `calc(var(--header-line-height) * ${index})`,
			bottom: stickBottom ? 0 : undefined,
		}"
	>
		<span ref="text">{{ text }}</span>
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

	// Hidden instantly: CollapsedHeader's flying words take over from the same spot
	&.collapsed {
		visibility: hidden;
	}
}
</style>
