<script setup lang="ts">
import ContentPage from '@/component/ContentPage.vue'
import DoubleArrow from '@/component/DoubleArrow.vue'
import { contactEmail } from '@/contact'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Never more columns than divide the steps evenly, so no row is left with a straggler:
// 6 steps show 3, 2 or 1 per row; 4 steps show 2 or 1
const steps = () => tm('bash.schedule.steps') as unknown as string[]
const maxColumns = () => (steps().length % 3 === 0 ? 3 : 2)
</script>

<template>
	<content-page id="bash-schedule" class="bash-details">
		<div class="spiel-container">
			<h2 class="visually-hidden">{{ t('bash.schedule.title') }}</h2>
			<p>{{ t('bash.schedule.intro') }}</p>
			<ol class="schedule-steps" :style="{ '--max-columns': maxColumns() }">
				<li v-for="(step, idx) in steps()" :key="idx">
					<p>{{ step }}</p>
				</li>
			</ol>
			<i18n-t tag="p" keypath="bash.schedule.outro" scope="global" class="schedule-outro">
				<template #email>
					<a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
				</template>
			</i18n-t>
		</div>
	</content-page>

	<content-page id="bash-faq" class="bash-details">
		<template v-slot:left-column>
			<h2 class="subtitle">{{ t('bash.faq.title') }}</h2>
		</template>
		<template v-slot:right-column>
			<ul class="faq-list">
				<li v-for="(item, idx) in tm('bash.faq.items')" :key="idx">
					<span class="faq-bullet"><double-arrow /></span>
					<p>{{ item }}</p>
				</li>
			</ul>
		</template>
	</content-page>
</template>

<style lang="scss">
// Shared with the welcome block in BashSection
.bash-details {
	// Headings sit at the top of their column, next to the text they introduce
	align-items: flex-start;

	h2.subtitle {
		text-align: start;
	}

	a {
		color: inherit;
		text-decoration: underline;
	}
}

// A tan band sets the schedule apart from the sections around it
#bash-schedule {
	background-color: var(--pale-ish-color);

	// Breathing room under the "bash" bar
	@media screen and (min-width: 801px) {
		padding-top: 64px;
	}
	@media screen and (max-width: 800px) {
		padding-top: 48px;
	}

	// Set the closing note apart from the last step (48px with the container's 24px gap)
	.schedule-outro {
		margin-top: 24px;
	}

	.schedule-steps {
		list-style: none;
		counter-reset: step;
		margin: 0;
		padding: 0;

		display: grid;
		// At least 420px per column, and never narrower than 1/--max-columns of the row
		--step-gap: 48px;
		grid-template-columns: repeat(
			auto-fit,
			minmax(
				max(
					min(100%, 420px),
					calc((100% - (var(--max-columns) - 1) * var(--step-gap)) / var(--max-columns))
				),
				1fr
			)
		);
		gap: 32px var(--step-gap);

		li {
			counter-increment: step;
			display: flex;
			flex-flow: column nowrap;
			gap: 8px;

			&::before {
				content: counter(step);
				font-family: var(--header-text-font);
				font-weight: var(--header-text-weight);
				font-feature-settings: var(--font-feat-polymath);
				font-variation-settings: var(--font-var-polymath);
				font-size: var(--sub-header-text-size);
				line-height: var(--sub-header-line-height);
			}
		}
	}
}

// The page's last section: room to breathe before the footer
#bash-faq {
	// The first question sits on the "faq" heading's baseline
	align-items: baseline;

	@media screen and (min-width: 801px) {
		padding-bottom: 128px;
	}
	@media screen and (max-width: 800px) {
		padding-bottom: 96px;
	}
}

#bash-faq .faq-list {
	margin: 0;
	padding: 0;
	list-style: none;

	display: flex;
	flex-flow: column nowrap;
	gap: 16px;

	// The arrow sits in the item's left padding, out of the text flow, so each item's (and the
	// list's) baseline is its text's; that lets the list line up with the heading's baseline
	li {
		position: relative;
		font-size: var(--content-text-size);
		padding-inline-start: calc(0.5em + 10px);
	}

	// The design's double arrow, turned to point at the text; one line tall so it sits on the first line
	.faq-bullet {
		position: absolute;
		inset-inline-start: 0;
		top: 0;
		// Same size as the arrows in the chorus line (0.6em of the body text)
		height: var(--content-line-height);
		display: flex;
		align-items: center;

		.double-arrow {
			height: 0.6em;
			width: auto;
			transform: rotate(-90deg);
		}
	}
}
</style>
