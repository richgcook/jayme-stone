import { defineStore } from 'pinia'

export const useProducerTracksStore = defineStore({
	id: 'producer-tracks-store',
	state: () => {
		return {
			currentlyPlayingTrackId: null
		}
	},
	actions: {
		setCurrentlyPlayingTrackId(trackId) {
			this.currentlyPlayingTrackId = trackId
		},
		resetCurrentlyPlayingTrackId() {
			this.currentlyPlayingTrackId = null
		}
	},
	getters: {
		getCurrentlyPlayingTrackId: state => state.currentlyPlayingTrackId
	}
})