<template>
	<header :class="{ '--fixed': isFixed }">
		<NuxtLink to="/"><Logo :navIsOpen="navStore.isOpen" /></NuxtLink>
		<button class="nav-trigger" @click="navStore.toggleOpen()" :class="{ '--active': navStore.isOpen }">
			<span></span>
			<span></span>
			<span></span>
		</button>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'

const navStore = useNavStore()

const route = useRoute()

const isFixed = computed(() => {
    return route.name == 'index' || route.name == 'contact'
})

</script>

<style lang="scss" scoped>

header {
	position: relative;
	padding: var(--padding-base);
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	margin-bottom: calc(var(--padding-base) * 5);
	z-index: 20;
	&.--fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}
	> a {
		display: block;
		height: 24px;
		width: 260px;
		@include media('phone') {
			height: 19px;
			width: 212px;
		}
		svg {
			height: auto;
			max-height: 100%;
			width: auto;
			max-width: 100%;
		}
	}
	> button.nav-trigger {
		all: unset;
		box-sizing: border-box;
		cursor: pointer;
		display: block;
		width: 34px;
		position: relative;
		&.--active {
			span {
				background-color: white;
				&:nth-child(1) {
					transform: rotate(45deg) translate(3px, -3px);
				}
				&:nth-child(2) {
					opacity: 0;
				}
				&:nth-child(3) {
					transform: rotate(-45deg) translate(3px, 3px);
				}
			}
		}
		span {
			position: absolute;
			display: block;
			height: 3px;
			width: 34px;
			background-color:black;
			transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
			&:nth-child(1) {
				transform: translate(0, -11px);
			}
			&:nth-child(3) {
				transform: translate(0, 11px);
			}
		}
	}
}

</style>