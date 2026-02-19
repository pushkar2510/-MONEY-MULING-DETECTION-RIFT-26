import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, ShieldAlert } from 'lucide-react';

export default function LandingPage({ setView, setAnalysisData }) {
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Strict Error: Only .csv files are permitted by engine protocol.');
      return;
    }

    setView('loading');
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Calls your FastAPI/Flask backend
      const response = await axios.post('http://127.0.0.1:5000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setAnalysisData(response.data);
      setView('dashboard');
    } catch (err) {
      console.error(err);
      setError('Analysis Engine Failure. Check backend connection.');
      setView('landing');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-dark-800 to-dark-900">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-20 h-20 text-neon-cyan drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
        </div>
        <h1 className="text-6xl font-black tracking-tighter mb-4">
          <span className="text-white">RIFT</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-600">
            FORENSICS
          </span>
        </h1>
        <p className="font-mono text-gray-400 tracking-widest uppercase">
          Graph-Based Money Muling Detection Engine
        </p>
      </div>

      <div className="w-full max-w-2xl relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-dark-800 ring-1 ring-dark-700 rounded-lg p-12 text-center hover:bg-dark-700/50 transition-colors">
          <input 
            type="file" 
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-neon-cyan transition-colors" />
          <h3 className="text-xl font-medium text-white mb-2">Initialize Threat Scan</h3>
          <p className="text-gray-500 font-mono text-sm">
            Drag & Drop transaction_logs.csv or click to browse
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-6 px-6 py-3 bg-red-900/30 border border-neon-red text-neon-red font-mono text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
}