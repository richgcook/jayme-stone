<template>
	<Transition name="fade">
		<nav class="main" v-show="isOpen" v-cloak ref="nav">
			<ul class="menu">
				<li><NuxtLink to="/about">About</NuxtLink></li>
				<li><NuxtLink to="/writing">Selected Writing</NuxtLink></li>
				<li><NuxtLink to="/contact">Contact</NuxtLink></li>
			</ul>
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

</script>

<style lang="scss" scoped>

nav.main {
	position: fixed;
	inset: 0;
	height: 100%;
	width: 100%;
	background-color: var(--color-primary);
	z-index: 10;
	&.fade-enter-active,
	&.fade-leave-active {
		transition: opacity 0.3s ease;
	}
	&.fade-enter-from,
	&.fade-leave-to {
		opacity: 0;
	}
	ul.menu {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-evenly;
		@include media('phone') {
			flex-flow: column nowrap;
			align-items: center;
			row-gap: 3em;
		}
		li {
			font-size: 43px;
			line-height: 1;
			@include media('phone') {
				font-size: 38px;
			}
			a {
				color: white;
				&:hover {
					text-decoration: underline;
					text-decoration-thickness: 3px;
					text-underline-offset: 3px;
				}
			}
		}
	}
}

</style>