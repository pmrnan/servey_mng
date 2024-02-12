import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { Servey } from '@/type/ServeyType'
import { readCsv, writeCsv } from '@/utils/CsvUtil'

/**
 * アンケート関連API
 * @param req   リクエスト
 * @param res   レスポンス
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<Servey[] | Error | undefined>) => {
    // アンケートファイルパス
    const filePath = path.join(process.cwd(), 'data', 'TServey.csv')
    // CSVデータ→文字列変換
    const { stringify } = require('csv-stringify/sync')

    switch (req.method) {
        case 'GET':
            // CSVファイルを読み込む
            const getResult: Servey[] = readCsv(filePath)
            return res.status(200).json(getResult)
        case 'POST':
            // データ追加前のCSVファイルを読み込む
            const postBeforeData: Servey[] = readCsv(filePath)

            // 回答期限が過ぎているデータは削除
            const nowTime = new Date().getTime()
            const postNewData = postBeforeData.filter((d: Servey) => {
                const limitDate = new Date(d.limitDate).getTime()
                return limitDate >= nowTime
            })

            // 新規データを追加
            postNewData.push(req.body);

            // オブジェクトのプロパティを先頭行に記述し，csvデータに変換
            const postWriteData = stringify(postNewData, { header: true });

            // CSVファイルへ書き込み
            writeCsv(filePath, postWriteData)

            // データ追加後のCSVファイルを読み込む
            const postResult: Servey[] = readCsv(filePath);
            return res.status(200).json(postResult)
        default:
            return res.status(500).json({ name: 'error', message: 'リクエスト形式が正しくありません。' })
    }
}

export default handler