<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.36 4.18"><path class="cls-1" d="m3.33,4.04c.2.19.51.19.71,0L7.22.85c.2-.2.2-.51,0-.71-.2-.2-.51-.2-.71,0l-2.83,2.83L.85.15C.66-.05.34-.05.15.15-.05.34-.05.66.15.85l3.18,3.18Z"/></svg>
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