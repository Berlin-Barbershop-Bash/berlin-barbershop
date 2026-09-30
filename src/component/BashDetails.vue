<script setup lang="ts">
import ContentPage from '@/component/ContentPage.vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

// Kept out of en.json: vue-i18n reads "@" in a message as a linked-message reference
const contactEmail = 'hello@berlinbarber.shop'
</script>

<template>
	<content-page id="bash-schedule" class="bash-details">
		<div class="spiel-container">
			<p>{{ t('bash.schedule.intro') }}</p>
			<ol class="schedule-steps">
				<li v-for="(step, idx) in tm('bash.schedule.steps')" :key="idx">
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
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
		gap: 32px 48px;

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

#bash-faq .faq-list {
	margin: 0;
	padding-inline-start: 1em;

	display: flex;
	flex-flow: column nowrap;
	gap: 16px;

	li::marker {
		font-size: var(--content-text-size);
	}
}
</style>
