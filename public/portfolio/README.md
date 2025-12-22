# Portfolio Images

Place your portfolio project screenshots here.

## Required Images:

1. **randy-tree-service.jpg** (or .png) - Screenshot of Randy's Tree Service website
2. **mia-bella-salon.jpg** (or .png) - Screenshot of Mia Bella Salon website/review system

## Image Guidelines:

- **Recommended size**: 800x600px or similar 4:3 ratio
- **Format**: JPG or PNG
- **File names**: Use lowercase with hyphens (e.g., `randy-tree-service.jpg`)
- **Optimization**: Compress images for web to keep them under 500KB each

## How to Add Images:

1. Place your image files in this folder (`public/portfolio/`)
2. Update the portfolio cards in `app/page.tsx`:

```tsx
// For Randy's Tree Service:
imagePath="/portfolio/randy-tree-service.jpg"

// For Mia Bella Salon:
imagePath="/portfolio/mia-bella-salon.jpg"
```

## Example:

```tsx
<PortfolioCard
  title="Randy's Tree Service"
  ...other props...
  projectUrl="https://randy-tree-construction.vercel.app/"
  imagePath="/portfolio/randy-tree-service.jpg"  // Add this line
/>
```

The component will automatically show the image if the path is provided, otherwise it will show the placeholder.
