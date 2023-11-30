export async function components() {
  const modules = await import("./**/*.component.ts")
  await Promise.all(Object.values(modules).map((mod) => mod()))
}
