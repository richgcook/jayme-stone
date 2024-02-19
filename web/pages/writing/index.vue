<template>
	<div class="writing-overview-layout">
		<div class="title">
			<h2>{{ data.writingPage.title }}</h2>
		</div>
		<div class="writing-layout">
			<NuxtLink v-for="writing in data.writing" :key="writing._id" :to="`/writing/${writing.slug.current}`" class="writing">
				<h3 class="title">{{ writing.title }}</h3>
				<div class="bottom">
					<div class="left">
						<RichText :blocks="writing.additionalDetails" />
						<p>{{ useFormatDate(writing.date, 'DD.MM.YYYY') }}</p>
					</div>
					<div class="type">
						<component :is="typeSymbol(writing.type)" :fill="'var(--color-primary)'" />
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery } = useNuxtApp()

const query = groq`{ 

	"writingPage": *[_type == "writingPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"writing": *[_type == "writing"] | order(date desc, title asc) {
		_id, title, slug, seo {
			${$seoQuery}
		},
		date, type,
		additionalDetails[] {
			${$richTextQuery}
		}
	}
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.writingPage)

useHead({
	title: title.value,
	meta: useCreateSeoMeta({
		title: title.value,
		description: description.value,
		image: image.value
	}),
	bodyAttrs: {
		class: bodyClass.value
	}
})

const typeSymbol = (type) => {
    switch (type) {
		case 'audio': return resolveComponent('SymbolAudio')
        case 'video': return resolveComponent('SymbolVideo')
		case 'writing': return resolveComponent('SymbolWriting')
		default: return null
    }
}

</script>

<style lang="scss" scoped>

div.writing-overview-layout {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: calc(var(--padding-base) * 4) var(--padding-base);
	padding: 0 var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
		row-gap: calc(var(--padding-base) * 2);
	}
	> div.title {
		grid-column: 1 / span 5;
		grid-row: 1;
		@include media('phone') {
			grid-column: 1 / -1;
			grid-row: auto;
		}
		h2 {
			font-size: var(--font-size-md);
			line-height: 1;
			color: var(--color-primary);
		}
	}
	> div {
		grid-column: 6 / span 6;
		grid-row: 1;
		padding: 0;
		@include media('phone') {
			grid-column: 1 / -1;
			grid-row: auto;
		}
	}
}
div.writing-layout {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: var(--padding-base);
	@include media('phone') {
		grid-template-columns: 1fr;
	}
	a.writing {
		grid-column: span 3;
		display: flex;
		flex-flow: column nowrap;
		justify-content: space-between;
		row-gap: var(--padding-base);
		background-color: #f6f5f4;
		aspect-ratio: 1 / 1;
		padding: 15px var(--padding-base) var(--padding-base) var(--padding-base);
		@include media('phone') {
			grid-column: 1 / -1;
		}
		h3.title {
			font-size: 40px;
			line-height: 1.05;
		}
		div.bottom {
			display: grid;
			grid-template-columns: 1fr 60px;
			align-items: flex-end;
			column-gap: var(--padding-base);
			font-size: var(--font-size-sm);
			line-height: 1.2;
			color: var(--color-primary);
			div.type {
				display: flex;
    			justify-content: flex-end;
				svg {
					height: 30px;
				}
			}
		}
	}
}

</style>