import React from 'react'
import { Box, Tab, Fab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { darken } from '@mui/material/styles'
import { Add as AddIcon } from '@mui/icons-material'
import { gridClasses } from '@mui/x-data-grid'
import { Colors } from '@/const/Constants'
import AppHeader from '@/components/ui/AppHeader'
import Error from '@/components/ui/Error'
import AppGrid from '@/components/ui/AppGrid'
import AddSurvey from '@/components/models/AddSurveyDialog'
import { useSurveyList } from './SurveyListHooks'

/**
 * アンケート一覧
 */
export const SurveyList = () => {
  // アンケート一覧Hooks呼び出し
  const {
    isOpenAddServeyDialog,
    setisOpenAddServeyDialog,
    tabValue,
    handleChangeTab,
    columns,
    serveyData,
    categoryData,
    isLoading,
    error,
  } = useSurveyList()

  if (error) {
    return <Error message={error.message} />
  }

  return (
    <>
      <Box width="100%" height="98vh" sx={{ backgroundColor: Colors.APP_BACK_GROUND }}>
        <AppHeader title="社内アンケート一覧" />
        <Box m={2} sx={{ color: Colors.APP_ORANGE }}>
          {/* アンケート一覧 */}
          <TabContext value={tabValue}>
            <TabList
              onChange={handleChangeTab}
              aria-label="simple tabs example"
              variant="scrollable"
              textColor="inherit"
              TabIndicatorProps={{
                sx: { backgroundColor: Colors.APP_ORANGE },
              }}
            >
              {/* 「All」タブを表示 */}
              <Tab
                key="all"
                value="all"
                label={'All(' + serveyData?.length + ')'}
                sx={{ color: Colors.APP_ORANGE }}
              />
              {/* 全カテゴリー分のタブを表示 */}
              {categoryData?.map((cd, index) => {
                return (
                  <Tab
                    key={index}
                    value={cd.id}
                    label={
                      cd.categoryName +
                      '(' +
                      serveyData?.filter((sd) => cd.id === sd.categoryId).length +
                      ')'
                    }
                    sx={{ color: Colors.APP_ORANGE }}
                  />
                )
              })}
            </TabList>
            {/* 「All」タブの中身 */}
            <TabPanel
              key="all"
              value="all"
              children={
                <AppGrid
                  height="65vh"
                  columns={columns}
                  rows={serveyData || []}
                  loading={isLoading}
                  getRowHeight={() => 'auto'}
                  sx={{
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                  }}
                />
              }
            />
            {/* 全カテゴリー分のタブの中身 */}
            {categoryData?.map((cd, index) => {
              return (
                <>
                  <TabPanel
                    key={index}
                    value={cd.id}
                    children={
                      <AppGrid
                        key={index}
                        height="65vh"
                        columns={columns}
                        rows={serveyData?.filter((sd) => cd.id === sd.categoryId) || []}
                        loading={isLoading}
                        getRowHeight={() => 'auto'}
                        sx={{
                          [`& .${gridClasses.cell}`]: {
                            py: 1,
                          },
                        }}
                      />
                    }
                  />
                </>
              )
            })}
          </TabContext>

          {/* アンケート追加ボタン */}
          <Box
            sx={{
              '& > :not(style)': { m: 1 },
              position: 'fixed',
              bottom: '2em',
              right: '2em',
            }}
          >
            <Fab
              sx={{
                color: Colors.APP_BACK_GROUND,
                backgroundColor: Colors.APP_ORANGE,
                '&:hover': {
                  backgroundColor: darken(Colors.APP_ORANGE, 0.1),
                },
              }}
              aria-label="add"
              onClick={() => setisOpenAddServeyDialog(true)}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Box>
      </Box>

      {/* アンケート追加ダイアログ */}
      <AddSurvey
        categoryData={categoryData || []}
        isOpenAddServeyDialog={isOpenAddServeyDialog}
        closeAddServeyDialog={() => setisOpenAddServeyDialog(false)}
      />
    </>
  )
}
