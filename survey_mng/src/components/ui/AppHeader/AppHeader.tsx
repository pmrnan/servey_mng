import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import { Colors } from '../../../const/Constants'

export type AppHeaderProps = {
  title: string
}

/**
 * アプリ内共通Header
 * @param title タイトル
 */
export const AppHeader = ({ title }: AppHeaderProps) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: Colors.APP_ORANGE }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
