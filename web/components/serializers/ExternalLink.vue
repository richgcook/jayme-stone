<template>
	<NuxtLink :to="href" :class="{ '--is-button': button }" :target="blank ? '_blank' : false">
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
	href: String,
	blank: Boolean,
	button: {
		type: Boolean,
		default: false
	}
})

</script>

<style lang="scss" scoped>

a {
	text-decoration-line: underline;
	text-decoration-color: var(--color-primary);
    text-underline-offset: 2px;
	&.--is-button {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		column-gap: 1ch;
		height: 85px;
		width: fit-content;
		padding: 0 25px;
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		background-color: var(--color-green);
		color: var(--color-beige);
		text-decoration: none;
		@include media('phone') {
			height: 50px;
			padding: 0 15px;
		}
		&:hover {
			background-color: var(--color-blue);
		}
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