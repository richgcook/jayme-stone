<template>
	<div class="text">
		<SanityContent :blocks="blocks" :serializers="serializers" />
	</div>
</template>

<script setup>

import externalLink from '~/components/serializers/ExternalLink'
import internalLink from '~/components/serializers/InternalLink'
import fileUploadLink from '~/components/serializers/FileUploadLink'

const props = defineProps({
	blocks: Array
})

const serializers = {
	marks: {
		link: externalLink,
		internalLink: internalLink,
		fileUploadLink: fileUploadLink
	}
}

</script>

<style lang="scss" scoped>

div.text {
	white-space: pre-line;
	:deep(ul) {
		li {
			padding-left: 1.5em;
			position: relative;
			&:before {
				content: '—';
				position: absolute;
				left: 0;
			}
			&:not(:last-child) {
				margin-bottom: 3px;
			}
		}
	}
	:deep(> *) {
		margin: 1em 0;
		&:first-child {
			margin-top: 0 !important;
		}
		&:last-child {
			margin-bottom: 0 !important;
		}
	}
}

</style>