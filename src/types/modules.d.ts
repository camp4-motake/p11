declare module "@alpinejs/intersect"
declare module "@alpinejs/persist"

declare module "*.component.ts" {
  const value: () => void
  export default value
}

declare module "*.store.ts" {
  const value: () => void
  export default value
}
