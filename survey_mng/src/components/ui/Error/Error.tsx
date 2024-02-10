export type ErrorProps = {
  message: string
}

/**
 * エラー発生画面
 * @param message エラーメッセージ
 */
const Error = ({ message }: ErrorProps) => {
  return <div>エラーが発生しました。詳細：{message}</div>
}

export default Error
