const richTextQuery = 
	`
	...,
	markDefs[] {
		...,
		_type == "internalLink" => {
			"slug": @.reference->slug.current,
			"type": @.reference->_type
		},
		_type == "fileUploadLink" => {
			"file": file.asset->{
				url, extension, size
			}
		}
	}
	`
const imageQuery = 
	`
	alt,
	asset->{
		_id,
		url,
		"height": metadata.dimensions.height,
		"width": metadata.dimensions.width,
		"orientation": select(
			metadata.dimensions.height == metadata.dimensions.width => "square",
			metadata.dimensions.height > metadata.dimensions.width => "portrait",
			"landscape"
		),
		"ratio": metadata.dimensions.aspectRatio
	}
	`

const seoQuery =
	`
	metaTitle, metaDescription,
	"shareImage": shareImage.asset->url
	`

const pageBuilderAQuery =
	`
	_type,
	_type == "imageTextBlock" => {
		image {
			${imageQuery}
		},
		title,
		text[] {
			${richTextQuery}
		},
		orientation,
	},
	_type == "contentColumnBlock" => {
		content[] {
			_type,
			_type == "textBlock" => {
				text[] {
					${richTextQuery}
				},
			},
			_type == "imageBlock" => {
				image {
					${imageQuery}
				},
			},
			_type == "videosBlock" => {
				videos[] {
					_type,
					_type == "embedBlock" => {
						coverImage {
							${imageQuery}
						},
						embedCode,
						title,
						bgColor, textColor, highlightColor,
					},
					_type == "videoRefBlock" => {
						video->{
							_id, _type, slug, title, seo {
								${seoQuery}
							},
							bgColor, textColor, highlightColor,
							coverImage {
								${imageQuery}
							},
							embedCode
						}
					},
				}
			},
			_type == "pressBlock" => {
				press[] {
					_type,
					_type == "pressItem" => {
						text, referrerName
					}
				}
			},
		},
		highlightColor,
	},
	`

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('seoQuery', seoQuery)
	nuxtApp.provide('pageBuilderAQuery', pageBuilderAQuery)
})