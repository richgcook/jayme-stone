<template>
	<div class="newsletter-signup">
		<div class="inner">
			<TitleWithArrow 
				:arrowDirection="'next'" 
				:arrowPosition="'before'" 
				:lineLength="'65px'" 
				:color="`var(--color-beige)`" 
				:label="title"
			/>
			<div class="form">
				<div class="graphic"></div>
				<MailChimpForm />
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	title: {
		type: String,
		default: 'Sign up to hear about new releases and projects'
	}
})

</script>

<style scoped lang="scss">

div.newsletter-signup {
	background-color: var(--color-green);
	height: 666px;
	@include media('phone') {
		height: auto;
	}
	div.inner {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		row-gap: 20px;
		height: 100%;
		padding: 0 100px;
		@include media('phone') {
			padding: 60px 30px;
		}
		div.form {
			width: 100%;
			position: relative;
			div.graphic {
				background-color: var(--color-black);
				mask-image: url('/graphics/newsletter.png');
				mask-repeat: no-repeat;
				mask-size: contain;
				position: absolute;
				right: 0;
				top: 0;
				width: 50%;
				height: 60px;
				transform: translateY(-100%);
				mask-position: bottom right;
				@include media('phone') {
					display: none;
				}
			}
		}
	}
}

</style>