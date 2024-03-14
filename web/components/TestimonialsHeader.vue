<template>
	<div class="testimonials-header">
		<div class="graphic"></div>
		<h3>What folks are saying</h3>
		<div class="line-arrow">
			<span class="line"></span>
			<SymbolArrowHeadDown :fill="`var(--color-pink)`" />
		</div>
		<span class="script">What folks are saying</span>
	</div>
</template>

<style scoped lang="scss">

div.testimonials-header {
	@supports (aspect-ratio: 1 / 1) {
		aspect-ratio: 4 / 1;
	}
	@supports not (aspect-ratio: 1 / 1) {
		padding-bottom: calc(1 / 4 * 100%);
	}
	background-color: var(--color-black);
	position: relative;
	overflow: hidden;
	@include media('phone') {
		aspect-ratio: auto;
		padding-bottom: 0;
		height: 300px;
	}
	div.graphic {
		background-color: var(--color-blue);
		mask-image: url('/graphics/testimonials.png');
		mask-repeat: no-repeat;
		mask-size: contain;
		position: absolute;
		height: 80%;
    	width: 100%;
		@include media('phone') {
			mask-size: auto 110%;
			mask-position: 150% 150%;
    		height: 100%;
		}
	}
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
	span.script {
		font-family: var(--font-family-script);
		color: var(--color-blue);
		position: absolute;
		bottom: 0;
		right: 0;
		transform: translate(-20px, 50%);
		font-size: 60px;
		line-height: 1;
		text-transform: lowercase;
		pointer-events: none;
		@include media('tablet') {
			display: none;
		}
		@include media('phone') {
			display: none;
		}
	}
}

</style>