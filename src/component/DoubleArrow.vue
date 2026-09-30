<script setup lang="ts">
// Double down-arrow from the design, 29×36; decorative, coloured by the text around it
const paths = [
	'M16.6201 19.2909C15.4188 20.833 13.0871 20.8327 11.8862 19.2903L0.638383 4.84295C-0.895744 2.87244 0.508658 -0.000322079 3.00595 2.70838e-08L25.5054 0.00290206C28.0027 0.00322416 29.4063 2.87635 27.8717 4.84647L16.6201 19.2909Z',
	'M16.6201 34.2909C15.4188 35.833 13.0871 35.8327 11.8862 34.2902L0.638383 19.8429C-0.895744 17.8724 0.508658 14.9997 3.00595 15L25.5054 15.0029C28.0027 15.0032 29.4063 17.8764 27.8717 19.8465L16.6201 34.2909Z',
]
</script>

<template>
	<svg class="double-arrow" viewBox="0 0 29 36" aria-hidden="true">
		<path v-for="d in paths" :key="d" :d="d" />
	</svg>
</template>

<style lang="scss">
.double-arrow {
	fill: currentColor;
}
</style>
