import React from 'react'
import { Servey } from '@/type/ServeyType'
import { addServeyData } from '@/components/usecases/Survey'
import { useToast } from '@/components/usecases/Toast'
import { useAddSurveyDialogForm, AddSurveyFormSchemaType } from './AddSurveyDialogForm'

/**
 * アンケート追加ダイアログHooks
 * @param closeAddServeyDialog  ダイアログを閉じる
 */
export const useAddSurveyDialog = (closeAddServeyDialog: () => void) => {
  // 共有メッセージダイアログ開閉
  const [isOpenShareMsgDialog, setIsOpenShareMsgDialog] = React.useState<boolean>(false)
  // 共有メッセージ用データ
  const [shareData, setShareData] = React.useState<Servey>()

  // フォーム定義呼び出し
  const { control, handleSubmit, reset } = useAddSurveyDialogForm()
  // アンケート追加コールバック
  const { trigger: addServey, isMutating } = addServeyData()
  // トースト表示用コールバック
  const { successToast, errorToast } = useToast()

  // 登録ボタン押下時
  const onSubmit = async (data: AddSurveyFormSchemaType) => {
    if (!data) return

    // リクエスト作成
    const uuid = crypto.randomUUID()
    const payload: any = {
      id: uuid,
      categoryId: String(data.category),
      serveyName: data.surveyName,
      link: data.link,
      limitDate: data.limitDate,
    }

    // アンケート追加API呼び出し
    await addServey(payload, {
      onSuccess(data: any) {
        successToast('アンケート追加に成功しました。')
        reset()
        handleCloseAddServey()
        if (data) {
          const newData: Servey = data.find((d: Servey) => d.id == payload.id)
          setShareData(newData)
        }
        // 共有メッセージダイアログオープン
        setIsOpenShareMsgDialog(true)
      },
      onError(err: any) {
        errorToast('アンケート追加に失敗しました。詳細：' + err.message)
      },
    })
  }

  // アンケート追加ダイアログクローズ時
  const handleCloseAddServey = () => {
    reset()
    closeAddServeyDialog()
  }

  return {
    control,
    onSubmit: handleSubmit(onSubmit),
    shareData,
    isOpenShareMsgDialog,
    handleCloseAddServey,
    setIsOpenShareMsgDialog,
    isMutating,
  }
}
