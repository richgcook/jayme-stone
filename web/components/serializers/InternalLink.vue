<template>
	<NuxtLink :to="toPath" :class="{ '--is-button': button }">
		<template v-if="button">
			<span class="label"><slot /></span>
			<span class="line-arrow">
				<span class="line"></span>
				<SymbolArrowHeadNext :fill="`var(--color-beige)`" />
			</span>
		</template>
		<template v-else>
			<slot />
		</template>
	</NuxtLink>
</template>

<script setup>

const props = defineProps({
	slug: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: ''
	},
	text: {
		type: String,
		default: ''
	},
	button: {
		type: Boolean,
		default: false
	}
})

const toPath = computed(() => {
	if (props.type === 'project') return `/projects/${props.slug}`
	return props.slug
})

</script>

<style lang="scss" scoped>

a {
	text-decoration-line: underline;
	text-decoration-style: solid;
	text-decoration-color: var(--color-primary);
    text-underline-offset: 2px;
	&.--is-button {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		column-gap: 2ch;
		width: fit-content;
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background-color: var(--color-green);
		color: var(--color-beige);
		text-decoration: none;
		padding: 30px 25px;
		span.line-arrow {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			width: 77px;
			span.line {
				display: block;
				height: 1px;
				width: 100%;
				background-color: var(--color-beige)
			}
			svg {
				width: 4px;
				margin-left: -3px;
			}
		}
		span.label {
			flex-shrink: 0;
		}
	}
}

</style>