<template>
	<div class="press-overview">
		<PageHeader :title="data.pressPage.title" />
		<div class="kit-sections">
			<div class="photos section" v-if="data.pressPage.photos?.length">
				<h2 class="section-title">Photos</h2>
				<div class="downloads">
					<div v-for="(download, index) in data.pressPage.photos" :key="index" class="download">
						<NuxtLink :to="download.file" class="image">
							<Img
								:src="download.image.asset.url"
								:alt="download.image.asset.alt"
							/>
						</NuxtLink>
						<div class="text">
							<div>
								<h3>{{ download.title }}</h3>
								<h4 v-if="download.credits">{{ download.credits }}</h4>
							</div>
							<div>
								<NuxtLink :to="download.file" class="download"><SymbolDownload :fill="`var(--color-red)`" /></NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="resources section" v-if="data.pressPage.resources?.length">
				<h2 class="section-title">Resources</h2>
				<div class="downloads">
					<NuxtLink :to="download.file" v-for="(download, index) in data.pressPage.resources" :key="index" target="_blank" class="download">
						<div>{{ download.title }}</div>
						<div>
							<div class="download">
								<SymbolDownload :fill="`var(--color-red)`" />
							</div>
						</div>
					</NuxtLink>
				</div>
			</div>
			<div class="contact section" v-if="data.pressPage.contact?.length">
				<h2 class="section-title">Contact</h2>
				<ul>
					<li v-for="(link, index) in data.pressPage.contact" :key="index"><NuxtLink :to="link.link" target="_blank">{{ link.title }}</NuxtLink></li>
				</ul>
			</div>
		</div>
		<NewsletterSignup :title="data.pressPage.newsletterSelection?.active ? data.pressPage.newsletterSelection.title : undefined" :segmentId="data.pressPage.newsletterSelection.segment" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery } = useNuxtApp()

const query = groq`{ 

	"pressPage": *[_type == "pressPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
		photos[] {
			image {
				${$imageQuery}
			},
			title, credits,
			"file": file.asset->url
		},
		resources[] {
			title,
			"file": file.asset->url
		},
		contact[] {
			title, link
		},
		newsletterSelection
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.pressPage)

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

</script>

<style lang="scss" scoped>

div.press-overview {
	background-color: var(--color-beige);
	h2.section-title {
		color: var(--color-green);
		&:after {
			content: '';
			display: block;
			height: 1px;
			width: 100%;
			background-color: white;
			margin: 25px 0 35px 0;
		}
	}
	div.kit-sections {
		display: grid;
		row-gap: 75px;
		padding: 0 100px 100px 100px;
		@include media('phone') {
			row-gap: 60px;
			padding: 0 30px 60px 30px;
		}
		div.section {
			&.photos {
				div.downloads {
					display: grid;
					grid-template-columns: repeat(6, 1fr);
					gap: 40px;
					@include media('phone') {
						grid-template-columns: 1fr 1fr;
						gap: 30px 15px;
					}
					div.download {
						a.image {
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
						div.text {
							font-family: var(--font-family-mono);
							font-size: var(--font-size-mono-sm);
							display: flex;
							flex-flow: row nowrap;
							justify-content: space-between;
							column-gap: 10px;
							margin-top: 10px;
							@include media('phone') {
								column-gap: 15px;
							}
							a.download {
								display: block;
								position: relative;
								height: 40px;
								width: 40px;
								background-color: white;
								border-radius: 50%;
								@include media('phone') {
									height: 30px;
									width: 30px;
								}
								svg {
									position: absolute;
									top: 50%;
									left: 50%;
									transform: translate(-50%, -50%);
									height: 19px;
									@include media('phone') {
										height: 13px;
									}
								}
							}
						}
					}
				}
			}
			&.resources {
				div.downloads {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					gap: 40px;
					@include media('phone') {
						grid-template-columns: 1fr;
						gap: 15px;
					}
					a.download {
						display: block;
						height: 85px;
						background-color: var(--color-blue);
						font-family: var(--font-family-mono);
						font-size: var(--font-size-mono-caps);
						letter-spacing: 0.05em;
						text-transform: uppercase;
						color: var(--color-beige);
						display: flex;
						flex-flow: row nowrap;
						justify-content: space-between;
						align-items: center;
						column-gap: 10px;
						padding: 0 15px 0 25px;
						@include media('phone') {
							height: 50px;
							padding: 0 10px 0 15px;
						}
						div.download {
							display: block;
							position: relative;
							height: 40px;
							width: 40px;
							background-color: white;
							border-radius: 50%;
							@include media('phone') {
								height: 30px;
								width: 30px;
							}
							svg {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translate(-50%, -50%);
								height: 19px;
								@include media('phone') {
									height: 13px;
								}
							}
						}
					}
				}
			}
		}
	}
}

</style>