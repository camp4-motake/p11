import intersect from "@alpinejs/intersect"
import Alpine from "alpinejs"
import "./scripts/alpinejs"

window.Alpine = Alpine
Alpine.plugin(intersect)
Alpine.start()
