import { House, Calendar, FileArrowDown } from '@phosphor-icons/react'
import { DocumentsIcon, ComposeIcon } from '@sanity/icons'

import { projectsStructure } from './projects'
import { musicStructure } from './music'
import { videosStructure } from './videos'
import { settingsStructure } from './settingsGeneral'

const hiddenDocTypes = listItem => 
	![
		'homePage',
		'project',
		'projectIntegrator',
		'projectsPage',
		'projectCategory',
		'music',
		'musicPage',
		'video',
		'videosPage',
		'eventsPage',
		'pressPage',
		'pageA',
		'form',
		'settingsGeneral',
	]
.includes(listItem.getId())

export const deskStructure = (S, context) =>

  	S.list()
	.title('Content')
	.items([

		S.listItem()
		.title('Home')
		.icon(House)
		.child(
			S.document()
			.id('homePage')
			.schemaType('homePage')
			.documentId('homePage')
		),

		projectsStructure(S, context),

		musicStructure(S, context),

		videosStructure(S, context),

		S.listItem()
		.title('Events')
		.icon(Calendar)
		.child(
			S.document()
			.id('eventsPage')
			.schemaType('eventsPage')
			.documentId('eventsPage')
		),

		S.listItem()
		.title('Press Kit')
		.icon(FileArrowDown)
		.child(
			S.document()
			.id('pressPage')
			.schemaType('pressPage')
			.documentId('pressPage')
		),

		S.documentTypeListItem('pageA').title('Pages').icon(DocumentsIcon),

		S.documentTypeListItem('form').title('Forms').icon(ComposeIcon),

		settingsStructure(S, context),

		// Filter out docs already defined above
		...S.documentTypeListItems().filter(hiddenDocTypes),
		
	])