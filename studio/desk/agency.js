import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { Stack } from '@phosphor-icons/react'
import { DocumentsIcon, DocumentIcon } from '@sanity/icons'

export const agencyStructure = (S, context) =>
S.listItem()
	.title('Agency')
	.icon(Stack)
	.child(
		S.list()
			.title('Agency')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.title('Overview')
					.id('agencyPage')
					.documentId('agencyPage')
					.schemaType('agencyPage')
				),
				S.divider(),
				S.documentTypeListItem('agencyClient').title('Artists/Clients').icon(Stack),
				orderableDocumentListDeskItem({
					type: 'agencyClient', 
					title: 'Order',
					S, context
				}),
			])
		)