<template>
	<h3 class="title-arrow" :class="{ '--line-before': arrowPosition == 'before' }">
		<NuxtLink :to="link" v-if="link"></NuxtLink>
		<span class="label" v-if="arrowPosition == 'after'">{{ label }}</span>
		<div class="line-arrow">
			<span class="line"></span>
			<SymbolArrowHeadNext :fill="color" v-if="arrowDirection == 'next'" />
		</div>
		<span class="label" v-if="arrowPosition == 'before'">{{ label }}</span>
	</h3>
</template>

<script setup>

const props = defineProps({
	arrowDirection: String,
	arrowPosition: String,
	lineLength: String,
	label: String,
	rotation: {
		type: String,
		default: '-2'
	},
	color: {
		type: String,
		default: 'var(--color-black)'
	},
	link: {
		type: String,
		default: ''
	}
})

const lineLength = props.lineLength
const rotation = `${props.rotation}deg`
const color = props.color

</script>

<style scoped lang="scss">

h3.title-arrow {
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	column-gap: 2ch;
	font-family: var(--font-family-mono);
	font-size: var(--font-size-mono-caps);
	letter-spacing: 0.05em;
	text-transform: uppercase;
	rotate: v-bind(rotation);
	transform-origin: top left;
	color: v-bind(color);
	position: relative;
	a {
		position: absolute;
		inset: 0;
		height: 100%;
		width: 100%;
	}
	&.--line-before {
		div.line-arrow {
			flex-shrink: 0;
		}
	}
	div.line-arrow {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		width: v-bind(lineLength);
		span.line {
			display: block;
			height: 1px;
			width: 100%;
			background-color: v-bind(color);
		}
		svg {
			flex-shrink: 0;
			width: 4px;
			margin-left: -3px;
		}
	}
	span.label {
		flex-shrink: 0;
	}
}

</style>