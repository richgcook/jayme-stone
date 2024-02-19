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
				const excludedTemplateIds = ['homePage', 'writingPage', 'aboutPage', 'contactPage']
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
				/*
				netlifyWidget({
					title: 'Netlify',
					sites: [
						{
							title: 'GKSH website',
							apiId: '65feb728-8ceb-483f-8a84-471cbad8f380',
							buildHookId: '6572fe561ae76d7a3c99f84c',
							name: 'gksh-dev-18d3cf',
						}
					]
				})
				*/
			]
		}),
		colorInput(),
	],
  	schema: {
    	types: schemaTypes,
  	},
})
