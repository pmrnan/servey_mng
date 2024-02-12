import { Box } from '@mui/material'
import { DataGrid, DataGridProps, jaJP } from '@mui/x-data-grid'
import { Colors } from '../../../const/Constants' // storybookで確認したいため相対パスで記載
import { styled } from '@mui/material/styles'

type AppGridProps = {
  height?: string | number
  width?: string | number
} & DataGridProps

/**
 * アプリ内共通DataGrid
 * @param height  高さ
 * @param width   横幅
 */
export const AppGrid = ({ height, width, ...props }: AppGridProps) => {
  return (
    <>
      <Box sx={{ height: { height }, width: { width } }}>
        <StyledDataGrid
          {...props}
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </>
  )
}

// style定義
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '.MuiDataGrid-toolbarContainer': {
    borderBottom: 'solid 1px rgba(224, 224, 224, 1)',
  },
  '.MuiDataGrid-row .MuiDataGrid-cell:not(:last-child)': {
    borderRight: 'solid 1px rgba(224, 224, 224, 1) !important',
  },
  // 列ヘッダに背景色を指定
  '.MuiDataGrid-columnHeaders': {
    backgroundColor: Colors.APP_GREEN,
    color: '#fff',
  },
}))
