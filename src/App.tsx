// src/App.tsx
import { LandingPage3D } from './compliance/components/3d/LandingPage3D';
import { StickerStudioWorkflow } from './compliance/components/StickerStudioWorkflow';

function App() {
  return (
    <div className="bg-gray-900">
      {/* The Landing Page takes up the first "screen" */}
      <section style={{ height: '100vh' }}>
        <LandingPage3D />
      </section>

      {/* The main application workflow is the second "screen" */}
      <section style={{ height: 'calc(100vh - 5rem)', margin: '2.5rem' }}>
        <StickerStudioWorkflow />
      </section>
    </div>
  );
}

export default App;

