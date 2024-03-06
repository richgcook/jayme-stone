<template>
	<div class="page-header">
		<TitleWithArrow 
			:arrowDirection="'next'" 
			:arrowPosition="'after'" 
			:lineLength="'100%'" 
			:color="`var(--color-green)`" 
			:label="title"
			v-if="title"
		/>
	</div>
</template>

<script setup>

const props = defineProps({
	title: String
})

</script>

<style scoped lang="scss">

div.page-header {
	padding: 100px 100px 50px 100px;
	max-width: calc(50% + 20px);
	@include media('phone') {
		padding: 60px 30px 30px 30px;
	}
}

</style>