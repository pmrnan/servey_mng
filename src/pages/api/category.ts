import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { Category } from '@/type/ServeyType'
import { readCsv } from '@/utils/CsvUtil'

/**
 * カテゴリー関連API
 * @param req   リクエスト
 * @param res   レスポンス
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<Category[] | Error | undefined>) => {
    // カテゴリーファイルパス
    const filePath = path.join(process.cwd(), 'data', 'MCategory.csv')

    // リクエスト形式によって処理を分岐
    switch (req.method) {
        case 'GET':
            // CSVファイルを読み込む
            const getResult: Category[] = readCsv(filePath)
            return res.status(200).json(getResult)
        default:
            return res.status(500).json({ name: 'error', message: 'リクエスト形式が正しくありません' })
    }
}

export default handler