const BASE_URL = 'api'

/**
 * アンケート一覧取得
 * GET servey
 */
export const getServeyList = async () => {
    const url = `${BASE_URL}/servey`
    const res = await fetch(url);

    // ステータスコードが200でない場合
    if (res.status !== 200) {
        const error: Error = await res.json()
        throw new Error(error.message)
    }

    return res.json();
}

/**
 * アンケート追加
 * POST servey
 * @param key   エンドポイント
 * @param arg   追加要データ
 * @returns 追加後のアンケート一覧
 */
export const postServey = async (key: string, { arg }: { arg: any }) => {
    const url = `${BASE_URL}/${key}`
    const req = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg)
    }
    const res = await fetch(url, req);

    // ステータスコードが200でない場合
    if (res.status !== 200) {
        const error: Error = await res.json()
        throw new Error(error.message)
    }

    return res.json();
}
