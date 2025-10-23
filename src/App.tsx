import { Mascot } from '@/components/mascot/Mascot'
import { MascotProvider } from '@/components/mascot/MascotProvider'
import { SceneProvider } from '@/context/SceneContext' // ← import your SceneProvider
import { BrowserRouter } from 'react-router'
import PageRoutes from './routes/PageRoutes'

function App() {
  return (
    <SceneProvider>
      <MascotProvider>
        <BrowserRouter>
          <PageRoutes />
          <Mascot />
        </BrowserRouter>
      </MascotProvider>
    </SceneProvider>
  )
}

export default App