<script setup lang="ts">
defineProps<{ title: string }>()

const asdf = Array(20).fill(0)
</script>

<template>
	<div class="ticker-bar">
		<div v-for="(_, idx) in asdf" :key="idx" class="ticker-item">
			{{ title }}
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
	overflow-y: hidden;
	gap: 8px;

	.ticker-item {
		white-space: nowrap;
		animation: scroll-left 6s linear infinite;
	}
}
</style>
