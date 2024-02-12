import React from 'react'
import { GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid'
import { Link } from '@mui/material'
import { dateToStringMmDd, dateToStringHh, getDayOfWeekString } from '@/utils/DateUtil'
import { useServeyData } from '@/components/usecases/Survey'
import { useCategoryData } from '@/components/usecases/Category'

/**
 * アンケート一覧Hooks
 */
export const useSurveyList = () => {
  // アンケート追加ダイアログ開閉
  const [isOpenAddServeyDialog, setisOpenAddServeyDialog] = React.useState<boolean>(false)
  // 現在のタブ情報
  const [tabValue, setTabValue] = React.useState<string>('all')

  // カテゴリーを取得
  const { data: categoryData, isLoading: categoryLoading, error: categoryError } = useCategoryData()
  // アンケート一覧を取得
  const { data: serveyData, isLoading: serveyLoading, error: serveyError } = useServeyData()

  // タブ切り替え時
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue)
  }

  // アンケートリンクセル定義
  const serveyLinkCell = (params: GridRenderCellParams) => {
    return <Link href={params.row.link}>{params.value}</Link>
  }
  // カラム定義
  const columns: GridColDef[] = [
    {
      field: 'serveyName',
      headerName: 'アンケート',
      sortable: false,
      disableColumnMenu: true,
      flex: 0.5,
      renderCell: serveyLinkCell,
    },
    {
      field: 'limitDate',
      headerName: '回答期限',
      sortable: false,
      disableColumnMenu: true,
      flex: 0.5,
      valueFormatter: (params: GridValueFormatterParams) => {
        const limitDate = dateToStringMmDd(new Date(params.value))
        const limitTime = dateToStringHh(new Date(params.value))
        const dayOfWeek = getDayOfWeekString(new Date(params.value).getDay())
        return `${limitDate}（${dayOfWeek}）${limitTime}`
      },
    },
  ]

  return {
    isOpenAddServeyDialog,
    setisOpenAddServeyDialog,
    tabValue,
    handleChangeTab,
    columns,
    serveyData,
    categoryData,
    isLoading: categoryLoading || serveyLoading,
    error: categoryError || serveyError,
  }
}
