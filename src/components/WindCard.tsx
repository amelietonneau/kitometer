import { KiteSurf } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Wind, MapPin } from '@phosphor-icons/react'
import { getWindDirectionText } from '@/lib/windData'
import { motion } from 'framer-motion'

interface WindCardProps {
  spot: KiteSurf
  onToggleFavorite: (id: string) => void
  onShowDetails: (spot: KiteSurf) => void
  windThreshold: number
}

export function WindCard({ spot, onToggleFavorite, onShowDetails, windThreshold }: WindCardProps) {
  const isKiteable = spot.windSpeed >= windThreshold
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-300 ${
          isKiteable 
            ? 'bg-gradient-to-br from-accent/10 to-accent/20 border-accent/30 shadow-lg' 
            : 'bg-gradient-to-br from-secondary/50 to-secondary/80 border-secondary/60'
        } hover:shadow-xl`}
        onClick={() => onShowDetails(spot)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg leading-none tracking-tight">
                {spot.name}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin size={14} className="mr-1" />
                {spot.location}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={isKiteable ? "default" : "secondary"}
                className={`font-medium uppercase text-xs tracking-wider ${
                  isKiteable 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isKiteable ? 'GO KITE!' : 'TOO LIGHT'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  onToggleFavorite(spot.id)
                }}
              >
                <Star 
                  size={16} 
                  className={spot.isFavorite ? 'fill-accent text-accent' : 'text-muted-foreground'} 
                />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold tracking-wide">
                  {Math.round(spot.windSpeed)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  knots
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {Math.round(spot.windGust)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  gusts
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Wind size={20} className="text-muted-foreground" />
              <div className="text-center">
                <div className="font-medium">
                  {getWindDirectionText(spot.windDirection)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {Math.round(spot.windDirection)}°
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Updated: {new Date(spot.lastUpdated).toLocaleTimeString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}