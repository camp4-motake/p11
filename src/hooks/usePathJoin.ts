export function usePathJoin(...paths: string[]) {
  return paths
    .map((path) => path?.replace(/\/+$/, ''))
    .join('/')
    .replace(/\/{2,}/g, '/');
}
