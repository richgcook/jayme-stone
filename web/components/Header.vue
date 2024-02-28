<template>
	<header :class="{ '--nav-open': navStore.isOpen }">
		<div class="left">
			<div>
				<NuxtLink to="/" class="logo">Jayme Stone</NuxtLink>
				<span class="strapline">Instigator / Integrator</span>
			</div>
			<button class="nav-trigger" @click="navStore.toggleOpen()">
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
		<div class="right">
			<div class="graphic"></div>
		</div>
	</header>
</template>

<script setup>

import { useNavStore } from '~/store/nav'

const navStore = useNavStore()

</script>

<style lang="scss" scoped>

header {
	position: sticky;
	top: 0;
	height: 80px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	background-color: var(--color-green);
	z-index: 20;
	&.--nav-open {
		div.left {
			background-color: var(--color-red);	
			a.logo, 
			span.strapline {
				color: var(--color-black);
			}
			> button.nav-trigger {
				span {
					&:nth-child(1) {
						transform: rotate(45deg) translate(-50%, -50%)  translateX(-1px)
					}
					&:nth-child(2) {
						opacity: 0;
					}
					&:nth-child(3) {
						transform: rotate(-45deg) translate(-50%, -50%) translateX(1px);
					}
				}
			}
		}
		div.right {
			opacity: 0;
			pointer-events: none;
		}
	}
	div.left {
		display: flex;
		flex-flow: row nowrap;
		background-color: var(--color-green);
		transition: background-color 0.3s ease;
		> div {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding: 0 20px 0 40px;
			a.logo {
				color: var(--color-beige);
				transform: rotate(1deg);
				transform-origin: left;
				transition: color 0.3s ease;
			}
			span.strapline {
				font-family: var(--font-family-mono);
				font-size: var(--font-size-mono-caps);
				text-transform: uppercase;
				letter-spacing: 0.05em;
				color: var(--color-beige);
				border-bottom: 1px solid currentColor;
				transform: rotate(1deg);
				transform-origin: left;
				transition: color 0.3s ease;
			}
		}
		> button.nav-trigger {
			all: unset;
			box-sizing: border-box;
			cursor: pointer;
			flex-shrink: 0;
			display: block;
			height: 80px;
			width: 80px;
			background-color: var(--color-pink);
			position: relative;
			span {
				position: absolute;
				top: 50%;
				left: 50%;
				display: block;
				height: 2px;
				width: 28px;
				background-color:var(--color-black);
				transform-origin: left center;
				transition: transform 0.3s ease, opacity 0.3s ease;
				&:nth-child(1) {
					transform: translate(-50%, -50%) translateY(-7px)
				}
				&:nth-child(2) {
					transform: translate(-50%, -50%);
				}
				&:nth-child(3) {
					transform: translate(-50%, -50%) translateY(7px);
				}
			}
		}
	}
	div.right {
		background-color: var(--color-blue);
		transition: opacity 0.3s ease;
		position: relative;
		div.graphic {
			mask-image: url('/graphics/home-image-featured.png');
			mask-repeat: no-repeat;
			mask-size: cover;
			mask-position: 0 0;
			background-color: var(--color-black);
			position: absolute;
			inset: 0;
			height: 100%;
			width: 100%;
		}
	}
}

</style>