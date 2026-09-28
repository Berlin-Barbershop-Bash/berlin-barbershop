<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { setFooterHeight } = defineProps<{ setFooterHeight: (v: number | undefined) => void }>()
const footerRef = ref<HTMLElement>()
onMounted(() => setFooterHeight(footerRef.value?.clientHeight))
</script>

<template>
	<footer ref="footerRef">
		<h1 class="title">
			{{ t('home.footer') }}
		</h1>
	</footer>
</template>

<style lang="scss">
footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
</style>
