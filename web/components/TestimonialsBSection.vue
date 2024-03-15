<template>
	<div class="section">
		<div class="titles">
			<h5>About</h5>
			<h3>{{ section.title }}</h3>
		</div>
		<div class="testimonials">
			<div v-for="(testimonial, index) in section.testimonials" :key="index" class="testimonial">
				<h3>{{ testimonial.text }}</h3>
				<h5>{{ testimonial.referrerName }}</h5>
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	section: Object
})

const sectionBgColor = computed(() => props.section.colors.bg.hex)
const sectionTextColor = computed(() => props.section.colors.text.hex)
const sectionLineColor = computed(() => props.section.colors.line.hex)

</script>

<style scoped lang="scss">

div.section {
	display: grid;
	grid-template-columns: 1fr 2fr;
	background-color: v-bind(sectionBgColor);
	color: v-bind(sectionTextColor);
	@include media('tablet-portrait-and-phone') {
		grid-template-columns: 1fr;
		padding: 60px 30px;
	}
	div.titles {
		padding: 50px;
		text-align: center;
		@include media('tablet-portrait-and-phone') {
			padding: 0 0 30px 0;
			text-align: left;
		}
		h5 {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-sm);
			text-transform: lowercase;
			margin-bottom: 10px;
		}
		h3 {
			font-size: var(--font-size-lg);
			line-height: 1.5;
		}
	}
	div.testimonials {
		padding: 50px;
		max-width: 850px;
		@include media('tablet-portrait-and-phone') {
			padding: 0;
		}
		div.testimonial {
			&:not(:last-child) {
				&:after {
					content: '';
					display: block;
					width: 100%;
					height: 1px;
					background-color: v-bind(sectionLineColor);
					margin: 20px 0;
				}
			}
			h5 {
				font-family: var(--font-family-mono);
				font-size: var(--font-size-mono-caps);
				letter-spacing: 0.05em;
				text-transform: uppercase;
			}
		}
	}
}

</style>