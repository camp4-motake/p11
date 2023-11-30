export async function stores() {
  const modules = await import("./**/*.store.ts")
  await Promise.all(Object.values(modules).map((mod) => mod()))
}
