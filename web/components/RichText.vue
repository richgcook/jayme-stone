<template>
	<div class="text">
		<SanityContent :blocks="blocks" :serializers="serializers" />
	</div>
</template>

<script setup>

import externalLink from '~/components/serializers/ExternalLink'
import internalLink from '~/components/serializers/InternalLink'
import fileUploadLink from '~/components/serializers/FileUploadLink'

import highlightDecorator from '~/components/serializers/HighlightDecorator'

const props = defineProps({
	blocks: Array
})

const serializers = {
	marks: {
		link: externalLink,
		internalLink: internalLink,
		fileUploadLink: fileUploadLink,
		highlight: highlightDecorator
	}
}

</script>

<style lang="scss" scoped>

div.text {
	white-space: pre-line;
	:deep(h3) {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-mono-caps);
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--color-green);
	}
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
		margin: 1.6em 0;
		&:first-child {
			margin-top: 0 !important;
		}
		&:last-child {
			margin-bottom: 0 !important;
		}
	}
}

</style>