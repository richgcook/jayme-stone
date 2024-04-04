import { useFormValue } from 'sanity'

export const DocumentBasedPageBuilderBInput = (props) => {
	const { schemaType, renderDefault } = props
	const documentType = useFormValue(['_type'])

	const allowedTypes =
		documentType == 'project' || documentType == 'agencyClient'
			? schemaType.of
			: schemaType.of.filter((type) => !['pressBlock'].includes(type.name))

	return renderDefault({...props, schemaType: {...schemaType, of: allowedTypes}})
}