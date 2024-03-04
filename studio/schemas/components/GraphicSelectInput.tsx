import { StringInputProps, set } from 'sanity'
import { Grid, Button, Stack, Label, Card, Inline, Radio, Flex, Box, Text } from '@sanity/ui'
import { useCallback } from 'react'
import { GRAPHICS } from '../objects/imageVideoGraphic'

export function GraphicInput(props: StringInputProps) {
	const { value, onChange } = props

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
		  const nextValue = event.currentTarget.value
		  onChange(set(nextValue))
		},
		[onChange]
	  )

	const bgUrl = (i) => `url('/static/graphics/image-video-overlay-${i.toString().padStart(2, '0')}.png')`

	return (
		<Grid columns={3} gap={3}>
			{GRAPHICS.map((graphic, index) => (
				<Button
				key={index}
				value={graphic.value}
				mode={value === graphic.value ? `default` : `ghost`}
				onClick={handleClick}
				>
					<Stack space={3} padding={3}>
						<Label style={{textAlign: 'center'}}>{graphic.title}</Label>
					</Stack>
					<Card
						style={{ 
							maskImage: bgUrl(index + 1), 
							maskSize: 'contain', 
							maskPosition: 'top left', 
							maskRepeat: 'no-repeat',
							backgroundColor: value === graphic.value ? `var(--card-bg-color)` : `var(--card-fg-color)`,
							position: 'absolute',
							inset: 0,
							height: '100%',
							width: '100%'
						}}
					></Card>
				</Button>
			))}
		</Grid>
	)
}