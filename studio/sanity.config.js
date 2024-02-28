import { defineConfig } from 'sanity'
import { structureTool}  from 'sanity/structure'
import { visionTool} from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './desk'
import { dashboardTool } from '@sanity/dashboard'
import { netlifyWidget } from 'sanity-plugin-dashboard-widget-netlify'
import { colorInput } from '@sanity/color-input'

export default defineConfig({
	name: 'default',
	title: 'Jayme Stone',
	projectId: 'verzhayl',
	dataset: 'production',
	document: {
		newDocumentOptions: (prev, { currentUser, creationContext }) => {
			const { type } = creationContext
			if (type === 'global') {
				const excludedTemplateIds = ['homePage', 'eventsPage', 'musicPage', 'pressPage', 'projectsPage', 'settingsGeneral', 'videosPage']
				return prev.filter((template) => !excludedTemplateIds.includes(template.templateId))
			}
			return prev
		},
	},
	plugins: [
		structureTool({
			structure: deskStructure,
		}), 
		visionTool(),
		dashboardTool({
			widgets: [
				netlifyWidget({
					title: 'Netlify',
					sites: [
						{
							title: 'Jayme Stone website',
							apiId: '5453508f-4a7c-4619-b39d-b2d8c03a983d',
							buildHookId: '65df421671dbda1a6fa67032',
							name: 'jayme-stone-dev-a0f8f3',
						}
					]
				})
			]
		}),
		colorInput(),
	],
  	schema: {
    	types: schemaTypes,
  	},
})
