// // import { useState } from 'react'
// // import LandingPage from './components/LandingPage'
// // import Dashboard from './components/Dashboard'

// // function App() {
// //   const [view, setView] = useState('landing') // 'landing', 'loading', 'dashboard'
// //   const [analysisData, setAnalysisData] = useState(null)

// //   return (
// //     <div className="min-h-screen bg-dark-900 font-sans text-gray-100">
// //       {view === 'landing' && (
// //         <LandingPage setView={setView} setAnalysisData={setAnalysisData} />
// //       )}
      
// //       {view === 'loading' && (
// //         <div className="flex flex-col items-center justify-center min-h-screen">
// //           <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin mb-8"></div>
// //           <h2 className="text-2xl font-mono text-neon-cyan tracking-widest animate-pulse">
// //             ANALYZING TOPOLOGY...
// //           </h2>
// //           <p className="text-gray-500 mt-2 font-mono text-sm">Running Benford's Law & Cycle Detection</p>
// //         </div>
// //       )}

// //       {view === 'dashboard' && analysisData && (
// //         <Dashboard data={analysisData} onReset={() => setView('landing')} />
// //       )}
// //     </div>
// //   )
// // }

// // export default App


// import { useState } from 'react'
// import LandingPage from './components/LandingPage'
// import Dashboard from './components/Dashboard'

// function App() {
//   const [view, setView] = useState('landing');
//   const [scanHistory, setScanHistory] = useState([]); // Array of all past scans
//   const [activeScanIndex, setActiveScanIndex] = useState(null);

//   const addNewScan = (data, filename) => {
//     const newScan = { ...data, id: Date.now(), filename, timestamp: new Date().toLocaleTimeString() };
//     setScanHistory(prev => [newScan, ...prev]);
//     setActiveScanIndex(0); // Set to the newest scan
//     setView('dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-obsidian text-gray-100 overflow-x-hidden selection:bg-crimson/30">
//       {/* Abstract Background Glow */}
//       <div className="fixed inset-0 z-0 pointer-events-none">
//         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px]"></div>
//         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-crimson/10 blur-[120px]"></div>
//       </div>

//       <div className="relative z-10 h-full">
//         {view === 'landing' && (
//           <LandingPage onScanComplete={addNewScan} scanHistory={scanHistory} onRestore={(index) => { setActiveScanIndex(index); setView('dashboard'); }} />
//         )}
        
//         {view === 'loading' && (
//           <div className="flex flex-col items-center justify-center min-h-screen backdrop-blur-md">
//             <div className="w-24 h-24 border-2 border-glassBorder border-t-emerald rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(0,255,163,0.3)]"></div>
//             <h2 className="text-2xl font-light tracking-[0.3em] text-white">RECONSTRUCTING TOPOLOGY</h2>
//             <p className="text-gray-500 mt-3 font-mono text-xs uppercase tracking-widest">Executing Benford's Law & Depth-Limited DFS</p>
//           </div>
//         )}

//         {view === 'dashboard' && scanHistory[activeScanIndex] && (
//           <Dashboard 
//             data={scanHistory[activeScanIndex]} 
//             onNewScan={() => setView('landing')} 
//             history={scanHistory}
//             onSwitchScan={(idx) => setActiveScanIndex(idx)}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default App

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('landing');
  const [scanHistory, setScanHistory] = useState([]);
  const [activeScanIndex, setActiveScanIndex] = useState(null);

  const addNewScan = (data, filename) => {
    const newScan = { ...data, id: Date.now(), filename, timestamp: new Date().toLocaleTimeString() };
    setScanHistory(prev => [newScan, ...prev]);
    setActiveScanIndex(0);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-50 text-slate-900 font-sans selection:bg-brand-100">
      {view === 'landing' && (
        <LandingPage onScanComplete={addNewScan} scanHistory={scanHistory} onRestore={(index) => { setActiveScanIndex(index); setView('dashboard'); }} />
      )}
      
      {view === 'dashboard' && scanHistory[activeScanIndex] && (
        <Dashboard 
          data={scanHistory[activeScanIndex]} 
          onNewScan={() => setView('landing')} 
        />
      )}
    </div>
  );
}

export default App;