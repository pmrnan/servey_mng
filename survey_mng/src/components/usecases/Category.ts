import useSWR from 'swr'
import { Category } from '@/type/ServeyType'
import { getCategory } from '@/components/repositories/Category'

const BASE_KEY = 'category'

/**
 * 全カテゴリー取得
 * @returns 全カテゴリー
 */
export const useCategoryData = () => {
    return useSWR<Category[], Error>(BASE_KEY, getCategory)
}