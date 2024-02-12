import { Servey } from '@/type/ServeyType'
import { dateToStringMmDd, dateToStringHh, getDayOfWeekString } from '@/utils/DateUtil'

export const useShareTemplete = (shareData: Servey): string => {
    const url = window.location.origin
    const limitDate = dateToStringMmDd(new Date(shareData.limitDate))
    const limitTime = dateToStringHh(new Date(shareData.limitDate))
    const dayOfWeek = getDayOfWeekString(new Date(shareData.limitDate).getDay())
    return `お疲れ様です。\n以下アンケートの回答をお願いいたします。\n\n【回答期限】\n\u3000${limitDate}（${dayOfWeek}）  ${limitTime}まで\n【アンケート名】\n\u3000${shareData.serveyName}\n【Googleフォームリンク】\n\u3000${shareData.link}\n\n※アンケート一覧は↓から\n\u3000${url}`
}