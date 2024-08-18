/**
 * ユーティリティ：指定ミリ秒待ってから関数を実行
 *
 * 例:
 * sleep(500).then(callback);
 *
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(() => resolve(null), ms))
}
