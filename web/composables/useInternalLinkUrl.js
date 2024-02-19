export const useInternalLinkUrl = (type, slug) => {
	if (type === 'studiosSubPage') return `/studios/${slug.current}`
	if (type === 'programmesSubPage') return `/programmes/${slug.current}`
	if (type === 'tenant') return `/tenants/${slug.current}`
	if (type === 'archive') return `/archive/${slug.current}`
	if (type.includes('Page')) return `/${slug.current}`
	return null
}