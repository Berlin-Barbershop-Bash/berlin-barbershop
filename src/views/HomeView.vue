<script setup lang="ts">
import BashSection from '@/component/BashSection.vue'
import ChorusSection from '@/component/ChorusSection.vue'
import TickerBar from '@/component/TickerBar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<h1 class="title">{{ t('home.berlin') }}</h1>
	<ticker-bar :title="t('bash.ticker')" />
	<chorus-section />
	<h1 class="title">{{ t('home.barbershop') }}</h1>
	<bash-section />
	<h1 class="title">{{ t('home.bash') }}</h1>
</template>

<style lang="scss">
h1.title {
	background-color: var(--header-background-color);
	color: var(--header-text-color);

	font-family: var(--header-text-font);
	font-size: var(--header-text-size);
	font-weight: var(--header-text-weight);
	font-feature-settings: var(--font-feat-global);

	display: block;
	text-align: center;
	text-transform: lowercase;
	margin: 0;
	padding: 0;
}
.content-page {
	display: flex;
	width: 100%;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	gap: 16px;

	p {
		font-family: var(--content-text-font);
		font-size: var(--content-text-size);
		font-weight: var(--content-text-weight);
	}

	div.content-page-left {
		.v-img {
			max-height: 480px;
		}
		@media screen and (min-width: 800px) {
			width: calc(50% - 8px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	div.content-page-right {
		@media screen and (min-width: 800px) {
			width: calc(50% - 8px);
		}
		@media screen and (max-width: 799px) {
			width: 100%;
		}
	}

	.v-btn {
		background-color: var(--content-button-color);
		color: var(--content-button-text-color);

		font-family: var(--content-button-text-font);
		font-size: var(--content-button-text-size);
		font-weight: var(--content-button-text-weight);
	}
}
</style>
