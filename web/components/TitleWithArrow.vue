<template>
	<h3 class="title-arrow">
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
	}
})

const lineLength = props.lineLength
const rotation = `rotate(${props.rotation}deg)`
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
	text-transform: uppercase;
	transform: v-bind(rotation);
	transform-origin: left;
	color: v-bind(color);
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
			width: 4px;
			margin-left: -3px;
		}
	}
	span.label {
		flex-shrink: 0;
	}
}

</style>