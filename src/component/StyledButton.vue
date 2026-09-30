<script setup lang="ts">
defineProps<{ text: string; href?: string }>()
</script>

<template>
	<v-btn variant="flat" class="styled-button bright-button" :href="href">
		{{ text }}
	</v-btn>
</template>

<style lang="scss">
.styled-button {
	background-color: var(--content-button-color);
	color: var(--content-button-text-color);

	font-family: var(--content-button-text-font);
	font-size: var(--content-button-text-size);
	font-weight: var(--content-button-text-weight);
	line-height: var(--content-button-line-height);

	border-radius: 40px;
	padding: 4px 20px;

	text-transform: lowercase;
	width: fit-content;
}
</style>
