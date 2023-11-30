import modules from "./**/*.component.ts"

export const components = async () => {
  await Promise.all(Object.values(modules).map((mod) => mod?.default()))
}
