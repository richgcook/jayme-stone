import { StringInputProps, set } from 'sanity';
import { Stack, Button, Card, Select, Label, Text } from '@sanity/ui';
import { UserIcon, UsersIcon, EarthGlobeIcon } from '@sanity/icons';
import { useCallback } from 'react';
import { COLORS } from '../schemas/objects/color'

export function ColorInput(props: StringInputProps) {
  const { value, onChange } = props;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(set(nextValue));
    },
    [onChange]
  );

  return (
   
        <Select
          value={value || ''}
          onChange={handleChange}
        >
          {COLORS.map((plan) => (
            <option key={plan.id} value={plan.id}>
				<span style={{backgroundColor:plan.value}}></span>
              {plan.title}
            </option>
          ))}
        </Select>

  );
}