export interface KiteSurf {
  id: string
  name: string
  location: string
  latitude: number
  longitude: number
  windSpeed: number
  windDirection: number
  windGust: number
  lastUpdated: string
  isKiteable: boolean
  isFavorite: boolean
}

export interface WindThresholds {
  min: number
  max: number
}

export interface AppSettings {
  windThreshold: number
  showFavoritesOnly: boolean
  selectedSpots: string[]
}