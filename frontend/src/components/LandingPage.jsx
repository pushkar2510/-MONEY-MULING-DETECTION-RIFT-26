// import { useState } from 'react';
// import axios from 'axios';
// import { UploadCloud, ShieldAlert } from 'lucide-react';

// export default function LandingPage({ setView, setAnalysisData }) {
//   const [error, setError] = useState('');

//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.name.endsWith('.csv')) {
//       setError('Strict Error: Only .csv files are permitted by engine protocol.');
//       return;
//     }

//     setView('loading');
//     setError('');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Calls your FastAPI/Flask backend
//       const response = await axios.post('http://127.0.0.1:5000/analyze', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
      
//       setAnalysisData(response.data);
//       setView('dashboard');
//     } catch (err) {
//       console.error(err);
//       setError('Analysis Engine Failure. Check backend connection.');
//       setView('landing');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 to-dark-900">
//       <div className="text-center mb-12">
//         <div className="flex justify-center mb-6">
//           <ShieldAlert className="w-20 h-20 text-neon-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
//         </div>
//         <h1 className="text-6xl font-black tracking-tighter mb-4">
//           <span className="text-white">RIFT</span>{' '}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-600">
//             FORENSICS
//           </span>
//         </h1>
//         <p className="font-mono text-gray-400 tracking-widest uppercase">
//           Graph-Based Money Muling Detection Engine
//         </p>
//       </div>

//       <div className="w-full max-w-2xl relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
//         <div className="relative bg-dark-800 ring-1 ring-dark-700 rounded-lg p-12 text-center hover:bg-dark-700/50 transition-colors">
//           <input 
//             type="file" 
//             accept=".csv"
//             onChange={handleFileUpload}
//             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//           />
//           <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-neon-cyan transition-colors" />
//           <h3 className="text-xl font-medium text-white mb-2">Initialize Threat Scan</h3>
//           <p className="text-gray-500 font-mono text-sm">
//             Drag & Drop transaction_logs.csv or click to browse
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div className="mt-6 px-6 py-3 bg-red-900/30 border border-neon-red text-neon-red font-mono text-sm rounded">
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, Shield, Database, ArrowRight, History } from 'lucide-react';

export default function LandingPage({ onScanComplete, scanHistory, onRestore }) {
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Proper React state
  const fileInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;
    
    console.log("1. File selected:", file.name); // Tracker 1

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('System Error: Strict .csv protocol required.');
      return;
    }
    
    setError('');
    setIsLoading(true); // Trigger loading UI
    console.log("2. Loading state activated, preparing payload...");

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log("3. Firing Axios request to http://127.0.0.1:5000/analyze...");
      const response = await axios.post('http://127.0.0.1:5000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      console.log("4. Response received! Payload:", response.data);
      setIsLoading(false);
      onScanComplete(response.data, file.name);
    } catch (err) {
      console.error("AXIOS ERROR:", err);
      setIsLoading(false);
      setError(`Engine Failure: ${err.message}. Is the Python server running?`);
    }

    // Reset the input so you can select the exact same file again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      
      {/* REACT STATE LOADING OVERLAY */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-lg flex flex-col items-center justify-center">
           <div className="w-16 h-16 border-2 border-glassBorder border-t-emerald rounded-full animate-spin mb-4 shadow-[0_0_30px_rgba(0,255,163,0.3)]"></div>
           <h2 className="text-xl font-light tracking-[0.2em] text-emerald animate-pulse">ANALYZING TOPOLOGY...</h2>
        </div>
      )}

      {/* TOP ROW: 3 Bento Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-48">
        
        {/* Widget 1: The Upload Zone */}
        <div 
          className={`col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl border transition-all duration-300 flex items-center justify-center cursor-pointer
            ${isDragging ? 'bg-emerald/10 border-emerald scale-[1.02]' : 'bg-glass border-glassBorder hover:bg-white/5'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { 
            e.preventDefault(); 
            setIsDragging(false); 
            handleFileUpload(e.dataTransfer.files[0]); 
          }}
        >
          <input 
            type="file" 
            accept=".csv" 
            ref={fileInputRef}
            onChange={(e) => handleFileUpload(e.target.files[0])} 
            className="absolute inset-0 opacity-0 cursor-pointer z-10" 
          />
          <div className="text-center z-0 pointer-events-none">
            <UploadCloud className={`w-12 h-12 mx-auto mb-3 transition-colors ${isDragging ? 'text-emerald' : 'text-gray-400'}`} />
            <h2 className="text-xl font-light tracking-wider text-white">INITIALIZE DATA STREAM</h2>
            <p className="text-xs font-mono text-gray-500 mt-2">Drop transaction CSV or click to browse</p>
          </div>
        </div>

        {/* Widget 2: Engine Status */}
        <div className="bg-glass border border-glassBorder rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-mono text-gray-400">CORE_STATUS</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald animate-pulse"></div>
                <span className="text-xs text-emerald font-mono">ONLINE</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-400" />
              <div>
                <p className="text-sm font-semibold text-white">Benford's Module</p>
                <p className="text-xs text-gray-500">Forensic Anomaly Active</p>
              </div>
            </div>
          </div>
          <div className="text-xs font-mono text-gray-600 border-t border-glassBorder pt-3 mt-4">
            Awaiting volumetric input...
          </div>
        </div>
      </div>

      {error && <div className="p-4 bg-crimson/10 border border-crimson rounded-xl text-crimson font-mono text-sm shadow-[0_0_15px_rgba(255,42,77,0.2)]">{error}</div>}

      {/* BOTTOM ROW: Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-[500px]">
        
        {/* Left: The 3D Data Core Simulation */}
        <div className="bg-glass border border-glassBorder rounded-2xl relative overflow-hidden flex items-center justify-center p-8 group shadow-lg">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-30 group-hover:opacity-60 transition-opacity duration-1000"></div>
          
          <div className="relative w-64 h-64 animate-float">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-spin-slow">
              <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(0,255,163,0.3)" strokeWidth="2" />
              <circle cx="180" cy="100" r="4" fill="#00FFA3" className="animate-pulse" />
              <circle cx="20" cy="100" r="4" fill="#FF2A4D" className="animate-pulse" />
              <circle cx="100" cy="20" r="4" fill="#6366F1" />
              <path d="M 100 20 L 180 100 L 100 180 L 20 100 Z" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <path d="M 100 50 L 150 100 L 100 150 L 50 100 Z" fill="none" stroke="rgba(255,42,77,0.2)" strokeWidth="1" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Database className="w-12 h-12 text-white/80 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-xs font-mono text-gray-500">
            SIMULATING: Multi-hop Depth Search
          </div>
        </div>

        {/* Right: Hook & History */}
        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-glass border border-indigo-500/20 rounded-2xl p-10 flex-grow flex flex-col justify-center relative overflow-hidden shadow-lg">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              Expose the <br /><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald to-cyan-400">Invisible Networks.</span>
            </h1>
            <p className="text-gray-400 max-w-md leading-relaxed mb-8">
              Traditional queries fail against multi-hop obfuscation. RIFT utilizes advanced graph-theoretic algorithms to expose circular routing and smurfing rings instantly.
            </p>
            <div className="flex items-center text-sm font-mono text-indigo-300">
              <ArrowRight className="w-4 h-4 mr-2 animate-pulse" />
              Awaiting payload execution
            </div>
          </div>

          {scanHistory && scanHistory.length > 0 && (
            <div className="bg-glass border border-glassBorder rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-2 mb-4 text-gray-400 font-mono text-sm">
                <History className="w-4 h-4" /> SESSION_HISTORY
              </div>
              <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-glassBorder">
                {scanHistory.map((scan, idx) => (
                  <button 
                    key={scan.id}
                    onClick={() => onRestore(idx)}
                    className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm text-white font-medium">{scan.filename}</p>
                      <p className="text-xs text-gray-500 font-mono">{scan.timestamp}</p>
                    </div>
                    <span className="text-xs font-mono text-crimson opacity-0 group-hover:opacity-100 transition-opacity">
                      {scan.summary.fraud_rings_detected} Rings
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}