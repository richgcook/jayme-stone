<template>
	<Transition name="fade">
		<nav class="main" v-show="isOpen" v-cloak ref="nav">
			<ul class="menu" v-if="data?.settingsGeneral?.menuA?.length">
				<li v-for="menuItem in data.settingsGeneral.menuA" :key="menuItem._id"><NuxtLink :to="`/${menuItem.slug.current}`">{{ menuItem.title }}</NuxtLink></li>
			</ul>
			<div class="graphic"></div>
		</nav>
	</Transition>
</template>

<script setup>

import { useNavStore } from '~/store/nav'
import { storeToRefs } from 'pinia'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

const navStore = useNavStore()

const { isOpen } = storeToRefs(navStore)

const nav = ref(null)

watch(isOpen, (newValue, oldValue) => {
	if (newValue) disableBodyScroll(nav.value)
	if (oldValue) enableBodyScroll(nav.value)
})

const query = groq`{ 

	"settingsGeneral": *[_type == "settingsGeneral"] {
		menuA[]->{
			_id, _type, slug, title
		}
	}[0]
	
}`

const { data } = await useSanityQuery(query)

</script>

<style lang="scss" scoped>

nav.main {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	padding: 150px 100px;
	overflow-y: auto;
	background-color: var(--color-green);
	z-index: 10;
	@include media('phone') {
		padding: calc(80px + 30px) 30px;
	}
	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 0.3s ease;
	}
	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
	ul.menu {
		display: flex;
		flex-flow: column nowrap;
		position: relative;
    	z-index: 1;
		li {
			font-size: 50px;
			line-height: 1.3;
			@include media('phone') {
				font-size: var(--font-size-lg);
				line-height: 1.5;
			}
			a {
				color: var(--color-beige);
			}
		}
	}
	div.graphic {
		pointer-events: none;
		background-color: var(--color-blue);
		mask-image: url('/graphics/nav.png');
		mask-repeat: no-repeat;
		mask-size: auto 100%;
		position: fixed;
		inset: 0;
		height: 100%;
		width: 100%;
		mask-position: bottom right;
	}
}

</style>