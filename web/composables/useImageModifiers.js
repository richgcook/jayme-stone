import { computed, toValue } from 'vue'

export const buildImageModifiers = (image, { applyCrop = true, fit } = {}) => {
	const img = toValue(image)
	return {
		...(fit && { fit }),
		...(img?.hotspot && { hotspot: img.hotspot }),
		...(applyCrop && img?.crop && { crop: img.crop }),
	}
}

/**
 * Build NuxtImg modifiers for a single Sanity image or an array of images.
 *
 * Use in <script setup> only — returns a ComputedRef. Binding that ref from a
 * template call (e.g. :modifiers="useImageModifiers(...)") passes the ref
 * itself to NuxtImg, which serializes it into the image URL.
 *
 * In templates / v-for, use buildImageModifiers(image) instead.
 *
 * Script:
 *   const imageModifiers = useImageModifiers(() => props.media?.image)
 *   const imageModifiers = useImageModifiers(() => props.article.image, { applyCrop: false })
 *
 * Template:
 *   :modifiers="buildImageModifiers(block.media.image)"
 *   :modifiers="buildImageModifiers(block.media.image, { fit: 'crop' })"
 */
export const useImageModifiers = (imageOrImages, options = {}) => {
	return computed(() => {
		const value = typeof imageOrImages === 'function' ? imageOrImages() : toValue(imageOrImages)
		const opts = {
			applyCrop: toValue(options.applyCrop ?? true),
			fit: toValue(options.fit),
		}

		if (Array.isArray(value)) {
			return value.map(img => buildImageModifiers(img, opts))
		}

		return buildImageModifiers(value, opts)
	})
}
