<script setup lang="ts">
import TickerBar from '@/component/TickerBar.vue'
import { nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue'

// Folds the stacked headers into one slowly drifting line: each word glides from its header into
// the line, its dark bar sliding up with it, then the drift eases up to speed. Scrolling back
// reverses it: each word flies home from its nearest copy in the line, its bar unfolding to
// wherever its header now is. Destinations are re-measured every frame, because once you scroll
// back up "bash" is no longer stuck and moves with the page while its word is still in the air.
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
// The same curve as cubic-bezier(0.65, 0, 0.35, 1), for progress p from 0 to 1
const ease = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const lerp = (from: number, to: number, t: number) => from + (to - from) * t

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
	const phrase =
		words.at(-1)!.getBoundingClientRect().right - words[0]!.getBoundingClientRect().left
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
let glideFrame = 0
let endGlide: (() => void) | undefined
let rampFrame = 0

function stopMotion() {
	cancelAnimationFrame(glideFrame)
	endGlide?.()
	endGlide = undefined
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
	const half = headerLineHeight() / 2
	const count = props.words.length
	// Collapsing, "berlin" leads; expanding, "bash" leads
	const delay = (i: number) => STAGGER_MS * (toLine ? i : count - 1 - i)
	const bottom = (bar: Bar) => bar.top + bar.height

	// Where the headers are right now; "bash" moves with the page once it's no longer stuck
	const stackedNow = () => props.sources.map((el) => barOf(el?.parentElement))
	const spotsTo = (): Spot[] =>
		landing
			? [...landing.querySelectorAll('.word')].map((el) => spotOf(el, scale))
			: props.sources.map((el) => (el ? spotOf(el, 1) : { x: 0, y: 0, scale: 1 }))
	const barsTo = (stacked: Bar[]): Bar[] =>
		toLine ? stacked.map(() => barOf(line.value)) : stacked

	function frame(now: number, startedAt: number) {
		const elapsed = now - startedAt
		const progress = (i: number) => ease(Math.min(Math.max((elapsed - delay(i)) / GLIDE_MS, 0), 1))
		const stacked = stackedNow()
		const to = spotsTo()
		const bars = barsTo(stacked)

		strips.value?.forEach((el, i) => {
			const t = progress(i)
			el.style.transform = `translateY(${lerp(barsFrom[i]!.top, bars[i]!.top, t)}px)`
			el.style.height = `${lerp(barsFrom[i]!.height, bars[i]!.height, t)}px`
		})

		// The staggered bars open gaps between each other, so fill behind the ones that form one
		// solid block in the stack. Headers spread down the page (after a jump to the top, or
		// "bash" scrolling away) leave real content between them, which stays visible.
		let solid = 1
		while (solid < count && stacked[solid]!.top <= bottom(stacked[solid - 1]!) + half) {
			solid++
		}
		if (backdrop.value) {
			const t = progress(solid - 1)
			backdrop.value.style.height =
				solid > 1 ? `${lerp(bottom(barsFrom[solid - 1]!), bottom(bars[solid - 1]!), t)}px` : '0'
		}

		// Flyers are stacked-size boxes, scaled about their left-centre
		flyers.value?.forEach((el, i) => {
			const t = progress(i)
			const x = lerp(from[i]!.x, to[i]!.x, t)
			const y = lerp(from[i]!.y, to[i]!.y, t)
			el.style.transform = `translate(${x}px, ${y - half}px) scale(${lerp(from[i]!.scale, to[i]!.scale, t)})`
		})

		return elapsed >= GLIDE_MS + STAGGER_MS * (count - 1)
	}

	// Place everything before the first paint, then follow the headers frame by frame
	const startedAt = performance.now()
	frame(startedAt, startedAt)
	const finished = await new Promise<boolean>((resolve) => {
		endGlide = () => resolve(false)
		const step = (now: number) => {
			if (frame(now, startedAt)) resolve(true)
			else glideFrame = requestAnimationFrame(step)
		}
		glideFrame = requestAnimationFrame(step)
	})
	if (!finished || id !== run) return // Cancelled by a newer glide
	endGlide = undefined

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
					<span class="word" :data-word="i">{{ word }}</span
					>{{ i < words.length - 1 ? ' ' : '' }}
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
		top: 0;
		left: 0;
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
		line-height: var(--header-line-ratio);

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
