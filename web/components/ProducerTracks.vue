<template>
	<div class="tracks-layout">
		<ProducerTrack v-for="(track, index) in tracks" :key="index" :track="track" />
	</div>
</template>

<script setup>

const props = defineProps({
	tracks: Array
})

</script>

<style lang="scss" scoped>

div.tracks-layout {
	background-color: var(--color-green);
	padding: 100px;
}

</style>