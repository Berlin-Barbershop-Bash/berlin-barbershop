<script setup lang="ts"></script>

<template>
	<v-app class="application-container">
		<v-container class="router">
			<router-view />
		</v-container>
	</v-app>
</template>

<style lang="scss">
.application-container {
	background-color: var(--content-background-color);
}

.router {
	background-color: var(--content-background-color);
	color: var(--content-text-color);

	margin: 0;
	padding: 0;
	max-width: none;
}
</style>
