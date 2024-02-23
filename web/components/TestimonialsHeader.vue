<template>
	<div class="testimonials-header">
		<h3>What folks are saying</h3>
		<div class="line-arrow">
			<span class="line"></span>
			<SymbolArrowHeadDown :fill="`var(--color-pink)`" />
		</div>
	</div>
</template>

<script setup>



</script>

<style scoped lang="scss">

div.testimonials-header {
	height: 400px;
	background-color: var(--color-black);
	position: relative;
	h3 {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-pink);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}
	div.line-arrow {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		height: calc(50% - (20px + 1em + 10px));
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translate(-50%, 0);
		z-index: 1;
		span.line {
			display: block;
			height: 100%;
			width: 1px;
			background-color: var(--color-pink);
		}
		svg {
			height: 4px;
			margin-top: -3px;
		}
	}
}

</style>