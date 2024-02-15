import { VariantType, useSnackbar } from 'notistack'

/**
 * トースト取得
 */
export const useToast = () => {
  const { enqueueSnackbar } = useSnackbar()

  // 成功トースト
  const successToast = (message: string): void => {
    const variant: VariantType = 'success'
    enqueueSnackbar(message, { variant })
  }

  // エラートースト
  const errorToast = (message: string) => () => {
    const variant: VariantType = 'error'
    enqueueSnackbar(message, { variant })
  }

  return {
    successToast,
    errorToast
  }
}