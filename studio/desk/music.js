import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { VinylRecord } from '@phosphor-icons/react'
import { DocumentIcon } from '@sanity/icons'

export const musicStructure = (S, context) =>
S.listItem()
	.title('Music')
	.icon(VinylRecord)
	.child(
		S.list()
			.title('Music')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.title('Overview')
					.id('musicPage')
					.documentId('musicPage')
					.schemaType('musicPage')
				),
				S.documentTypeListItem('music').title('Music').icon(VinylRecord),
				orderableDocumentListDeskItem({
					type: 'music', 
					title: 'Order',
					S, context
				}),
			])
		)