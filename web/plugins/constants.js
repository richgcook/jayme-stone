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

const testimonialsAQuery =
	`
	_type,
	_type == "testimonial" => {
		text[] {
			${richTextQuery}
		}, 
		textSize,
		referrer {
			name,
			image {
				${imageQuery}
			}
		},
		centerText, bgColor, textColor, blockWidth, blockHeight
	},
	_type == "graphic" => {
		blockWidth, colors
	}
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
						buttonColor, iconColor,
					},
					_type == "videoRefBlock" => {
						video->{
							_id, _type, slug, title, seo {
								${seoQuery}
							},
							buttonColor, iconColor,
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
		graphicColor,
	},
	`

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('seoQuery', seoQuery)
	nuxtApp.provide('testimonialsAQuery', testimonialsAQuery)
	nuxtApp.provide('pageBuilderAQuery', pageBuilderAQuery)
})