import { Dialog, Box, Stack, Grid, IconButton } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { darken } from '@mui/material/styles'
import CloseIcon from '@mui/icons-material/Close'
import { Colors } from '@/const/Constants'
import { Category, OptionItem } from '@/type/ServeyType'
import AppHeader from '@/components/ui/AppHeader'
import RHFSelect from '@/components/ui/RHFSelect'
import RHFText from '@/components/ui/RHFText'
import RHFTextDate from '@/components/ui/RHFTextDate'
import ShareMsgDialog from '@/components/models/ShareMsgDialog'
import { useAddSurveyDialog } from './AddSurveyDialogHooks'

type AddSurveyDialogProps = {
  categoryData: Category[]
  isOpenAddServeyDialog: boolean
  closeAddServeyDialog: () => void
}

/**
 * アンケート追加ダイアログ
 * @param categoryData            全カテゴリーデータ
 * @param isOpenAddServeyDialog   ダイアログ開閉
 * @param closeAddServeyDialog    ダイアログを閉じる
 */
export const AddSurveyDialog = ({
  categoryData,
  isOpenAddServeyDialog,
  closeAddServeyDialog,
}: AddSurveyDialogProps) => {
  // アンケート追加Hooks呼び出し
  const {
    control,
    onSubmit,
    shareData,
    isOpenShareMsgDialog,
    handleCloseAddServey,
    setIsOpenShareMsgDialog,
    isMutating,
  } = useAddSurveyDialog(closeAddServeyDialog)

  // カテゴリープルダウン用選択肢
  const categoryList: OptionItem[] = categoryData.map((d) => ({
    value: d.id,
    label: d.categoryName,
  }))

  return (
    <>
      <Dialog open={isOpenAddServeyDialog} onClose={handleCloseAddServey} fullWidth maxWidth="sm">
        <Box sx={{ backgroundColor: Colors.APP_BACK_GROUND }}>
          <AppHeader title="アンケート追加" />
          <IconButton
            aria-label="close"
            onClick={handleCloseAddServey}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
            }}
          >
            <CloseIcon />
          </IconButton>

          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {/* カテゴリーForm */}
              <Grid item xs={12} mx={2}>
                <Box mt={4}>
                  <RHFSelect
                    name="category"
                    control={control}
                    label="カテゴリー"
                    options={categoryList}
                  />
                </Box>
              </Grid>

              {/* アンケート名Form */}
              <Grid item xs={12} mx={2}>
                <Box>
                  <RHFText name="surveyName" control={control} label="アンケート名" />
                </Box>
              </Grid>

              {/* GoogleフォームリンクForm */}
              <Grid item xs={12} mx={2}>
                <Box>
                  <RHFText name="link" control={control} label="Googleフォームリンク" />
                </Box>
              </Grid>

              {/* 回答期限Form */}
              <Grid item xs={12} mx={2}>
                <Box>
                  <RHFTextDate name="limitDate" control={control} label="回答期限" hours={true} />
                </Box>
              </Grid>
            </Grid>

            {/* 登録ボタン */}
            <Stack mt={5} mb={8} direction="row" justifyContent="center">
              <LoadingButton
                variant="contained"
                sx={{
                  backgroundColor: Colors.APP_GREEN,
                  '&:hover': {
                    backgroundColor: darken(Colors.APP_GREEN, 0.1),
                  },
                  width: '60%',
                }}
                onClick={onSubmit}
                loading={isMutating}
              >
                登録
              </LoadingButton>
            </Stack>
          </form>
        </Box>
      </Dialog>

      {/* 共有メッセージダイアログ */}
      <ShareMsgDialog
        shareData={shareData}
        isOpenShareMsgDialog={isOpenShareMsgDialog}
        closeShareMsgDialog={() => setIsOpenShareMsgDialog(false)}
      />
    </>
  )
}
