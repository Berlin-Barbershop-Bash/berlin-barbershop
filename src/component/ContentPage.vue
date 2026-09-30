<script setup lang="ts">
defineProps<{ id: string }>()
</script>

<template>
	<div :id="id" class="content-page">
		<slot>
			<div class="content-page-left">
				<slot name="left-column"></slot>
			</div>
			<div class="content-page-right">
				<slot name="right-column"></slot>
			</div>
		</slot>
	</div>
</template>

<style lang="scss">
.content-page {
	display: flex;
	width: 100%;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;

	padding: 32px 94px;
	gap: 24px;

	p {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
		line-height: var(--content-line-height);

		padding: 0;
		margin: 0;
	}

	.spiel-container {
		display: flex;
		flex-flow: column nowrap;
		gap: 24px;
	}

	.v-img {
		max-width: 100%;
	}

	div.content-page-left {
		@media screen and (min-width: 800px) {
			width: calc(50% - 12px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	div.content-page-right {
		@media screen and (min-width: 800px) {
			width: calc(50% - 12px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}
}
</style>
