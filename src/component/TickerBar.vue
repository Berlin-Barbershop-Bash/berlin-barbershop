<script setup lang="ts">
// The default slot is repeated to fill the bar; `copy` is true for every repeat after the first.
// The optional `end` slot sits still at the bar's right end, over the moving text.
const { copies = 200 } = defineProps<{ copies?: number }>()
defineSlots<{ default(props: { copy: boolean }): unknown; end?(): unknown }>()

const asdf = Array(copies).fill(0)
</script>

<template>
	<div class="ticker-bar">
		<div v-for="(_, idx) in asdf" :key="idx" class="ticker-item" :aria-hidden="idx > 0">
			<slot :copy="idx > 0" />
		</div>
		<div v-if="$slots.end" class="ticker-end">
			<slot name="end" />
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
	position: relative;

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

	// Hold still while pointed at or focused, so its link can be clicked, and whenever motion is
	// paused (see motion.ts)
	&:hover .ticker-item,
	&:focus-within .ticker-item,
	.motion-paused & .ticker-item {
		animation-play-state: paused;
	}

	.ticker-end {
		position: absolute;
		inset-block: 0;
		right: 0;
		padding-inline: 8px;

		display: flex;
		align-items: center;

		// Covers the text scrolling beneath it
		background-color: var(--ticker-background-color);
	}

	a {
		color: inherit;
		text-decoration: underline;

		// A taller click target (24px+) without changing the bar's height
		display: inline-block;
		padding-block: 2px;
		margin-block: -2px;
	}
}
</style>
