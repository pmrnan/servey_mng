/**
 * 日付→文字列変換(「MM/DD」形式)
 * @param date 日付
 * @returns 日付文字列(MM/DD)
 */
export const dateToStringMmDd = (date: Date): string => {
    // 月と日は2桁で0埋め
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${month}/${day}`
}

/**
 * 日付→文字列変換(「hh時」形式)
 * @param date 日付
 * @returns 日付文字列(YYYY/MM/DD)
 */
export const dateToStringHh = (date: Date): string => {
    return `${date.getHours()}時`
}

/**
 * 曜日文字列取得
 * @param dayOfWeek 曜日(数値)
 * @returns 曜日(文字列)
 */
export const getDayOfWeekString = (dayOfWeek: number): string => {
    return ["日", "月", "火", "水", "木", "金", "土"][dayOfWeek]
}