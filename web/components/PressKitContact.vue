<template>
	<div class="contact">
		<h2 class="section-title">Contact</h2>
		<ul>
			<li v-for="(link, index) in links" :key="index"><NuxtLink :to="link.link" target="_blank">{{ link.title }}</NuxtLink></li>
		</ul>
	</div>
</template>

<script setup>

const props = defineProps({
	links: Array
})

</script>

<style lang="scss" scoped>

ul li a:hover {
	text-decoration-line: underline;
	text-decoration-color: currentColor;
	text-decoration-thickness: 1px;
	text-underline-offset: 4px;
}

</style>