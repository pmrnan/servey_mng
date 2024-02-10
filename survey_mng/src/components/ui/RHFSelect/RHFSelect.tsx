import { Stack, FormControl, Select, MenuItem, Typography, FormLabel } from '@mui/material'
import { OptionItem } from '@/type/ServeyType'
import { useController, Control } from 'react-hook-form'

type RHFSelectProps = {
  name: string
  control: Control<any>
  label: string
  options: OptionItem[]
}

/**
 * RHF用セレクトボックス
 * @param name    Form名
 * @param control Formコントロール
 * @param label   Formラベル
 * @param options 選択肢
 */
const RHFSelect = ({ name, control, label, options }: RHFSelectProps) => {
  const {
    field: { value, ref, ...rest },
    formState: { errors },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Stack direction="column">
      <FormControl>
        <FormLabel sx={{ marginLeft: 1 }}>{label}</FormLabel>
        <Select
          value={value ? value : ''}
          inputRef={ref}
          {...rest}
          style={{ backgroundColor: '#fff' }}
          fullWidth
        >
          {options.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      {errorMessage && (
        <Typography variant="body1" color="red">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  )
}

export default RHFSelect
