# Ragsites - AI Automation Agency Landing Page

A high-performance, cyberpunk-themed landing page built for an AI automation agency. Features interactive demos, glassmorphism design, and optimized for Vercel deployment.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Features

### Interactive Demo Components

1. **AI Voice Receptionist (AudioCard)**
   - Custom audio player with visualizer bars
   - Play/pause controls
   - Progress bar with seek functionality
   - Animated visualizer that responds to playback

2. **Lead Capture Chatbot (ChatDemo)**
   - Animated chat simulation
   - Auto-typing conversation loop
   - iPhone-style message bubbles
   - Typing indicator animation

3. **Reputation Engine (ReputationFlow)**
   - Animated workflow visualization
   - Step-by-step process display
   - Email preview card
   - Visual progress indicators

### Other Sections

- Hero section with gradient effects
- Features showcase
- Portfolio cards with image placeholders
- Pricing comparison table
- Call-to-action sections
- Responsive footer

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your audio file:
   - Place an MP3 file at `public/audio/sample.mp3`
   - This is for the AI Voice Receptionist demo

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
ragsites_website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── AudioCard.tsx       # AI Voice demo
│   ├── ChatDemo.tsx        # Chatbot simulation
│   ├── ReputationFlow.tsx  # Review automation flow
│   ├── PortfolioCard.tsx   # Portfolio item
│   └── PricingComparison.tsx # Pricing table
├── public/
│   └── audio/
│       └── sample.mp3      # (Add your audio file here)
└── tailwind.config.ts      # Tailwind configuration
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the cyberpunk color scheme:

```typescript
colors: {
  'cyber-black': '#0a0a0a',
  'cyber-gray': '#1a1a1a',
  'cyber-cyan': '#00f0ff',
  'cyber-purple': '#a855f7',
}
```

### Content

- Update text in `app/page.tsx`
- Modify component content in individual component files
- Replace placeholder images in portfolio section

## Performance Optimizations

- Minimal use of Framer Motion (only where needed)
- Lightweight components
- Optimized for Vercel Free Tier
- CSS-based animations where possible
- Lazy loading of heavy components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy automatically

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private project for Ragsites.

## Notes

- The audio player requires a valid MP3 file at `/audio/sample.mp3`
- All animations are optimized for performance
- Components are modular and reusable
- Fully responsive design
