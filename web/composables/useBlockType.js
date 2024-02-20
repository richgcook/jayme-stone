export const useBlockType = (type) => {
	switch (type) {
		case 'textBlock': return 'text'
		case 'imageBlock': return 'image'
		case 'audioBlock': return 'audio'
		case 'videoBlock': return 'video'
		case 'embedBlock': return 'embed'
		case 'imageTextBlock': return 'image-text'
		case 'contentColumnBlock': return 'content-column'
		default: return
	}
}