import { Stack, FormControl, TextField, Typography, FormLabel } from '@mui/material'
import { useController, Control } from 'react-hook-form'

type RHFTextProps = {
  name: string
  control: Control<any>
  label: string
}

/**
 * RHF用テキストボックス
 * @param name    Form名
 * @param control Formコントロール
 * @param label   Formラベル
 */
const RHFText = ({ name, control, label }: RHFTextProps) => {
  const {
    field: { value, ref, ...rest },
    formState: { errors },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Stack direction="column">
      <FormControl>
        <FormLabel sx={{ marginLeft: 1 }}>{label}</FormLabel>
        <TextField
          value={value ? value : ''}
          inputRef={ref}
          {...rest}
          style={{ backgroundColor: '#fff' }}
          sx={{
            '& input:-webkit-autofill': {
              boxShadow: `0 0 0 1000px #fff inset`,
            },
          }}
          fullWidth
        />
      </FormControl>
      {errorMessage && (
        <Typography variant="body1" color="red">
          {errorMessage}
        </Typography>
      )}
    </Stack>
  )
}

export default RHFText
