<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17.91"><path class="cls-1" d="m0,8.95L8.07,0l1.61,1.85-5.25,5.82h14.56v2.58H4.44l5.25,5.82-1.61,1.85L0,8.96h0Z"/></svg>
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