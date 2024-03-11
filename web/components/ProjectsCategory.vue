<template>
	<div class="projects-category" :class="{ '--first': isFirst }">
		<div class="graphic" v-if="!isFirst"></div>
		<h2 class="category-title" v-if="title">{{ title }}</h2>
		<div class="projects-layout">
			<div v-for="project in projects" :key="project._id" class="project">
				<NuxtLink :to="linkUrl(project)" :target="externalLinkTarget(project)" class="image">
					<Img
						:src="project.featuredImage.asset.url"
						:alt="project.featuredImage.asset.alt"
					/>
				</NuxtLink>
				<div class="text">
					<h3><NuxtLink :to="linkUrl(project)" :target="externalLinkTarget(project)">{{ project.title }}</NuxtLink></h3>
					<h2><NuxtLink :to="linkUrl(project)" :target="externalLinkTarget(project)">{{ project.subtitle }}</NuxtLink></h2>
					<NuxtLink :to="linkUrl(project)" :target="externalLinkTarget(project)" class="more">{{ linkTitle(project) }}</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>

const props = defineProps({
	isFirst: {
		type: Boolean,
		default: false
	},
	title: String,
	projects: Array,
	bgColor: {
		type: String,
		default: 'var(--color-beige)'
	},
	categoryTitleColor: {
		type: String,
		default: 'var(--color-green)'
	},
	titleColor: {
		type: String,
		default: 'var(--color-black)'
	},
	subtitleColor: {
		type: String,
		default: 'var(--color-black)'
	},
	linkColor: {
		type: String,
		default: 'var(--color-blue)'
	},
	lineColor: {
		type: String,
		default: 'white'
	},
	isOverview: {
		type: Boolean,
		default: false
	}
})

const linkUrl = (project) => {
	if (project.externalLink && project.externalLink.url) return project.externalLink.url
	return project.externalLink ? project.externalLink : `/projects/${project.slug.current}`
}

const linkTitle = (project) => {
	if (project.externalLink && project.externalLink.url && project.externalLink.label) return project.externalLink.label
	return `Learn more`
}

const externalLinkTarget = (project) => {
	return linkIsExternal(project) ? '_blank' : null
}

const linkIsExternal = (project) => {
	return !!project.externalLink
}

</script>

<style scoped lang="scss">

div.projects-category {
	padding: 100px 7%;
	background-color: v-bind(bgColor);
	position: relative;
	@include media('phone') {
		padding: 60px 30px;
	}
	&.--first {
		padding-top: 0;
	}
	div.graphic {
		background-color: var(--color-black);
		mask-image: url('/graphics/projects-integrator.png');
		mask-repeat: no-repeat;
		mask-size: contain;
		position: absolute;
		right: 0;
		top: 0;
		width: 50%;
		height: 100%;
		max-height: 140px;
		mask-position: top right;
	}
	h2.category-title {
		color: v-bind(categoryTitleColor);
		&:after {
			content: '';
			display: block;
			height: 1px;
			width: 100%;
			background-color: v-bind(lineColor);
			margin: 25px 0 35px 0;
		}
	}
}
div.projects-layout {
	div.project {
		display: grid;
		grid-template-columns: 1fr 2fr;
		column-gap: 40px;
		@include media('phone') {
			grid-template-columns: 1fr;
			row-gap: 10px;
		}
		&:not(:last-child) {
			&:after {
				content: '';
				grid-column: 1 / -1;
				display: block;
				height: 1px;
				width: 100%;
				background-color: v-bind(lineColor);
				margin: 35px 0;
				@include media('phone') {
					margin: 5px 0 20px 0;
				}
			}
		}
		> a.image {
			display: block;
			position: relative;
			@supports (aspect-ratio: 1 / 1) {
				aspect-ratio: 1 / 1;
			}
			@supports not (aspect-ratio: 1 / 1) {
				padding-bottom: calc(1 / 1 * 100%);
			}
			img {
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
		> div.text {
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			h3 {
				font-family: var(--font-family-mono);
				font-size: var(--font-size-mono-caps);
				letter-spacing: 0.05em;
				text-transform: uppercase;
				transform: rotate(-2deg);
				transform-origin: top left;
				color: v-bind(subtitleColor);
				margin-bottom: 10px;
			}
			h2 {
				font-size: var(--font-size-lg);
				line-height: 1.3;
				color: v-bind(titleColor);
			}
			a.more {
				display: inline-flex;
				font-family: var(--font-family-mono);
				font-size: var(--font-size-mono-sm);
				text-transform: lowercase;
				color: v-bind(linkColor);
				margin-top: 3px;
				@include media('phone') {
					margin-top: 5px;
				}
				&:hover {
					text-decoration-line: underline;
					text-decoration-color: currentColor;
					text-decoration-thickness: 1px;
					text-underline-offset: 4px;
				}
			}
		}
	}
}


</style>