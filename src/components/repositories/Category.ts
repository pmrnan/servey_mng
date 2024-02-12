const BASE_URL = 'api'

/**
 * 全カテゴリー取得
 * GET category
 */
export const getCategory = async () => {
    const url = `${BASE_URL}/category`

    const res = await fetch(url);

    // ステータスコードが200でない場合
    if (res.status !== 200) {
        const error: Error = await res.json()
        throw new Error(error.message)
    }

    return res.json();
}