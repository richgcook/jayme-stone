const richTextQuery = 
	`
	...,
	markDefs[] {
		...,
		_type == "internalLink" => {
			"slug": @.reference->slug.current,
			"dataType": @.reference->_type
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

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('richTextQuery', richTextQuery)
	nuxtApp.provide('imageQuery', imageQuery)
	nuxtApp.provide('seoQuery', seoQuery)
})