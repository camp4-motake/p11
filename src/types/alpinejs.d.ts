/* eslint-disable no-var */
import { Alpine as AlpineType } from "alpinejs"

declare global {
  interface Window {
    Alpine: AlpineType
  }
}

declare module "@alpinejs/intersect"
declare module "@alpinejs/persist"
