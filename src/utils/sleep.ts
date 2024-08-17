/**
 * ユーティリティ：指定ミリ秒待ってから関数を実行
 *
 * 例:
 * sleep(500).then(callback);
 *
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));
