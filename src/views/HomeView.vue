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

<style lang="scss"></style>
