# Kitometer - Netherlands Kitesurfing Wind Monitor

Kitometer helps kitesurfers in the Netherlands instantly check if wind conditions are suitable for kitesurfing at popular spots across the country.

**Experience Qualities**:
1. **Immediate** - Users get wind status at a glance without scrolling or searching
2. **Confident** - Clear yes/no indicators with supporting data give users confidence in their decision
3. **Focused** - Single-purpose tool that eliminates distractions and gets straight to the point

**Complexity Level**: Light Application (multiple features with basic state)
- Shows real-time wind data for multiple locations with simple filtering and favorites functionality

## Essential Features

### Wind Status Display
- **Functionality**: Shows current wind conditions for major Dutch kitesurfing spots
- **Purpose**: Instant decision-making for kitesurfing viability
- **Trigger**: App loads automatically with current conditions
- **Progression**: App loads → Wind data fetches → Status cards display → Color-coded go/no-go indicators
- **Success criteria**: Users can determine kitesurfing viability within 3 seconds of app load

### Spot Selection
- **Functionality**: Filter and favorite specific kitesurfing locations
- **Purpose**: Focus on personally relevant locations
- **Trigger**: User clicks filter or star icon
- **Progression**: User selects spots → App remembers preferences → Only selected spots show
- **Success criteria**: Users can customize their spot list and it persists between sessions

### Wind Threshold Settings
- **Functionality**: Customize minimum wind speed for kitesurfing
- **Purpose**: Personal preference accommodation (different kite sizes, skill levels)
- **Trigger**: User opens settings panel
- **Progression**: Settings icon → Slider appears → User adjusts threshold → Auto-saves
- **Success criteria**: Spot status updates immediately when threshold changes

### Detailed Wind Info
- **Functionality**: Tap spot for detailed wind metrics (gusts, direction, trends)
- **Purpose**: Advanced planning and safety considerations
- **Trigger**: User taps on a spot card
- **Progression**: Tap spot → Detailed modal opens → Shows comprehensive wind data → Close to return
- **Success criteria**: Detailed view provides wind direction, gust info, and 3-hour forecast

## Edge Case Handling
- **No internet connection**: Show cached data with "last updated" timestamp and offline indicator
- **API failures**: Display error state with retry button and fallback to cached data
- **No GPS/location**: Default to showing all Netherlands spots without location-based sorting
- **Loading states**: Show skeleton cards while fetching data to maintain layout stability

## Design Direction
The design should feel like a professional weather instrument - clean, technical, and trustworthy with a focus on outdoor sports aesthetics that convey wind and movement.

## Color Selection
Complementary (opposite colors) - Using blues for calm/low wind and oranges for active/good wind conditions to create clear visual distinction between kiteable and non-kiteable conditions.

- **Primary Color**: Deep Ocean Blue (oklch(0.45 0.15 240)) - Communicates water, reliability, and calm assessment
- **Secondary Colors**: Light Sky Blue (oklch(0.85 0.08 240)) for backgrounds and low wind states  
- **Accent Color**: Vibrant Orange (oklch(0.70 0.18 45)) - High-energy kiting conditions and call-to-action elements
- **Foreground/Background Pairings**: 
  - Background (Light Blue oklch(0.96 0.02 240)): Dark Blue text (oklch(0.25 0.12 240)) - Ratio 8.2:1 ✓
  - Primary (Deep Blue oklch(0.45 0.15 240)): White text (oklch(1 0 0)) - Ratio 6.8:1 ✓
  - Accent (Orange oklch(0.70 0.18 45)): White text (oklch(1 0 0)) - Ratio 5.1:1 ✓

## Font Selection
Typography should feel modern and technical like weather instrumentation, with excellent readability for quick scanning of wind data.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Spot Names): Inter Semibold/20px/normal spacing  
  - H3 (Wind Speed): Inter Bold/24px/wide letter spacing for prominence
  - Body (Details): Inter Regular/14px/normal spacing
  - Caption (Status): Inter Medium/12px/uppercase/wide spacing

## Animations
Subtle functional animations that reinforce the wind theme - gentle floating motions for cards and smooth color transitions that feel like shifting wind conditions.

- **Purposeful Meaning**: Gentle movements suggest wind flow, with status changes animated to feel like natural weather shifts
- **Hierarchy of Movement**: Wind speed numbers get subtle emphasis animations, status changes flow smoothly, loading states pulse gently

## Component Selection
- **Components**: Card for spot display, Badge for status indicators, Button for actions, Dialog for detailed views, Slider for settings, Switch for favorites
- **Customizations**: Custom wind direction indicator component, gradient backgrounds for wind status cards
- **States**: Cards have hover states with gentle elevation, buttons show clear pressed states, status badges have distinct color coding
- **Icon Selection**: Wind icons from Phosphor, location pins, settings gear, star for favorites
- **Spacing**: Consistent 16px padding on cards, 8px gaps between elements, 24px margins between sections
- **Mobile**: Single column card layout, larger touch targets, collapsible filters, swipe gestures for detailed views