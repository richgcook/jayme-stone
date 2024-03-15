<template>
	<div class="testimonial" :class="{ '--centered': testimonial.centerText }" :data-block-width="testimonial.blockWidth" :data-block-height="testimonial.blockHeight" :data-text-size="testimonial.textSize">
		<div class="inner">
			<RichText :blocks="testimonial.text" />
			<div class="referrer">
				<Img :src="testimonial.referrer.image.asset.url" :alt="testimonial.referrer.image.asset.alt" v-if="testimonial.referrer.image" />
				<h5><span>{{ testimonial.referrer.firstNames }}</span><span v-if="testimonial.referrer.lastNames">{{ testimonial.referrer.lastNames }}</span></h5>
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	testimonial: Object
})

const bgColor = computed(() => props.testimonial.colors?.bg?.hex)
const textColor = computed(() => props.testimonial.colors?.text?.hex)

</script>

<style scoped lang="scss">

div.testimonial {
	padding: 75px;
	background-color: v-bind(bgColor);
	color: v-bind(textColor);
	@include media('tablet-portrait-and-phone') {
		padding: 60px 30px;
	}
	@for $i from 1 through 4 {
		&[data-block-width="#{$i}"] {
			grid-column: span #{$i};
			@include media('tablet-portrait-and-phone') {
				grid-column: 1 / -1;
			}
		}
		&[data-block-height="#{$i}"] {
			grid-row: span #{$i};
			@include media('tablet-portrait-and-phone') {
				grid-row: auto;
			}
		}
	}
	&[data-text-size="lg"] {
		font-size: var(--font-size-lg);
		line-height: 1.5;
		div.inner {
			max-width: none;
		}
	}
	&[data-text-size="xl"] {
		font-size: var(--font-size-xl);
		line-height: 1.5;
		div.inner {
			max-width: none;
		}
	}
	&.--centered {
		div.inner {
			text-align: center;
			div.referrer {
				justify-content: center;
				h5 {
					max-width: none;
				}
			}
		}
	}
	div.inner {
		display: grid;
		row-gap: 15px;
		align-items: center;
		align-content: center;
		height: 100%;
		max-width: 850px;
		margin: 0 auto;
	}
	div.referrer {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		column-gap: 15px;
		img {
			flex-shrink: 0;
			width: 80px;
			height: 80px;
			border-radius: 50%;
			object-fit: cover;
		}
		h5 {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-caps);
			letter-spacing: 0.05em;
			line-height: 1.5;
			text-transform: uppercase;
			span {
				display: block;
			}
		}
	}
}

</style>