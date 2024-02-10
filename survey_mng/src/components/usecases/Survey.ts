import useSWR from 'swr'
import useSWRMutation from "swr/mutation";
import { getServeyList, postServey } from '@/components/repositories/Servey'
import { Servey } from '@/type/ServeyType'

const BASE_KEY = 'servey'

/**
 * アンケート一覧取得
 * @returns アンケート一覧
 */
export const useServeyData = () => {
    return useSWR<Servey[], Error>(BASE_KEY, getServeyList)
}

/**
 * アンケート追加
 * @returns アンケート一覧
 */
export const addServeyData = () => {
    return useSWRMutation<Servey[], Error>(BASE_KEY, postServey)
}
