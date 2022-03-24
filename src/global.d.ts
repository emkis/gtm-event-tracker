import type { EventProperties } from './data-layer'

declare global {
  interface Window {
    dataLayer: EventProperties[]
  }
}
