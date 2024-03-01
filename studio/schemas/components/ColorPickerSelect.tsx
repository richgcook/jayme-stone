import { StringInputProps, set } from 'sanity'
import { Card, Inline, Radio, Flex, Box, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { COLORS } from '../objects/colorPickerSelect'

export function ColorInput(props: StringInputProps) {
	const { value, onChange } = props

	const handleChange = useCallback((event) => {
		const nextValue = event.currentTarget.value
		onChange(set(nextValue))
	},
		[onChange]
	)

	return (
		<Card border padding={3} radius={2}>
			<Inline space={3} role="group">
				{COLORS.map((color, index) => (
					<Flex as="label" align="center" key={index}>
						<Radio
							checked={value === color.value}
							name={color.value}
							onChange={handleChange}
							value={color.value}
						/>
						<Box marginLeft={2}>
							<Text size={1} weight="medium">
								{color.title}
							</Text>
						</Box>
					</Flex>
				))}
			</Inline>
		</Card>
	)
}