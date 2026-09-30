<script setup lang="ts">
import { motionPausedByVisitor, prefersReducedMotion } from '@/motion'
import { useI18n } from 'vue-i18n'

// Pauses and resumes everything that moves on its own (WCAG 2.2.2). Not shown when the system
// already asks for reduced motion, since nothing moves then.
const { t } = useI18n()
</script>

<template>
	<button
		v-if="!prefersReducedMotion"
		type="button"
		class="motion-toggle"
		:aria-pressed="motionPausedByVisitor"
		:aria-label="t('a11y.pause_motion')"
		:title="t(motionPausedByVisitor ? 'a11y.play_motion' : 'a11y.pause_motion')"
		@click="motionPausedByVisitor = !motionPausedByVisitor"
	>
		<v-icon :icon="motionPausedByVisitor ? 'mdi-play' : 'mdi-pause'" aria-hidden="true" />
	</button>
</template>

<style lang="scss">
// Sits at the ticker's right end, in the ticker's colours
.motion-toggle {
	width: 32px;
	height: 32px;
	padding: 0;
	border: none;
	border-radius: 50%;
	cursor: pointer;

	background-color: transparent;
	color: inherit;

	display: grid;
	place-items: center;

	// Vuetify would size it from the ticker text (1.5em, 30px), nearly filling the button
	.v-icon {
		font-size: 18px;
		width: 18px;
		height: 18px;
	}

	// Like the buttons: the colours flip on hover
	&:hover {
		background-color: var(--ticker-text-color);
		color: var(--ticker-background-color);
	}

	&:focus-visible {
		outline: 3px solid var(--ticker-text-color);
		outline-offset: -3px;
	}
}
</style>
