<script setup lang="ts">
import ContentPage from '@/component/ContentPage.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<content-page id="chorus-view">
		<template v-slot:left-column>
			<h2 class="subtitle">
				<a href="https://www.womeninblack.de/" target="_blank">
					{{ t('chorus.wibs.title') }}
				</a>
			</h2>
		</template>
		<template v-slot:right-column>
			<h2 class="subtitle">
				<a href="https://capitalchords.de/" target="_blank">
					{{ t('chorus.capitol.title') }}
				</a>
			</h2>
		</template>
	</content-page>
</template>
