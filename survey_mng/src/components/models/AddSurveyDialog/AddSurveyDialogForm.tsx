import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// zodスキーマ定義
const addSurveyFormSchema = z.object({
  category: z.string().min(1),
  surveyName: z.string().min(1),
  link: z.string().min(1),
  limitDate: z.date(),
})

// スキーマから型を生成
export type AddSurveyFormSchemaType = z.infer<typeof addSurveyFormSchema>

/**
 * アンケート追加ダイアログForm
 */
export const useAddSurveyDialogForm = () => {
  // 回答期限の初期値を当日の18時に設定
  const defaultLimiteDate = new Date()
  defaultLimiteDate.setHours(18)
  defaultLimiteDate.setMinutes(0)
  defaultLimiteDate.setSeconds(0)

  // 初期値設定
  const defaultValues: AddSurveyFormSchemaType = {
    category: '',
    surveyName: '',
    link: '',
    limitDate: defaultLimiteDate,
  }

  // RHF定義
  const { control, handleSubmit, reset } = useForm<AddSurveyFormSchemaType>({
    resolver: zodResolver(addSurveyFormSchema),
    defaultValues: defaultValues,
  })

  return {
    control,
    handleSubmit,
    reset,
  }
}
