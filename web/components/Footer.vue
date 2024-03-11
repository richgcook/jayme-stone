<template>
	<footer>
		<div class="grid">
			<div><GraphicsSquare :bgColor="'white'" :fill="`var(--color-beige)`" :index="3" /></div>
			<div><GraphicsSquare :bgColor="'white'" :fill="`var(--color-beige)`" :index="2" /></div>
			<div><GraphicsSquare :bgColor="'white'" :fill="`var(--color-beige)`" :index="5" /></div>
			<div><GraphicsSquare :bgColor="'white'" :fill="`var(--color-beige)`" :index="4" /></div>
		</div>
		<ul class="social-links" v-if="data.settingsGeneral?.socialLinks?.length">
			<li v-for="(link, index) in data.settingsGeneral.socialLinks" :key="index"><NuxtLink :to="link.url" target="_blank">{{ link.title }}</NuxtLink></li>
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
	background-color: white;
	position: relative;
	div.grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		@include media('phone') {
			grid-template-columns: 1fr 1fr;
		}
		> div {
			aspect-ratio: 1 / 1;
			&:nth-child(3), &:nth-child(4) {
				@include media('phone') {
					display: none;
				}
			}
		}
	}
	ul.social-links {
		position: absolute;
		left: 40px;
		bottom: 40px;
		z-index: 1;
		display: flex;
		flex-flow: row nowrap;
		column-gap: 2ch;
		@include media('phone') {
			flex-flow: column nowrap;
			left: 30px;
			bottom: 30px;
		}
		li {
			font-family: var(--font-family-mono);
			font-size: var(--font-size-mono-sm);
			a:hover {
				text-decoration-line: underline;
				text-decoration-color: currentColor;
				text-decoration-thickness: 1px;
				text-underline-offset: 4px;
			}
		}
	}
	span.copyright {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-sm);
		position: absolute;
		right: 40px;
		bottom: 40px;
		z-index: 1;
		@include media('phone') {
			right: 30px;
			bottom: 30px;
		}
	}
}

</style>