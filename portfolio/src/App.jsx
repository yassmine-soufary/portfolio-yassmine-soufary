import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import ProjectCase from './pages/ProjectCase'
import NotFound from './pages/NotFound'
import Cursor from './components/Cursor'
import CursorParticleTrail from './components/CursorParticleTrail'
import CommandPalette from './components/CommandPalette'
import RecruiterModal from './components/RecruiterModal'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="noise-overlay">
          <Cursor />
          <CursorParticleTrail />
          <CommandPalette />
          <RecruiterModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectCase />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
