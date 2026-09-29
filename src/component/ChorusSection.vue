<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<div id="chorus-view" class="content-page">
		<div class="content-page-left">
			<h2 class="subtitle">
				<a href="https://www.womeninblack.de/" target="_blank">
					{{ t('chorus.wibs.title') }}
				</a>
			</h2>
		</div>
		<div class="content-page-right">
			<h2 class="subtitle">
				<a href="https://capitalchords.de/" target="_blank">
					{{ t('chorus.capitol.title') }}
				</a>
			</h2>
		</div>
	</div>
</template>
