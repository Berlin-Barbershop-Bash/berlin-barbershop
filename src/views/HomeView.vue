<script setup lang="ts">
import BashSection from '@/component/BashSection.vue'
import ChorusSection from '@/component/ChorusSection.vue'
import LanguageMenu from '@/component/LanguageMenu.vue'
import StickyHeader from '@/component/StickyHeader.vue'
import TickerBar from '@/component/TickerBar.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
	<language-menu />
	<sticky-header :text="t('home.berlin')" :index="0" />
	<div class="landing-fill">
		<ticker-bar v-slot="{ copy }">
			<i18n-t keypath="bash.ticker" scope="global">
				<template #link>
					<router-link :to="{ hash: '#interest-form' }" :tabindex="copy ? -1 : undefined">
						{{ t('bash.ticker_link') }}
					</router-link>
				</template>
			</i18n-t>
		</ticker-bar>
		<chorus-section />
	</div>
	<sticky-header :text="t('home.barbershop')" :index="1" stick-bottom />
	<bash-section />
	<sticky-header :text="t('home.bash')" :index="2" />
</template>

<style lang="scss">
// Fill the window between "berlin" and "barbershop" so "barbershop" lands at the bottom
.landing-fill {
	min-height: calc(100svh - 2 * var(--header-line-height));
}

h1.title,
h2.subtitle {
	font-family: var(--header-text-font);
	font-weight: var(--header-text-weight);
	font-feature-settings: var(--font-feat-polymath);
	font-variation-settings: var(--font-var-polymath);
	text-transform: lowercase;

	text-align: center;
	margin: 0;
	padding: 0;
}

h2.subtitle {
	font-size: var(--sub-header-text-size);
	line-height: var(--sub-header-line-height);

	a {
		text-decoration: none;
		color: inherit;
	}
	a:hover {
		text-decoration: underline;
		text-decoration-thickness: 4px;
	}
}
</style>
