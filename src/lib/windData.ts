import { KiteSurf } from '@/types'

// Mock data for Netherlands kitesurfing spots with realistic wind conditions
export const mockKiteSurfSpots: KiteSurf[] = [
  {
    id: 'ijmuiden',
    name: 'IJmuiden',
    location: 'North Sea Coast',
    latitude: 52.4597,
    longitude: 4.6095,
    windSpeed: 18,
    windDirection: 245,
    windGust: 24,
    lastUpdated: new Date().toISOString(),
    isKiteable: true,
    isFavorite: false,
  },
  {
    id: 'scheveningen',
    name: 'Scheveningen',
    location: 'South Holland',
    latitude: 52.1038,
    longitude: 4.2776,
    windSpeed: 12,
    windDirection: 210,
    windGust: 16,
    lastUpdated: new Date().toISOString(),
    isKiteable: false,
    isFavorite: true,
  },
  {
    id: 'zandvoort',
    name: 'Zandvoort',
    location: 'North Holland',
    latitude: 52.3676,
    longitude: 4.5339,
    windSpeed: 22,
    windDirection: 270,
    windGust: 28,
    lastUpdated: new Date().toISOString(),
    isKiteable: true,
    isFavorite: true,
  },
  {
    id: 'brouwersdam',
    name: 'Brouwersdam',
    location: 'Zeeland',
    latitude: 51.8294,
    longitude: 3.8719,
    windSpeed: 15,
    windDirection: 225,
    windGust: 19,
    lastUpdated: new Date().toISOString(),
    isKiteable: true,
    isFavorite: false,
  },
  {
    id: 'workum',
    name: 'Workum',
    location: 'Friesland',
    latitude: 52.9811,
    longitude: 5.4486,
    windSpeed: 8,
    windDirection: 180,
    windGust: 12,
    lastUpdated: new Date().toISOString(),
    isKiteable: false,
    isFavorite: false,
  },
  {
    id: 'medemblik',
    name: 'Medemblik',
    location: 'IJsselmeer',
    latitude: 52.7712,
    longitude: 5.1055,
    windSpeed: 16,
    windDirection: 255,
    windGust: 21,
    lastUpdated: new Date().toISOString(),
    isKiteable: true,
    isFavorite: false,
  }
]

// Function to simulate real-time wind updates
export const getUpdatedWindData = (): KiteSurf[] => {
  return mockKiteSurfSpots.map(spot => ({
    ...spot,
    windSpeed: Math.max(5, spot.windSpeed + (Math.random() - 0.5) * 6),
    windGust: Math.max(8, spot.windGust + (Math.random() - 0.5) * 8),
    windDirection: (spot.windDirection + (Math.random() - 0.5) * 30) % 360,
    lastUpdated: new Date().toISOString(),
  }))
}

// Calculate if spot is kiteable based on wind speed and threshold
export const calculateKiteability = (windSpeed: number, threshold: number): boolean => {
  return windSpeed >= threshold
}

// Convert wind direction degrees to compass direction
export const getWindDirectionText = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}