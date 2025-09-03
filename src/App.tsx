import React, { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { KiteSurf, AppSettings } from '@/types'
import { mockKiteSurfSpots, getUpdatedWindData, calculateKiteability } from '@/lib/windData'
import { WindCard } from '@/components/WindCard'
import { WindDetailModal } from '@/components/WindDetailModal'
import { SettingsModal } from '@/components/SettingsModal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowClockwise, Star } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const defaultSettings: AppSettings = {
  windThreshold: 12,
  showFavoritesOnly: false,
  selectedSpots: []
}

function App() {
  const [spots, setSpots] = useKV<KiteSurf[]>('kite-spots', mockKiteSurfSpots)
  const [settings, setSettings] = useKV<AppSettings>('app-settings', defaultSettings)
  const [selectedSpot, setSelectedSpot] = useState<KiteSurf | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Update wind data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedData = getUpdatedWindData()
      const updatedSpots = updatedData.map(spot => {
        const existingSpot = spots.find(s => s.id === spot.id)
        return {
          ...spot,
          isKiteable: calculateKiteability(spot.windSpeed, settings.windThreshold),
          isFavorite: existingSpot?.isFavorite || false
        }
      })
      setSpots(updatedSpots)
      setLastUpdate(new Date())
    }, 5 * 60 * 1000) // 5 minutes

    return () => clearInterval(interval)
  }, [settings.windThreshold, setSpots, spots])

  // Update kiteability when threshold changes
  useEffect(() => {
    setSpots(currentSpots => currentSpots.map(spot => ({
      ...spot,
      isKiteable: calculateKiteability(spot.windSpeed, settings.windThreshold)
    })))
  }, [settings.windThreshold, setSpots])

  const handleSettingsChange = (newSettings: Partial<AppSettings>) => {
    setSettings({ ...settings, ...newSettings })
  }

  const handleToggleFavorite = (spotId: string) => {
    setSpots(currentSpots => 
      currentSpots.map(spot => 
        spot.id === spotId 
          ? { ...spot, isFavorite: !spot.isFavorite }
          : spot
      )
    )
  }

  const handleShowDetails = (spot: KiteSurf) => {
    setSelectedSpot(spot)
    setIsDetailModalOpen(true)
  }

  const handleRefresh = () => {
    const updatedData = getUpdatedWindData()
    const updatedSpots = updatedData.map(spot => {
      const existingSpot = spots.find(s => s.id === spot.id)
      return {
        ...spot,
        isKiteable: calculateKiteability(spot.windSpeed, settings.windThreshold),
        isFavorite: existingSpot?.isFavorite || false
      }
    })
    setSpots(updatedSpots)
    setLastUpdate(new Date())
  }

  const filteredSpots = settings.showFavoritesOnly 
    ? spots.filter(spot => spot.isFavorite)
    : spots

  const kiteableSpots = filteredSpots.filter(spot => spot.isKiteable).length
  const totalSpots = filteredSpots.length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Kitometer
          </h1>
          <p className="text-muted-foreground text-lg">
            Netherlands Kitesurfing Wind Monitor
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-card rounded-lg border"
        >
          <div className="flex items-center gap-4">
            <Badge variant={kiteableSpots > 0 ? "default" : "secondary"} className="text-sm">
              {kiteableSpots} of {totalSpots} spots are kiteable
            </Badge>
            {settings.showFavoritesOnly && (
              <Badge variant="outline" className="text-sm flex items-center gap-1">
                <Star size={12} className="fill-current" />
                Favorites Only
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Updated: {lastUpdate.toLocaleTimeString()}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRefresh}
              className="gap-2"
            >
              <ArrowClockwise size={16} />
              Refresh
            </Button>
            <SettingsModal 
              settings={settings}
              onSettingsChange={handleSettingsChange}
            />
          </div>
        </motion.div>

        {/* Spots Grid */}
        {filteredSpots.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">
              No spots to display. {settings.showFavoritesOnly ? 'Add some favorites or disable the favorites filter.' : ''}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <WindCard
                  spot={spot}
                  onToggleFavorite={handleToggleFavorite}
                  onShowDetails={handleShowDetails}
                  windThreshold={settings.windThreshold}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Detail Modal */}
        <WindDetailModal
          spot={selectedSpot}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          windThreshold={settings.windThreshold}
        />
      </div>
    </div>
  )
}

export default App