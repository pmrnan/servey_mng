import React from 'react'
import { Dialog, Box, Stack, TextField, IconButton, Typography, Tooltip } from '@mui/material'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import CloseIcon from '@mui/icons-material/Close'
import { Servey } from '@/type/ServeyType'
import AppHeader from '@/components/ui/AppHeader'
import { Colors } from '@/const/Constants'
import { useShareMsgDialog } from './ShareMsgDialogHooks'

type ShareMsgDialogProps = {
  shareData: Servey | undefined
  isOpenShareMsgDialog: boolean
  closeShareMsgDialog: () => void
}

/**
 * 共有メッセージダイアログ
 * @param shareData             共有メッセージ用データ
 * @param isOpenShareMsgDialog  ダイアログ開閉
 * @param closeShareMsgDialog   ダイアログを閉じる
 */
export const ShareMsgDialog = ({
  shareData,
  isOpenShareMsgDialog,
  closeShareMsgDialog,
}: ShareMsgDialogProps) => {
  // 共有メッセージHooks呼び出し
  const { shareMsg, changeMsg, copyTextToClipboard, handleCloseShareMsgDialog } = useShareMsgDialog(
    shareData,
    closeShareMsgDialog
  )

  return (
    <>
      <Dialog
        open={isOpenShareMsgDialog}
        onClose={handleCloseShareMsgDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ backgroundColor: Colors.APP_BACK_GROUND }} pb={3}>
          <AppHeader title="共有メッセージ作成" />
          <IconButton
            aria-label="close"
            onClick={handleCloseShareMsgDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: '#fff',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box mx={2}>
            <Box my={2}>
              <Typography variant="body1">共有するメッセージを作成します。</Typography>
            </Box>

            {/* メッセージ作成エリア */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={shareMsg}
                onChange={(e) => changeMsg(e)}
                multiline
                style={{ backgroundColor: '#fff' }}
                fullWidth
              />

              {/* コピーボタン */}
              <Tooltip title="copy" arrow>
                <IconButton aria-label="copy" onClick={() => copyTextToClipboard(shareMsg)}>
                  <FileCopyIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Dialog>
    </>
  )
}
