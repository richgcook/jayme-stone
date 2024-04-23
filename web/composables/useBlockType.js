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
		case 'pressKitBlock': return 'press-kit'
		case 'photosBlock': return 'photos'
		case 'resourcesBlock': return 'resources'
		case 'contactBlock': return 'contact'
		case 'eventsBlock': return 'events'
		case 'upcomingEventsBlock': return 'events-upcoming'
		case 'eventsArchiveBlock': return 'events-archive'
		default: return
	}
}