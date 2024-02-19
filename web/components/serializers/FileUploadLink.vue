<template>
	<a :href="`${file.url}?dl=`" target="_blank">
		<slot />
	</a>
</template>

<script>

export default {
	props: ['file']
}

</script>