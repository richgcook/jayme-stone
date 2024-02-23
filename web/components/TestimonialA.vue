<template>
	<div class="testimonial">
		<RichText :blocks="testimonial.text" />
		<div class="referrer">
			<Img :src="testimonial.referrer.image.asset.url" :alt="testimonial.referrer.image.asset.alt" />
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
	padding: 50px;
	background-color: v-bind(bgColor);
	color: v-bind(textColor);
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