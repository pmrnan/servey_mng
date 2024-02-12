/**
 * プルダウン選択肢型定義
 */
export type OptionItem = {
    value: string,
    label: string,
}

/**
 * アンケート型定義
 */
export type Servey = {
    id: string,
    categoryId: string,
    serveyName: string,
    link: string,
    limitDate: string
}

/**
 * カテゴリー型定義
 */
export type Category = {
    id: string,
    categoryName: string,
}