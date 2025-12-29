export function usePathJoin(...paths) {
    return paths
        .map((path) => path?.replace(/\/+$/, ''))
        .join('/')
        .replace(/\/{2,}/g, '/');
}
