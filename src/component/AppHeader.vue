<script setup lang="ts">
import MenuBar from '@/component/MenuBar.vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { setHeaderHeight } = defineProps<{ setHeaderHeight: (v: number | undefined) => void }>()
const headerRef = ref<HTMLElement>()
onMounted(() => setHeaderHeight(headerRef.value?.clientHeight))
</script>

<template>
	<v-app-bar flat class="toolbar" height="auto">
		<div class="toolbar-container" ref="headerRef">
			<h1 class="title">
				{{ t('home.header') }}
			</h1>
			<menu-bar />
		</div>
	</v-app-bar>
</template>

<style lang="scss">
.toolbar {
	.toolbar-container {
		width: 100%;
	}
}
</style>
