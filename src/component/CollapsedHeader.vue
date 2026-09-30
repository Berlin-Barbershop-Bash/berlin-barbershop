<script setup lang="ts">
import TickerBar from '@/component/TickerBar.vue'
import { nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue'

// Folds the stacked headers into one slowly drifting line: each word glides from its header into
// the line, its dark bar sliding up with it, then the drift eases up to speed. Scrolling back
// reverses it: each word flies home from its nearest copy in the line, its bar unfolding to
// wherever its header now is.
const props = defineProps<{
	collapsed: boolean
	words: string[]
	// The stacked headers' text elements, in the same order as words
	sources: (HTMLElement | null | undefined)[]
}>()
// True while the stacked headers are hidden and this component shows the words instead
const headersHidden = defineModel<boolean>('headersHidden', { default: false })

const GLIDE_MS = 1000
const STAGGER_MS = 120
const RAMP_MS = 1500
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'

type Phase = 'stacked' | 'collapsing' | 'line' | 'expanding'
const phase = ref<Phase>('stacked')

const strips = useTemplateRef<HTMLElement[]>('strips')
const backdrop = useTemplateRef<HTMLElement>('backdrop')
const flyers = useTemplateRef<HTMLElement[]>('flyers')
const line = useTemplateRef<HTMLElement>('line')

// A word's left edge and vertical centre in viewport pixels, and its size relative to the stack
type Spot = { x: number; y: number; scale: number }
function spotOf(el: Element, scale: number): Spot {
	const r = el.getBoundingClientRect()
	return { x: r.left, y: r.top + r.height / 2, scale }
}

const fontSize = (el: Element | null | undefined) =>
	el ? parseFloat(getComputedStyle(el).fontSize) : 1
const headerLineHeight = () =>
	parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-line-height'))

// A header bar's top and height, in viewport pixels
type Bar = { top: number; height: number }
function barOf(el: Element | null | undefined): Bar {
	const r = el?.getBoundingClientRect()
	return { top: r?.top ?? 0, height: r?.height ?? 0 }
}
// How big the line's words are next to the stacked ones
const lineScale = () =>
	fontSize(line.value?.querySelector('.ticker-bar')) / fontSize(props.sources[0])
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const lineAnimations = () =>
	[...(line.value?.querySelectorAll('.ticker-item') ?? [])].flatMap((el) => el.getAnimations())

// Where the words are on screen right now, whatever the phase
function currentSpots(stacked: Spot[]): Spot[] {
	if (flyers.value?.length) {
		// Mid-glide: offsetWidth ignores the transform, so the ratio is the current scale
		return flyers.value.map((el) => spotOf(el, el.getBoundingClientRect().width / el.offsetWidth))
	}
	if (phase.value === 'line') {
		// The words leave together from the copy of the phrase nearest the middle of the window
		const scale = lineScale()
		const copy = nearestCopy(window.innerWidth / 2)
		const words = copy ? [...copy.querySelectorAll('.word')] : []
		if (words.length === stacked.length) return words.map((el) => spotOf(el, scale))
	}
	return stacked
}

// The copy of the phrase whose middle is closest to x
function nearestCopy(x: number): Element | undefined {
	const middle = (el: Element) => {
		const r = el.getBoundingClientRect()
		return r.left + r.width / 2
	}
	const items = [...(line.value?.querySelectorAll('.ticker-item') ?? [])]
	return items.reduce<Element | undefined>(
		(best, el) => (!best || Math.abs(middle(el) - x) < Math.abs(middle(best) - x) ? el : best),
		undefined,
	)
}

// Hold the line still with one copy of the phrase centred in the window, and return that copy
function centreLine(): Element | undefined {
	const items = [...(line.value?.querySelectorAll('.ticker-item') ?? [])]
	const first = items[0]
	const animation = lineAnimations()[0]
	if (!first || !animation) return first
	const width = first.getBoundingClientRect().width
	const words = [...first.querySelectorAll('.word')]
	const phrase = words.at(-1)!.getBoundingClientRect().right - words[0]!.getBoundingClientRect().left
	const centre = (window.innerWidth - phrase) / 2
	// The second copy starts one width in and drifts left, reaching the centre after this long
	const cycle = Number(animation.effect?.getComputedTiming().duration ?? 0)
	const time = cycle * Math.min(Math.max((width - centre) / width, 0), 0.999)
	lineAnimations().forEach((a) => {
		a.currentTime = time
		a.playbackRate = 0
	})
	return nearestCopy(window.innerWidth / 2)
}

// Where each word's bar is right now, whatever the phase
function currentBars(stacked: Bar[]): Bar[] {
	if (strips.value?.length) return strips.value.map(barOf)
	if (phase.value === 'line') return stacked.map(() => barOf(line.value))
	return stacked
}

let run = 0
let running: Animation[] = []
let rampFrame = 0

function stopMotion() {
	running.forEach((a) => a.cancel())
	running = []
	cancelAnimationFrame(rampFrame)
}

// Ease the drift from standstill up to full speed
function rampUp() {
	const start = performance.now()
	const step = (now: number) => {
		const p = Math.min(1, (now - start) / RAMP_MS)
		const rate = p * p * (3 - 2 * p)
		lineAnimations().forEach((a) => (a.playbackRate = rate))
		if (p < 1) rampFrame = requestAnimationFrame(step)
	}
	rampFrame = requestAnimationFrame(step)
}

async function glide(toLine: boolean) {
	const id = ++run
	const stacked = props.sources.map((el) => (el ? spotOf(el, 1) : { x: 0, y: 0, scale: 1 }))
	const from = currentSpots(stacked)
	const stackedBars = props.sources.map((el) => barOf(el?.parentElement))
	const barsFrom = currentBars(stackedBars)
	stopMotion()
	headersHidden.value = true

	if (reducedMotion()) {
		phase.value = toLine ? 'line' : 'stacked'
		headersHidden.value = toLine
		return
	}

	phase.value = toLine ? 'collapsing' : 'expanding'
	await nextTick()
	if (id !== run) return

	// The line waits, still and centred, until the words have landed in it
	const landing = toLine ? centreLine() : undefined
	const scale = lineScale()
	const to = landing ? [...landing.querySelectorAll('.word')].map((el) => spotOf(el, scale)) : stacked
	const barsTo = toLine ? stackedBars.map(() => barOf(line.value)) : stackedBars
	const half = headerLineHeight() / 2
	const count = props.words.length
	// Collapsing, "berlin" leads; expanding, "bash" leads
	const delay = (i: number) => STAGGER_MS * (toLine ? i : count - 1 - i)

	strips.value?.forEach((el, i) => {
		const start = barsFrom[i]!
		const end = barsTo[i]!
		el.style.top = `${end.top}px`
		el.style.height = `${end.height}px`
		running.push(
			el.animate(
				[
					{
						transform: `translateY(${start.top - end.top}px) scaleY(${start.height / (end.height || 1)})`,
					},
					{ transform: 'none' },
				],
				{ duration: GLIDE_MS, delay: delay(i), easing: EASING, fill: 'both' },
			),
		)
	})

	// The staggered bars open gaps between each other, so fill behind the ones that form one solid
	// block in the stack. Headers spread down the page (after a jump to the top) leave real content
	// between them, which stays visible.
	let solid = 1
	while (
		solid < count &&
		stackedBars[solid]!.top <= stackedBars[solid - 1]!.top + stackedBars[solid - 1]!.height + half
	) {
		solid++
	}
	if (backdrop.value) {
		// Scaled from the top, its bottom edge tracks the lowest solid bar's bottom exactly
		const bottom = (bar: Bar) => bar.top + bar.height
		const startBottom = bottom(barsFrom[solid - 1]!)
		const endBottom = bottom(barsTo[solid - 1]!)
		backdrop.value.style.height = solid > 1 ? `${endBottom}px` : '0'
		if (solid > 1) {
			running.push(
				backdrop.value.animate(
					[{ transform: `scaleY(${startBottom / (endBottom || 1)})` }, { transform: 'none' }],
					{ duration: GLIDE_MS, delay: delay(solid - 1), easing: EASING, fill: 'both' },
				),
			)
		}
	}

	flyers.value?.forEach((el, i) => {
		const start = from[i]!
		const end = to[i]!
		el.style.left = `${end.x}px`
		el.style.top = `${end.y - half}px`
		// Flyers are stacked-size boxes placed at the landing spot, scaled about their left-centre
		running.push(
			el.animate(
				[
					{ transform: `translate(${start.x - end.x}px, ${start.y - end.y}px) scale(${start.scale})` },
					{ transform: `scale(${end.scale})` },
				],
				{ duration: GLIDE_MS, delay: delay(i), easing: EASING, fill: 'both' },
			),
		)
	})

	try {
		await Promise.all(running.map((a) => a.finished))
	} catch {
		return // Cancelled by a newer glide
	}
	if (id !== run) return
	running = []

	if (toLine) {
		phase.value = 'line'
		await nextTick()
		rampUp()
	} else {
		phase.value = 'stacked'
		headersHidden.value = false
	}
}

watch(
	() => props.collapsed,
	(collapsed) => glide(collapsed),
)
onUnmounted(stopMotion)
</script>

<template>
	<div class="collapsed-header" aria-hidden="true">
		<template v-if="phase === 'collapsing' || phase === 'expanding'">
			<div ref="backdrop" class="strip" />
			<div v-for="(_, i) in words" :key="`strip-${i}`" ref="strips" class="strip" />
			<span v-for="(word, i) in words" :key="i" ref="flyers" class="flyer">{{ word }}</span>
		</template>
		<div
			v-if="phase === 'collapsing' || phase === 'line'"
			ref="line"
			:class="{ waiting: phase === 'collapsing' }"
		>
			<ticker-bar :copies="4">
				<template v-for="(word, i) in words" :key="i">
					<span class="word" :data-word="i">{{ word }}</span>{{ i < words.length - 1 ? ' ' : '' }}
				</template>
			</ticker-bar>
		</div>
	</div>
</template>

<style lang="scss">
.collapsed-header {
	position: fixed;
	inset: 0 0 auto;
	z-index: 1000;

	.strip {
		position: absolute;
		inset-inline: 0;
		top: 0;
		background-color: var(--header-background-color);
		transform-origin: top;
	}

	.flyer,
	.ticker-bar {
		color: var(--header-text-color);

		font-family: var(--header-text-font);
		font-weight: var(--header-text-weight);
		font-feature-settings: var(--font-feat-polymath);
		font-variation-settings: var(--font-var-polymath);
		text-transform: lowercase;
	}

	.flyer {
		font-size: var(--header-text-size);
		line-height: var(--header-line-height);

		position: absolute;
		white-space: nowrap;
		transform-origin: 0 50%;
		will-change: transform;
	}

	.waiting {
		visibility: hidden;
	}

	.ticker-bar {
		background-color: var(--header-background-color);
		padding: 0;

		// "berlin barbershop bash" is about 11em wide; 8vw keeps it inside the window
		font-size: min(var(--header-text-size), 8vw);
		line-height: 1.24;

		// The small ticker's pace: ~35px/s on desktop, ~26px/s on phones
		--ticker-duration: 32s;
		@media screen and (max-width: 800px) {
			--ticker-duration: 13s;
		}

		.ticker-item {
			padding-inline-end: 0.3em;
		}
	}
}
</style>
