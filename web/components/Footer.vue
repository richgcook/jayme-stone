<template>
	<footer>
		<div class="grid">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<ul class="social-links" v-if="data.settingsGeneral?.socialLinks?.length">
			<li v-for="(link, index) in data.settingsGeneral.socialLinks" :key="index"><a :href="link.url" target="_blank">{{ link.title }}</a></li>
		</ul>
		<span class="copyright">&copy; {{ new Date().getFullYear() }} Jayme Stone</span>
	</footer>
</template>

<script setup>

const query = groq`{ 

	"settingsGeneral": *[_type == "settingsGeneral"] {
		socialLinks
	}[0]

}`

const { data } = await useSanityQuery(query)

</script>

<style lang="scss" scoped>

footer {
	background-color: yellow;
	position: relative;
	div.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		> div {
			aspect-ratio: 1 / 1;
		}
	}
	ul.social-links {
		position: absolute;
		left: 40px;
		bottom: 40px;
		display: flex;
		flex-flow: row nowrap;
		column-gap: 2ch;
		li {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-sm);
		}
	}
	span.copyright {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-sm);
		position: absolute;
		right: 40px;
		bottom: 40px;
	}
}

</style>