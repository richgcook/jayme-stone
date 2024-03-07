import { defineType, defineField, defineArrayMember } from 'sanity'
import { Textbox, At, TextAlignLeft, SortAscending } from '@phosphor-icons/react'

export default defineType({
	type: "document",
	title: "Form",
	name: "form",
	fields: [
		defineField({
			type: 'string',
			title: 'Title',
			name: 'title',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'slug',
			title: 'Slug',
			name: 'slug',
			options: {
				source: 'title'
			},
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'string',
			title: 'Subtitle',
			name: 'subtitle',
			validation: Rule => Rule.required()
		}),
		defineField({
			type: 'richText',
			title: 'Introduction',
			name: 'introduction',
		}),
		defineField({
			type: 'array',
			title: 'Form',
			name: 'formFields',
			of: [
				defineArrayMember({
					type: 'object',
					title: 'Text',
					name: 'textInput',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'boolean',
							title: 'Required',
							name: 'required',
						}),
					],
					preview: {
						select: {
							label: 'label',
							required: 'required',
						},
						prepare(selection) {
							const { label, required } = selection
							return {
								title: label,
								subtitle: required ? 'Required' : '',
								media: Textbox
							}
						}
					}
				}),
				defineArrayMember({
					type: 'object',
					title: 'Email',
					name: 'emailInput',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'boolean',
							title: 'Required',
							name: 'required',
						}),
					],
					preview: {
						select: {
							label: 'label',
							required: 'required',
						},
						prepare(selection) {
							const { label, required } = selection
							return {
								title: label,
								subtitle: required ? 'Required' : '',
								media: At
							}
						}
					}
				}),
				defineArrayMember({
					type: 'object',
					title: 'Textarea',
					name: 'textarea',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'boolean',
							title: 'Required',
							name: 'required',
						}),
					],
					preview: {
						select: {
							label: 'label',
							required: 'required',
						},
						prepare(selection) {
							const { label, required } = selection
							return {
								title: label,
								subtitle: required ? 'Required' : '',
								media: TextAlignLeft
							}
						}
					}
				}),
				defineArrayMember({
					type: 'object',
					title: 'Dropdown',
					name: 'select',
					fields: [
						defineField({
							type: 'string',
							title: 'Label',
							name: 'label',
							validation: Rule => Rule.required()
						}),
						defineField({
							type: 'array',
							title: 'Options',
							name: 'options',
							of: [
								defineArrayMember({
									type: 'string',
									title: 'Option',
									name: 'option',
									validation: Rule => Rule.required()
								}),
							],
						}),
						defineField({
							type: 'boolean',
							title: 'Required',
							name: 'required',
						}),
					],
					preview: {
						select: {
							label: 'label',
							required: 'required',
						},
						prepare(selection) {
							const { label, required } = selection
							return {
								title: label,
								subtitle: required ? 'Required' : '',
								media: SortAscending
							}
						}
					}
				}),
			]
		}),
		defineField({
			type: 'string',
			title: 'Submit button label',
			name: 'submitLabel',
			initialValue: 'Submit',
		}),
		defineField({
			type: 'text',
			title: 'Success message',
			name: 'successMessage',
			rows: 2,
			initialValue: `Thank you for getting in touch!`,
		}),
		defineField({
			type: 'newsletterSelection',
			name: 'newsletterSelection',
			title: 'Newsletter selection',
		}),
		defineField({
			title: 'SEO',
			name: 'seo',
			type: 'seo'
		}),
	],
})