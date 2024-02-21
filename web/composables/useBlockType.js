export const useBlockType = (type) => {
	switch (type) {
		case 'textBlock': return 'text'
		case 'imageBlock': return 'image'
		case 'audioBlock': return 'audio'
		case 'videoBlock': return 'video'
		case 'videosBlock': return 'videos'
		case 'embedBlock': return 'embed'
		case 'imageTextBlock': return 'image-text'
		case 'contentColumnBlock': return 'content-column'
		case 'videoRefBlock': return 'video-ref'
		case 'pressBlock': return 'press'
		case 'pressItem': return 'press-item'
		default: return
	}
}