import { useFormValue } from 'sanity'

export const DocumentBasedPageBuilderAInput = (props) => {
	const { schemaType, renderDefault } = props
	const documentType = useFormValue(['_type'])

	const allowedTypes =
		documentType == 'bookingAgent'
			? schemaType.of
			: schemaType.of.filter((type) => !['pressKitBlock'].includes(type.name))

	return renderDefault({...props, schemaType: {...schemaType, of: allowedTypes}})
}