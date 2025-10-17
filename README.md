# 💎 AI Sticker Gem

A cutting-edge web application for generating custom AI-powered stickers using Google's Gemini 2.5 Flash Image Preview model. Built with React, TypeScript, Three.js, and Tailwind CSS.

## ✨ Features

### 🎭 **Comprehensive Expression System**
- 16 unique expressions with emoji icons (HEY, Laughing, In Love, Angry, etc.)
- Multi-select capability for batch generation
- Detailed expression descriptions for optimal AI results

### 🎨 **Advanced Artistic Controls**
- **14 Artistic Styles**: Cartoon Vector, Sticker Style, Kawaii, Chibi, 3D Render, and more
- **3 Color Palettes**: Vibrant, Pastel, Monochrome
- **Smart Style Compatibility**: Automatic filtering prevents incompatible combinations
- **Line & Shading Styles**: Dynamically adjusted based on artistic style
- **Composition Options**: Headshot/Bust, Half-Body, Full-Body

### 🚀 **Dual Input Modes**
- **Text-to-Image**: Describe your character with detailed prompts
- **Image Upload**: (Coming soon) Upload reference images

### 🎬 **Animation Support** (Planned)
- 10 animation styles: Bouncing, Wiggle, Spinning, Floating, and more
- Custom animation prompts

### 🌟 **Immersive 3D UI**
- Scroll-driven 3D animations using Framer Motion
- Holographic navigation tabs with hover effects
- Custom shader-based AI Core visualization
- Particle system for depth and atmosphere

### 💾 **Results Management**
- Responsive grid display (2-4 columns)
- One-click download for each sticker
- Timestamp tracking
- Credit system with auto-refund on errors

## 🏗️ Project Structure

```
ai-sticker-gem/
├── src/
│   ├── compliance/
│   │   └── components/
│   │       ├── 3d/
│   │       │   ├── AiCore3D.tsx          # Custom shader AI core
│   │       │   ├── Header3D.tsx          # 3D navigation header
│   │       │   ├── LandingPage3D.tsx     # Animated landing page
│   │       │   └── shared/
│   │       │       ├── ParticleSystem.tsx
│   │       │       └── Tab3D.tsx
│   │       ├── shared/
│   │       │   ├── ExpressionButton.tsx  # Reusable expression button
│   │       │   └── Select.tsx            # Reusable dropdown
│   │       ├── ActionFooter.tsx          # Generate button & credits
│   │       ├── ControlPanel.tsx          # Main settings panel
│   │       ├── StickerPreview.tsx        # Results display
│   │       └── StickerStudioWorkflow.tsx # Main workflow layout
│   ├── hooks/
│   │   ├── useGeneration.ts              # Generation orchestration
│   │   └── useScroll3D.ts                # Scroll-to-3D animations
│   ├── state/
│   │   ├── reducers/
│   │   │   └── generationReducer.ts      # State reducer
│   │   ├── initialState.ts               # Default state
│   │   └── types.ts                      # TypeScript types
│   ├── utils/
│   │   ├── services/
│   │   │   └── geminiService.ts          # Gemini API integration
│   │   └── constants.ts                  # App constants & compatibility matrix
│   ├── App.tsx                           # Root component
│   ├── main.tsx                          # React entry point
│   └── index.css                         # Global styles
├── index.html                            # HTML template
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── vite.config.ts                        # Vite config
├── tailwind.config.js                    # Tailwind config
└── postcss.config.js                     # PostCSS config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- A Google AI Studio API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-sticker-gem
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure API Key**
   
   The API key is currently set as an empty string in `src/utils/services/geminiService.ts`. 
   
   **Option 1: Environment Variable (Recommended)**
   - Create a `.env` file in the root:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```
   - Update `geminiService.ts`:
     ```typescript
     const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
     ```
   
   **Option 2: Direct Configuration (Development Only)**
   - Edit `src/utils/services/geminiService.ts`:
     ```typescript
     const apiKey = "your_api_key_here";
     ```
   
   ⚠️ **Never commit your API key to version control!**

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🎮 Usage

1. **Choose Input Mode**
   - Select "Text Prompt" to describe your character
   - Enter subject (e.g., "A cute cat") and characteristics (e.g., "wearing a hat, blue eyes")

2. **Select Expressions**
   - Click multiple expression buttons (e.g., HEY, Laughing, Wink)
   - Selected expressions will be highlighted in purple

3. **Configure Style**
   - Choose an **Artistic Style** (e.g., Cartoon Vector)
   - Line and Shading styles will automatically filter to compatible options
   - Select **Color Palette**, **Composition**, etc.

4. **Set Pack Size & Resolution**
   - Pack Size: Number of stickers to generate (1-20)
   - Resolution: 512px, 768px, or 1024px

5. **Generate!**
   - Click "Generate" button
   - Credits will be deducted (refunded on error)
   - Watch the progress as each sticker generates
   - Download your stickers individually

## 🧠 How It Works

### Prompt Engineering
The app constructs detailed prompts for the Gemini API:
- **Identity Anchor**: Subject description and characteristics
- **Expression Details**: Rich descriptions from EXPRESSIONS_MAP
- **Artistic Parameters**: Style, palette, lines, shading, composition
- **Quality Controls**: Transparent background, negative prompts

### Style Compatibility Matrix
Prevents artistic inconsistencies:
- **Photorealistic** → Only "None" lines, "Gradient" shading
- **Lineart** → Line-focused, "None" shading
- **3D Render** → "None" lines, "Gradient" shading
- Auto-corrects when user changes artistic style

### State Management
Uses React's `useReducer` for predictable state updates:
- Settings configuration
- Expression selection
- Credit management
- Loading states
- Results storage

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion, Framer Motion 3D
- **Styling**: Tailwind CSS with custom scrollbar
- **Build Tool**: Vite
- **AI Model**: Google Gemini 2.5 Flash Image Preview
- **Type Safety**: Full TypeScript coverage

## 📦 Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 🎨 Customization

### Adding New Expressions
Edit `src/utils/constants.ts`:
```typescript
export const EXPRESSIONS = [
  { name: 'Your Expression', icon: '🎭' },
  // ...
];

export const EXPRESSIONS_MAP = new Map([
  ['Your Expression', 'Detailed description for AI prompt'],
  // ...
]);
```

### Adding Artistic Styles
Update `constants.ts` and add compatibility rules:
```typescript
export const STYLE_COMPATIBILITY: Record<ArtisticStyle, ...> = {
  'Your New Style': { 
    lines: ['Bold', 'Smooth'], 
    shades: ['Flat', 'Gradient'] 
  },
  // ...
};
```

### Adjusting Credit Costs
Modify the cost calculation in `src/hooks/useGeneration.ts` or add per-resolution pricing.

## 🐛 Troubleshooting

### API Key Issues
- Ensure your API key is correctly set
- Check browser console for error messages
- Verify API key has access to Gemini 2.5 Flash Image Preview model

### Generation Failures
- Credits are automatically refunded on errors
- Check console for detailed error messages
- Verify internet connection
- Ensure at least one expression is selected

### 3D Performance Issues
- Reduce particle count in `LandingPage3D.tsx` (default: 200)
- Disable 3D effects on lower-end devices

## 📄 License

This project is provided as-is for educational and development purposes.

## 🙏 Acknowledgments

- Google Gemini AI for image generation
- Three.js community for 3D web graphics
- Tailwind CSS for rapid UI development
- React Three Fiber for React + Three.js integration

---

Built with ❤️ using AI-powered creativity

