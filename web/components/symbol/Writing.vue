<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.64 30.02"><path class="cls-1" d="m21.64,30.02H0V0h21.64v30.02Zm-19.35-2.29h17.05V2.29H2.29v25.43Z"/><rect class="cls-1" x="4.54" y="6.82" width="12.62" height="2.29"/><rect class="cls-1" x="4.54" y="11.51" width="12.62" height="2.29"/><rect class="cls-1" x="4.54" y="16.21" width="12.62" height="2.29"/><rect class="cls-1" x="4.54" y="20.9" width="12.62" height="2.29"/></svg>
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