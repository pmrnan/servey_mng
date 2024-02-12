import * as React from 'react'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import SurveyList from '@/components/models/SurveyList'

/**
 * 初期表示
 */
const MyApp = () => {
  return (
    <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <React.Fragment>
        <Head>
          <title>社内アンケート一覧</title>
        </Head>
        <SurveyList />
      </React.Fragment>
    </SnackbarProvider>
  )
}

export default MyApp
