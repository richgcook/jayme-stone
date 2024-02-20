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
			<MailChimpForm />
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
	div.inner {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		row-gap: 20px;
		height: 100%;
		padding: 0 100px;
		> div {
			width: 100%;
		}
	}
}

</style>