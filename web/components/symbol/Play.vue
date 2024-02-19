<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.28 61.27"><path class="cls-1" d="m30.64,61.27C13.74,61.27,0,47.53,0,30.63S13.74,0,30.64,0s30.64,13.74,30.64,30.64-13.74,30.64-30.64,30.64h0Zm0-56.11c-14.05,0-25.48,11.43-25.48,25.48s11.43,25.48,25.48,25.48,25.48-11.43,25.48-25.48S44.69,5.16,30.64,5.16Z"/><path class="cls-1" d="m21.93,30.63v-13.35l11.56,6.67,11.56,6.67-11.56,6.67-11.56,6.68v-13.35Z"/></svg>
</template>

<script setup>

const props = defineProps({
	fill: String
})

</script>

<style scoped lang="scss">

svg {
	fill: v-bind(fill);
}

</style>