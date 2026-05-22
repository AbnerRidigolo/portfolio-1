import './index.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLenis, scrollToTop } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProjectsPage from './pages/ProjectsPage'
import ChatPage from './pages/ChatPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { scrollToTop(true) }, [pathname])
  return null
}

export default function App() {
  useLenis()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="relative min-h-screen bg-black text-white">
        <div className="grain-overlay" aria-hidden="true" />
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projetos" element={<ProjectsPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
