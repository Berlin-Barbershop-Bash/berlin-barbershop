<script setup lang="ts">
import BashDetails from '@/component/BashDetails.vue'
import BashSection from '@/component/BashSection.vue'
import ChorusSection from '@/component/ChorusSection.vue'
import CollapsedHeader from '@/component/CollapsedHeader.vue'
import LanguageMenu from '@/component/LanguageMenu.vue'
import MotionToggle from '@/component/MotionToggle.vue'
import StickyHeader from '@/component/StickyHeader.vue'
import TickerBar from '@/component/TickerBar.vue'
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Once "bash" has stacked under "berlin" and "barbershop", swap the three for one scrolling line.
// The marker sits where "bash" would be if it weren't sticky.
const bashMarker = ref<HTMLElement>()
const collapsed = ref(false)
// Hidden while CollapsedHeader's words stand in for them
const headersHidden = ref(false)
const berlinHeader = useTemplateRef('berlinHeader')
const barbershopHeader = useTemplateRef('barbershopHeader')
const bashHeader = useTemplateRef('bashHeader')

function updateCollapsed() {
	if (!bashMarker.value) return
	const lineHeight = parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue('--header-line-height'),
	)
	collapsed.value = bashMarker.value.getBoundingClientRect().top <= 2 * lineHeight
}

onMounted(() => {
	updateCollapsed()
	window.addEventListener('scroll', updateCollapsed, { passive: true })
	window.addEventListener('resize', updateCollapsed)
})
onUnmounted(() => {
	window.removeEventListener('scroll', updateCollapsed)
	window.removeEventListener('resize', updateCollapsed)
})
</script>

<template>
	<language-menu />
	<sticky-header
		ref="berlinHeader"
		:text="t('home.berlin')"
		:index="0"
		:level="1"
		:collapsed="headersHidden"
	/>
	<div class="landing-fill">
		<ticker-bar>
			<template #default="{ copy }">
				<i18n-t keypath="bash.ticker" scope="global">
					<template #link>
						<router-link :to="{ hash: '#interest-form' }" :tabindex="copy ? -1 : undefined">
							{{ t('bash.ticker_link') }}
						</router-link>
					</template>
				</i18n-t>
			</template>
			<template #end>
				<motion-toggle />
			</template>
		</ticker-bar>
		<chorus-section />
	</div>
	<sticky-header
		ref="barbershopHeader"
		:text="t('home.barbershop')"
		:index="1"
		stick-bottom
		:collapsed="headersHidden"
	/>
	<bash-section />
	<div ref="bashMarker" />
	<sticky-header ref="bashHeader" :text="t('home.bash')" :index="2" :collapsed="headersHidden" />
	<bash-details />
	<collapsed-header
		v-model:headers-hidden="headersHidden"
		:collapsed
		:words="[t('home.berlin'), t('home.barbershop'), t('home.bash')]"
		:sources="[berlinHeader?.textEl, barbershopHeader?.textEl, bashHeader?.textEl]"
	/>
</template>

<style lang="scss">
// Exactly the window between "berlin" and "barbershop", so "barbershop" lands at the bottom
// and everything in between fits on screen
.landing-fill {
	height: calc(100svh - 2 * var(--header-line-height));
	display: flex;
	flex-flow: column nowrap;

	// The choruses take whatever is left under the ticker (and shrink their photos to fit)
	.content-page {
		flex: 1;
		min-height: 0;
	}
}

.title,
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
