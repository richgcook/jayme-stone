<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260.01 24.01" :class="{ '--active': navIsOpen }"><path class="cls-1" d="m0,.27h3.71v11.93L13.26.27h4.41l-9.61,12,10.57,11.73h-4.79L3.71,12.81v11.2H0V.27Z"/><path class="cls-1" d="m36.77,0l11.08,24h-3.99l-2.36-5.28h-9.48l-2.36,5.28h-3.96L36.77,0Zm-3.17,15.18h6.29l-3.13-7.02-3.16,7.02Z"/><path class="cls-1" d="m58.65,4.08h-5.85V.27h15.43v3.81h-5.87v19.92h-3.71V4.08Z"/><path class="cls-1" d="m77.78.27h13.44v3.81h-9.74v6.02h7.83v3.74h-7.83v6.35h9.74v3.81h-13.44V.27Z"/><path class="cls-2" d="m111.76,0l11.14,12.44,11.14-12.44v24h-3.71v-14.57l-7.44,8.42-7.44-8.42v14.57h-3.71V0h.02Z"/><path class="cls-2" d="m154.37,0l11.08,24h-3.99l-2.36-5.28h-9.49l-2.36,5.28h-3.96L154.37,0Zm-3.17,15.18h6.29l-3.13-7.02-3.16,7.02Z"/><path class="cls-2" d="m174.68.27h3.71v19.89h9.55v3.85h-13.25V.27Z"/><path class="cls-2" d="m198.55,4.08h-5.85V.27h15.43v3.81h-5.87v19.92h-3.71V4.08Z"/><path class="cls-2" d="m217.68.27h8.01c4.12,0,6.67,2.97,6.67,6.48,0,2.14-.76,3.61-2.11,4.62,2.11.94,3.64,2.88,3.64,5.81,0,4.14-3.16,6.82-7.54,6.82h-8.69V.27h.02Zm7.53,9.99c2.27,0,3.42-1.4,3.42-3.21s-1.15-3.21-3.42-3.21h-3.83v6.42h3.83Zm1.15,10.13c2.56,0,3.8-1.44,3.8-3.38s-1.24-3.45-3.8-3.45h-4.99v6.82h4.99Z"/><path class="cls-2" d="m247.93,14.01L239.59.27h4.35l5.85,9.8,5.85-9.8h4.37l-8.37,13.74v9.99h-3.71v-9.99h0Z"/></svg>
</template>

<script setup>

const props = defineProps({
	navIsOpen: {
		type: Boolean,
		default: false
	}
})

</script>

<style lang="scss" scoped>

svg {
	&.--active {
		.cls-2 {
			fill: white;
		}
	}
	.cls-2 {
		fill: var(--color-primary);
		transition: fill 0.3s ease;
	}
}

</style>