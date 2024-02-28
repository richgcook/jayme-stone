<template>
	<div class="testimonial" :class="{ '--centered': testimonial.centerText }" :data-block-width="testimonial.blockWidth" :data-block-height="testimonial.blockHeight" :data-text-size="testimonial.textSize">
		<RichText :blocks="testimonial.text" />
		<div class="referrer">
			<Img :src="testimonial.referrer.image.asset.url" :alt="testimonial.referrer.image.asset.alt" v-if="testimonial.referrer.image" />
			<h5>{{ testimonial.referrer.name }}</h5>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	testimonial: Object
})

const bgColor = computed(() => props.testimonial.bgColor.hex)
const textColor = computed(() => props.testimonial.textColor.hex)

</script>

<style scoped lang="scss">

div.testimonial {
	display: grid;
	row-gap: 15px;
	align-items: center;
    align-content: center;
	padding: 75px;
	background-color: v-bind(bgColor);
	color: v-bind(textColor);
	@for $i from 1 through 4 {
		&[data-block-width="#{$i}"] {
			grid-column: span #{$i};
		}
		&[data-block-height="#{$i}"] {
			grid-row: span #{$i};
		}
	}
	&[data-text-size="lg"] {
		font-size: var(--font-size-lg);
		line-height: 1.5;
	}
	&[data-text-size="xl"] {
		font-size: var(--font-size-xl);
		line-height: 1.5;
	}
	&.--centered {
		text-align: center;
		div.referrer {
			justify-content: center;
			h5 {
				max-width: none;
			}
		
		}
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
			max-width: 150px;
		}
	}
}

</style>