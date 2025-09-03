import { Button } from '@/components/ui/button'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Gear, Star } from '@phosphor-icons/react'
import { AppSettings } from '@/types'

interface SettingsModalProps {
  settings: AppSettings
  onSettingsChange: (settings: Partial<AppSettings>) => void
}

export function SettingsModal({ settings, onSettingsChange }: SettingsModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Gear size={16} />
          Settings
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kitometer Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Wind Threshold */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Minimum Wind Speed for Kiting
            </Label>
            <div className="space-y-2">
              <Slider
                value={[settings.windThreshold]}
                onValueChange={(value) => onSettingsChange({ windThreshold: value[0] })}
                max={25}
                min={8}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>8 knots</span>
                <span className="font-medium text-foreground">
                  {settings.windThreshold} knots
                </span>
                <span>25 knots</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Adjust based on your kite size and skill level
            </p>
          </div>
          
          {/* Show Favorites Only */}
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Star size={14} />
                Show Favorites Only
              </Label>
              <p className="text-xs text-muted-foreground">
                Display only your starred locations
              </p>
            </div>
            <Switch
              checked={settings.showFavoritesOnly}
              onCheckedChange={(checked) => onSettingsChange({ showFavoritesOnly: checked })}
            />
          </div>
          
          {/* Info Section */}
          <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-semibold">Wind Speed Guide</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>• 8-12 knots: Light winds, large kites needed</div>
              <div>• 13-18 knots: Perfect conditions for most riders</div>
              <div>• 19-25 knots: Strong winds, smaller kites recommended</div>
              <div>• 25+ knots: Expert conditions only</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}