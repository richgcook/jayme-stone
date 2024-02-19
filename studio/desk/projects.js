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
				S.documentTypeListItem('project').title('Projects').icon(Stack),
			])
		)