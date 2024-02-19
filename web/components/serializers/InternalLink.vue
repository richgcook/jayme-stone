<template>
	<NuxtLink :to="toPath">
		<slot />
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	slug: {
		type: String,
		default: ''
	},
	dataType: {
		type: String,
		default: ''
	}
})

const toPath = computed(() => {
	if (props.dataType === 'studiosSubPage') return `/studios/${props.slug}`
	if (props.dataType === 'tenant') return `/tenants/${props.slug}`
	if (props.dataType === 'archive') return `/archive/${props.slug}`
	return props.slug
})

</script>

<style lang="scss" scoped>

a {
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-color: var(--color-primary);
    text-underline-offset: 2px;
}

</style>