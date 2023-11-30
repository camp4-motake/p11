import intersect from "@alpinejs/intersect"
import Alpine from "alpinejs"
import { components } from "./components"
import { stores } from "./stores"

const main = async () => {
  window.Alpine = Alpine
  Alpine.plugin(intersect)
  await Promise.all([components(), stores()])
  Alpine.start()
}

main()
