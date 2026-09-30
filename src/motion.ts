import { computed, ref, watchEffect } from 'vue'

// Everything that moves on its own (the tickers and the carousel) stops when the visitor asks the
// system for less motion, or presses the pause button (WCAG 2.2.2).
const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
export const prefersReducedMotion = ref(reduceQuery.matches)
reduceQuery.addEventListener('change', (e) => (prefersReducedMotion.value = e.matches))

export const motionPausedByVisitor = ref(false)
export const motionStopped = computed(() => prefersReducedMotion.value || motionPausedByVisitor.value)

// CSS animations (the tickers) pause under this class
watchEffect(() => document.documentElement.classList.toggle('motion-paused', motionStopped.value))
