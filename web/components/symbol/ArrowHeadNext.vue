<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4.19 7.36"><path class="cls-1" d="m4.04,4.05c.2-.19.2-.51,0-.71L.88.15c-.2-.2-.52-.2-.71,0C-.03.34-.03.66.17.85l2.81,2.84L.14,6.51c-.19.19-.19.51,0,.71.19.2.51.2.71,0l3.19-3.17Z"/></svg>
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