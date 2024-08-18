declare module '@alpinejs/intersect';
declare module '@alpinejs/persist';

declare module '*.{data,store,bind}.ts' {
  const value: () => void
  export default value
}
