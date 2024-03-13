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
							apiId: 'ae3ebde6-380d-4ae0-8e7e-2c9199634cc6',
							buildHookId: '65f21c04bacbc83401a0f16a',
							name: 'jayme-stone',
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
