import { Mascot } from '@/components/mascot/Mascot'
import { MascotProvider } from '@/components/mascot/MascotProvider'
import { BrowserRouter } from 'react-router'
import PageRoutes from './routes/PageRoutes'

function App() {
  return (
    <MascotProvider>
      <BrowserRouter>
        <PageRoutes />
        <Mascot />
      </BrowserRouter>
    </MascotProvider>
  )
}

export default App