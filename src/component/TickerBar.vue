<script setup lang="ts">
// The default slot is repeated to fill the bar; `copy` is true for every repeat after the first
const { copies = 200 } = defineProps<{ copies?: number }>()
defineSlots<{ default(props: { copy: boolean }): unknown }>()

const asdf = Array(copies).fill(0)
</script>

<template>
	<div class="ticker-bar">
		<div v-for="(_, idx) in asdf" :key="idx" class="ticker-item" :aria-hidden="idx > 0">
			<slot :copy="idx > 0" />
		</div>
	</div>
</template>

<style lang="scss">
/* Setting the Animation using Keyframes */
@keyframes scroll-left {
	0% {
		transform: translateX(0%);
	}

	100% {
		transform: translateX(-100%);
	}
}

.ticker-bar {
	background-color: var(--ticker-background-color);
	color: var(--ticker-text-color);

	font-family: var(--ticker-text-font);
	font-size: var(--ticker-text-size);
	font-weight: var(--ticker-text-weight);
	line-height: var(--ticker-line-height);

	display: flex;
	flex-flow: row nowrap;
	overflow: clip;

	padding: 10px 0;

	.ticker-item {
		white-space: nowrap;
		// Spacing lives inside the item so the -100% loop lands exactly on the next copy
		padding-inline-end: 8px;
		// About 35px/s on desktop; set --ticker-duration to change the speed
		animation: scroll-left var(--ticker-duration, 24s) linear infinite;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}
	}

	a {
		color: inherit;
		text-decoration: underline;
	}
}
</style>
