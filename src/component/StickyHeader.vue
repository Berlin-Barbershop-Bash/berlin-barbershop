<script setup lang="ts">
import { useTemplateRef } from 'vue'

// stickBottom pins the header to the bottom of the window until it scrolls into place;
// collapsed hides it while CollapsedHeader shows all the headers on one line.
// Only the first header is the page's h1; the others head sections within it.
const { level = 2 } = defineProps<{
	text: string
	index: number
	level?: 1 | 2
	stickBottom?: boolean
	collapsed?: boolean
}>()

// CollapsedHeader glides this word between the stack and the one-line bar
const textEl = useTemplateRef<HTMLElement>('text')
defineExpose({ textEl })
</script>

<template>
	<component
		:is="`h${level}`"
		class="title"
		:class="{ collapsed }"
		:style="{
			top: `calc(var(--header-line-height) * ${index})`,
			bottom: stickBottom ? 0 : undefined,
		}"
	>
		<span ref="text">{{ text }}</span>
	</component>
</template>

<style lang="scss">
.title {
	background-color: var(--header-background-color);
	color: var(--header-text-color);

	font-size: var(--header-text-size);
	line-height: var(--header-line-height);

	position: sticky;
	z-index: 1000;

	// Hidden instantly while CollapsedHeader's flying words take over from the same spot.
	// Transparent rather than visibility: hidden, so screen readers still find the headings.
	&.collapsed {
		opacity: 0;
		pointer-events: none;
	}
}
</style>
