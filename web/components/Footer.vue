<template>
	<footer :class="{ '--fixed': isFixed }">
		<span>&copy; Kate Maltby</span>
	</footer>
</template>

<script setup>

const route = useRoute()

const isFixed = computed(() => {
	return route.name == 'index' || route.name == 'contact'
})

</script>

<style lang="scss" scoped>

footer {
	margin: calc(var(--padding-base) * 5) 0 var(--padding-base) 0;
	padding: 0 var(--padding-base);
	font-size: var(--font-size-sm);
	&.--fixed {
		position: fixed;
		bottom: var(--padding-base);
		left: 0;
		width: 100%;
		margin: 0;
	}
}

</style>