<template>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 18.67"><path id="Vector" class="cls-1" d="m14.67,14.67v2.67H1.33v-2.67H0v2.67c0,.35.14.69.39.94.25.25.59.39.94.39h13.33c.35,0,.69-.14.94-.39.25-.25.39-.59.39-.94v-2.67h-1.33Zm0-6.67l-.94-.94-5.06,5.05V0h-1.33v12.11L2.27,7.06l-.94.94,6.67,6.67,6.67-6.67Z"/></svg>
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