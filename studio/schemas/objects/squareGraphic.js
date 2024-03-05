import { defineField } from 'sanity'
import { GraphicInput } from '../components/GraphicSelectInputA'

export const GRAPHICS = Array.from({ length: 16 }, (_, index) => ({
    title: `Option ${index + 1}`,
    value: `${index + 1 < 10 ? '0' : ''}${index + 1}`
}))

export default defineField({
	type: 'string',
	title: 'Graphic',
	name: 'squareGraphic',
	options: {
		list: GRAPHICS.map(({title, value}) => ({title, value})),
		layout: 'radio',
		direction: 'horizontal',
	},
	components: { input: GraphicInput },
})