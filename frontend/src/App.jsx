import { useState } from 'react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'

function App() {
  const [view, setView] = useState('landing') // 'landing', 'loading', 'dashboard'
  const [analysisData, setAnalysisData] = useState(null)

  return (
    <div className="min-h-screen bg-dark-900 font-sans text-gray-100">
      {view === 'landing' && (
        <LandingPage setView={setView} setAnalysisData={setAnalysisData} />
      )}
      
      {view === 'loading' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-mono text-neon-cyan tracking-widest animate-pulse">
            ANALYZING TOPOLOGY...
          </h2>
          <p className="text-gray-500 mt-2 font-mono text-sm">Running Benford's Law & Cycle Detection</p>
        </div>
      )}

      {view === 'dashboard' && analysisData && (
        <Dashboard data={analysisData} onReset={() => setView('landing')} />
      )}
    </div>
  )
}

export default App