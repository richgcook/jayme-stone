import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { Video } from '@phosphor-icons/react'
import { DocumentIcon } from '@sanity/icons'

export const videosStructure = (S, context) =>
S.listItem()
	.title('Videos')
	.icon(Video)
	.child(
		S.list()
			.title('Videos')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.title('Overview')
					.id('videosPage')
					.documentId('videosPage')
					.schemaType('videosPage')
				),
				S.documentTypeListItem('video').title('Videos').icon(Video),
				orderableDocumentListDeskItem({
					type: 'video', 
					title: 'Order',
					S, context
				}),
			])
		)