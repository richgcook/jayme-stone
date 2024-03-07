<template>
	<div>
		<div class="blocks-layout">

			<div class="block" data-type="featured-image" v-if="data.homePage.featuredImage?.image">
				<div class="image">
					<Img
						:src="data.homePage.featuredImage.image.asset.url"
						:alt="data.homePage.featuredImage.image.asset.alt"
					/>
					<GraphicsImageVideo :index="Number(data.homePage.featuredImage.imageVideoGraphic?.graphic)" :fill="data.homePage.featuredImage.colors?.graphic?.hex" :position="data.homePage.featuredImage.imageVideoGraphic?.position" v-if="data.homePage.featuredImage.imageVideoGraphic?.active" />
				</div>
				<div class="graphic">
					<div></div>
				</div>
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-yellow)'" :fill="`var(--color-black)`" :index="5" />
			</div>

			<div class="block" data-type="text">
				<TitleWithArrow 
					:arrowDirection="'next'" 
					:arrowPosition="'after'" 
					:lineLength="'100%'" 
					:color="`var(--color-green)`" 
					:label="`About`"
					:link="`/${data.aboutPage.slug.current}`"
				/>
				<RichText :blocks="data.homePage.introduction" />
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-pink)'" :fill="`var(--color-black)`" :index="6" />
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-blue)'" :fill="`var(--color-black)`" :index="1" />
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-pink)'" :fill="`var(--color-black)`" :index="2" />
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-red)'" :fill="`var(--color-black)`" :index="3" />
			</div>

			<div class="block" data-type="graphic">
				<GraphicsSquare :bgColor="'var(--color-green)'" :fill="`var(--color-black)`" :index="4" />
			</div>

			<div class="block" data-type="music" :style="{ 'background-color': data.homePage.featuredMusic?.colors?.bg?.hex }">
				<div class="inner">
					<TitleWithArrow 
						:arrowDirection="'next'" 
						:arrowPosition="'after'" 
						:lineLength="'100%'" 
						:color="`var(--color-pink)`" 
						:label="data.musicPage.title"
						:link="`/${data.musicPage.slug.current}`"
					/>
					<div class="content" :style="{ 'color': data.homePage.featuredMusic?.colors?.text?.hex }">
						<div class="title-links">
							<h2>{{ data.homePage.featuredMusic.music.title }}</h2>
							<ul class="streaming-links" v-if="data.homePage.featuredMusic.music.streamingLinks?.length">
								<li v-for="(link, index) in data.homePage.featuredMusic.music.streamingLinks" :key="index">
									<NuxtLink :to="link.link" target="_blank">{{ link.title }}</NuxtLink>
								</li>
							</ul>
						</div>
						<div class="image">
							<Img
								:src="data.homePage.featuredMusic.music.featuredImage.asset.url"
								:alt="data.homePage.featuredMusic.music.featuredImage.asset.alt"
							/>
						</div>
					</div>	
				</div>
				<div class="graphic" :style="{ 'background-color': data.homePage.featuredMusic?.colors?.graphic?.hex }"></div>
			</div>

			<div class="block" data-type="video" :style="{ 'background-color': data.homePage.featuredVideo?.colors?.bg?.hex }">
				<div class="inner">
					<TitleWithArrow 
						:arrowDirection="'next'" 
						:arrowPosition="'after'" 
						:lineLength="'100%'" 
						:color="`var(--color-beige)`" 
						:label="data.videosPage.title"
						:rotation="`-1`"
						:link="`/${data.videosPage.slug.current}`"
					/>
					<div class="content" :style="{ 'color': data.homePage.featuredVideo?.colors?.text?.hex }">
						<h3 class="title --top">{{ data.homePage.featuredVideo.video.title }}</h3>
						<VideoEmbed 
							:poster="data.homePage.featuredVideo.video.coverImage" 
							:html="data.homePage.featuredVideo.video.embedCode" 
							:buttonColor="data.homePage.featuredVideo?.colors?.button?.hex" 
							:iconColor="data.homePage.featuredVideo?.colors?.icon?.hex"
						/>
						<h3 class="title --bottom">{{ data.homePage.featuredVideo.video.title }}</h3>
					</div>	
				</div>
				<div class="graphic" :style="{ 'background-color': data.homePage.featuredVideo?.colors?.graphic?.hex }"></div>
			</div>

			<div class="block" data-type="projects">
				<div class="title-container">
					<TitleWithArrow 
						:arrowDirection="'next'" 
						:arrowPosition="'after'" 
						:lineLength="'50%'" 
						:color="`var(--color-black)`" 
						:label="data.projectsPage.title"
						:rotation="`-1`"
						:link="`/${data.projectsPage.slug.current}`"
					/>
				</div>
				<ProjectsCategory :projects="data.homePage.featuredProjects" :isFirst="true" />
				<div class="graphic"></div>
			</div>

		</div>
		<TestimonialsA :content="data.homePage.testimonialsA" :includeHeader="false" v-if="data.homePage.testimonialsA?.length" />
		<NewsletterSignup :title="data.homePage.newsletterSelection?.active ? data.homePage.newsletterSelection.title : undefined" :segmentId="data.homePage.newsletterSelection?.segment ?? ''" />
	</div>
</template>

<script setup>

const { $seoQuery, $richTextQuery, $imageQuery, $testimonialsAQuery } = useNuxtApp()

const query = groq`{ 

	"homePage": *[_type == "homePage"] {
		_id, _type, title, slug, seo {
			${$seoQuery}
		},
		featuredImage {
			image {
				${$imageQuery}
			},
			colors, imageVideoGraphic
		},
		introduction[] {
			${$richTextQuery}
		},
		featuredMusic {
			music->{
				_id, title, slug, seo {
					${$seoQuery}
				},
				featuredImage {
					${$imageQuery}
				}, 
				streamingLinks,
			},
			colors,
		},
		featuredVideo {
			video->{
				_id, title, slug, seo {
					${$seoQuery}
				},
				coverImage {
					${$imageQuery}
				},
				embedCode,
				title,
			},
			colors,
		},
		featuredProjects[]->{
			_id, _type, slug, title, seo {
				${$seoQuery}
			},
			featuredImage {
				${$imageQuery}
			},
			subtitle, externalLink
		},
		testimonialsA[] {
			${$testimonialsAQuery}
		},
		newsletterSelection
	}[0],

	"aboutPage": *[_type == "pageA" && slug.current == "about"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"projectsPage": *[_type == "projectsPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"musicPage": *[_type == "musicPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],

	"videosPage": *[_type == "videosPage"] {
		_id, title, slug, seo {
			${$seoQuery}
		},
	}[0],
	
}`

const { data } = await useSanityQuery(query)

const { title, description, image, bodyClass } = useMetaBodyHelpers(data?.value.homePage)

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

div.blocks-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	@include media('phone') {
		grid-template-columns: repeat(2, 1fr);
	}
	> div.block {
		&[data-type="featured-image"] {
			grid-column: span 4;
			display: grid;
			grid-template-columns: 1fr 1fr;
			@include media('phone') {
				grid-column: 1 / -1;
				grid-template-columns: 1fr;
			}
			> div.image {
				position: relative;
				@supports (aspect-ratio: 1 / 1) {
					aspect-ratio: 800 / 947;
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
			> div.graphic {
				pointer-events: none;
				position: relative;
				background-color: var(--color-blue);
				> div {
					mask-image: url('/graphics/home-image-featured.png');
					mask-repeat: no-repeat;
					mask-size: 100% calc(100% + 80px);
					mask-position: 0 -80px;
					background-color: var(--color-black);
					position: absolute;
					inset: 0;
					height: 100%;
					width: 100%;
				}
			}
		}
		&[data-type="text"] {
			grid-column: span 2;
			background-color: var(--color-beige);
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			row-gap: 20px;
			font-size: var(--font-size-md);
			line-height: 1.5;
			padding: 50px 25%;
			@include media('phone') {
				grid-column: 1 / -1;
				padding: 60px 30px;
			}
		}
		&[data-type="music"] {
			grid-column: span 2;
			position: relative;
			@include media('phone') {
				grid-column: 1 / -1;
			}
			div.inner {
				padding: 75px 100px 150px 100px;
				position: relative;
				z-index: 1;
				@include media('phone') {
					padding: 60px 30px;
				}
				h3.title-arrow {
					margin-bottom: 20px;
				}
				div.content {
					div.title-links {
						display: grid;
						grid-template-columns: 1fr 1fr;
						column-gap: 20px;
						align-items: baseline;
						margin-bottom: 10px;
						@include media('phone') {
							grid-template-columns: 1fr;
						}
						ul.streaming-links {
							justify-self: flex-end;
							display: flex;
							flex-flow: row wrap;
							@include media('phone') {
								justify-self: flex-start;
							}
							li {
								font-family: var(--font-family-mono);
								font-size: var(--font-size-mono-sm);
								line-height: 1.5;
								&:not(:last-child) {
									&:after {
										content: ',';
										margin-right: 1ch;
									}
								}
							}
						}
					}
					div.image {
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
				}
			}
			div.graphic {
				pointer-events: none;
				mask-image: url('/graphics/home-music-featured.png');
				mask-repeat: no-repeat;
				mask-size: contain;
				position: absolute;
				inset: 0;
				height: 100%;
				width: 100%;
				mask-position: bottom left;
			}
		}
		&[data-type="video"] {
			grid-column: span 2;
			position: relative;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-end;
			@include media('phone') {
				grid-column: 1 / -1;
			}
			div.inner {
				padding: 75px 100px 150px 100px;
				position: relative;
				z-index: 1;
				@include media('phone') {
					padding: 100px 30px 60px 30px;
				}
				div.content {
					margin-top: 100px;
					@include media('phone') {
						margin-top: 10px;
					}
					h3.title {
						&.--top {
							margin-bottom: 10px;
							@include media('phone') {
								display: none;
							}
						}
						&.--bottom {
							margin-top: 10px;
							display: none;
							@include media('phone') {
								display: block;
							}
						}
					}
				}
			}
			div.graphic {
				pointer-events: none;
				mask-image: url('/graphics/home-video-featured.png');
				mask-repeat: no-repeat;
				mask-size: contain;
				position: absolute;
				inset: 0;
				height: 100%;
				width: 60%;
				mask-position: 0 20%;
				@include media('phone') {
					mask-position: 0 10%;
				}
			}
		}
		&[data-type="graphic"] {
			aspect-ratio: 1 / 1;
		}
		&[data-type="projects"] {
			grid-column: span 4;
			background-color: var(--color-beige);
			position: relative;
			overflow: hidden;
			@include media('phone') {
				grid-column: 1 / -1;
			}
			div.title-container {
				padding: 100px 7% 50px 7%;
				@include media('phone') {
					padding: 60px 30px 30px 30px;
				}
			}
			div.graphic {
				pointer-events: none;
				mask-image: url('/graphics/home-projects-featured.png');
				mask-repeat: no-repeat;
				mask-size: contain;
				background-color: white;
				position: absolute;
				bottom: 0;
    			right: 50px;
				height: 100%;
				width: 50%;
				mask-position: bottom left;
			}
		}
	}
}

</style>