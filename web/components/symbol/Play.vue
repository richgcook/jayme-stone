<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 60.62"><path class="cls-1" d="m36,30.31L0,60.62V0l36,30.31Z"/></svg>
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