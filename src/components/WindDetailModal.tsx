import { KiteSurf } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Wind, MapPin, Clock } from '@phosphor-icons/react'
import { getWindDirectionText } from '@/lib/windData'

interface WindDetailModalProps {
  spot: KiteSurf | null
  isOpen: boolean
  onClose: () => void
  windThreshold: number
}

export function WindDetailModal({ spot, isOpen, onClose, windThreshold }: WindDetailModalProps) {
  if (!spot) return null
  
  const isKiteable = spot.windSpeed >= windThreshold
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold">{spot.name}</div>
              <div className="flex items-center text-sm text-muted-foreground font-normal mt-1">
                <MapPin size={14} className="mr-1" />
                {spot.location}
              </div>
            </div>
            <Badge 
              variant={isKiteable ? "default" : "secondary"}
              className={`font-medium uppercase text-sm tracking-wider ${
                isKiteable 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {isKiteable ? 'GO KITE!' : 'TOO LIGHT'}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Current Conditions */}
          <div>
            <h4 className="font-semibold mb-3">Current Conditions</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">
                  {Math.round(spot.windSpeed)}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Wind Speed (knots)
                </div>
              </div>
              
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold mb-1">
                  {Math.round(spot.windGust)}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  Gusts (knots)
                </div>
              </div>
            </div>
          </div>
          
          {/* Wind Direction */}
          <div>
            <h4 className="font-semibold mb-3">Wind Direction</h4>
            <div className="bg-secondary/50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind size={24} className="text-primary" />
                  <div>
                    <div className="text-2xl font-bold">
                      {getWindDirectionText(spot.windDirection)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(spot.windDirection)}° from North
                    </div>
                  </div>
                </div>
                <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center relative">
                  <div 
                    className="w-8 h-0.5 bg-primary absolute"
                    style={{ 
                      transform: `rotate(${spot.windDirection}deg)`,
                      transformOrigin: 'left center'
                    }}
                  />
                  <div className="w-2 h-2 bg-primary rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Conditions Analysis */}
          <div>
            <h4 className="font-semibold mb-3">Conditions Analysis</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Minimum wind for kiting:</span>
                <span className="font-medium">{windThreshold} knots</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Current wind:</span>
                <span className={`font-medium ${isKiteable ? 'text-accent' : 'text-muted-foreground'}`}>
                  {Math.round(spot.windSpeed)} knots
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Wind variability:</span>
                <span className="font-medium">
                  ±{Math.round(spot.windGust - spot.windSpeed)} knots
                </span>
              </div>
            </div>
          </div>
          
          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t">
            <Clock size={14} />
            Last updated: {new Date(spot.lastUpdated).toLocaleString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}