import fs from 'fs'

/**
 * CSV読み込み
 * @param filePath ファイルパス
 * @returns CSVデータ
 */
export const readCsv = (filePath: string) => {
    const { parse } = require('csv-parse/sync')

    // csvファイルを読み込む
    const data = fs.readFileSync(filePath, 'utf8')
    // 先頭行をcolumnとして扱い，csvデータをparse
    return parse(data, { columns: true })
}

/**
 * CSV書き込み
 * @param filePath ファイルパス
 * @param writeData 書き込み用データ
 * @returns 
 */
export const writeCsv = (filePath: string, writeData: string) => {
    fs.writeFileSync(filePath, writeData, 'utf8')
}