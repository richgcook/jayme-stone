<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.13 17.2"><rect width="5" height="17.2"/><rect x="8.13" width="5" height="17.2"/></svg>
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