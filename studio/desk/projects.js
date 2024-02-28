import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { Stack } from '@phosphor-icons/react'
import { DocumentsIcon, DocumentIcon } from '@sanity/icons'

export const projectsStructure = (S, context) =>
S.listItem()
	.title('Projects')
	.icon(Stack)
	.child(
		S.list()
			.title('Projects')
			.items([
				S.listItem()
				.title('Overview')
				.icon(DocumentIcon)
				.child(
					S.document()
					.title('Overview')
					.id('projectsPage')
					.documentId('projectsPage')
					.schemaType('projectsPage')
				),
				S.divider(),
				S.documentTypeListItem('project').title('Projects (as Artist)').icon(Stack),
				orderableDocumentListDeskItem({
					type: 'project', 
					title: 'Order',
					S, context
				}),
				S.divider(),
				S.documentTypeListItem('projectIntegrator').title('Projects (as Integrator)').icon(Stack),
				orderableDocumentListDeskItem({
					type: 'projectIntegrator', 
					title: 'Order',
					S, context
				}),
			])
		)