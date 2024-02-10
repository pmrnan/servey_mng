import React from 'react'
import { useShareTemplete } from 'data/ShareTemplete'
import { Servey } from '@/type/ServeyType'
import { useToast } from '@/components/usecases/Toast'

/**
 * 共有メッセージダイアログHooks
 * @param shareData             共有メッセージ用データ
 * @param closeShareMsgDialog   ダイアログを閉じる
 */
export const useShareMsgDialog = (
  shareData: Servey | undefined,
  closeShareMsgDialog: () => void
) => {
  // 共有メッセージ
  const [shareMsg, setShareMsg] = React.useState<string>('')

  // トースト表示用コールバック
  const { successToast, errorToast } = useToast()

  // メッセージ変更時
  const changeMsg = (e: any) => {
    setShareMsg(e.currentTarget.value)
  }

  // 共有メッセージコピー
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        successToast('共有メッセージのコピーに成功しました。')
      },
      (err) => {
        errorToast('共有メッセージのコピーに失敗しました。詳細：' + err)
      }
    )
  }

  // 共有メッセージダイアログクローズ時
  const handleCloseShareMsgDialog = () => {
    closeShareMsgDialog()
  }

  // 共有メッセージデフォルト値設定
  React.useEffect(() => {
    if (shareData) setShareMsg(useShareTemplete(shareData))
  }, [shareData])

  return {
    shareMsg,
    changeMsg,
    copyTextToClipboard,
    handleCloseShareMsgDialog,
  }
}
