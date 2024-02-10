import { Stack, FormControl, Typography, FormLabel } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers-pro'
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers'
import { useController, Control, Controller } from 'react-hook-form'
import ja from 'date-fns/locale/ja'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type RHFTextDateProps = {
  name: string
  control: Control<any>
  label: string
  hours?: boolean
  minutes?: boolean
  seconds?: boolean
}

/**
 * RHF用日付選択テキストボックス
 * @param name    Form名
 * @param control Formコントロール
 * @param label   Formラベル
 * @param hours   true:時入力あり
 * @param minutes true:分入力あり
 * @param seconds true:秒入力あり
 */
const RHFTextDate = ({ name, control, label, hours, minutes, seconds }: RHFTextDateProps) => {
  const {
    field,
    formState: { errors },
  } = useController({ name, control })

  const errorMessage = errors?.[name]?.message as string

  return (
    <Stack direction="column">
      <FormControl>
        <FormLabel sx={{ marginLeft: 1 }}>{label}</FormLabel>
        <Controller
          name={field.name}
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
              <DateTimePicker
                viewRenderers={{
                  hours: hours ? renderTimeViewClock : null,
                  minutes: minutes ? renderTimeViewClock : null,
                  seconds: seconds ? renderTimeViewClock : null,
                }}
                slotProps={{ textField: { required: true } }}
                {...field}
                onChange={(value) => field.onChange(value)}
                sx={{
                  backgroundColor: '#fff',
                }}
              />
            </LocalizationProvider>
          )}
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

export default RHFTextDate
