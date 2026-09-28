<script setup lang="ts">
import MenuBar from '@/component/MenuBar.vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { setHeight } = defineProps<{ setHeight: (v: number | undefined) => void }>()

const { t } = useI18n()

const asdf = ref<HTMLElement>()
onMounted(() => setHeight(asdf.value?.clientHeight))
</script>

<template>
	<v-app-bar flat class="toolbar" height="auto">
		<div class="toolbar-container" ref="asdf">
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
