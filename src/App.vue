<script setup lang="ts">
import AppFooter from '@/views/AppFooter.vue'
import AppHeader from '@/views/AppHeader.vue'
import { ref } from 'vue'

const headerHeight = ref<number>()
const setHeight = (v: number | undefined) => (headerHeight.value = v)
</script>

<template>
	<v-app>
		<app-header :set-height="setHeight" />
		<v-container class="router" :style="{ marginTop: `${headerHeight}px` }">
			<router-view />
		</v-container>
		<app-footer />
	</v-app>
</template>

<style lang="scss">
.router {
	margin-bottom: 0;
	margin-left: 0;
	margin-right: 0;
}
h1.title {
	display: block;
	text-align: center;
	text-transform: lowercase;
	margin: 0;
	padding: 0;
}
</style>
