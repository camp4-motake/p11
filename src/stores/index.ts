import modules from "./**/*.store.ts"

export const stores = async () => {
  await Promise.all(Object.values(modules).map((mod) => mod.default()))
}
