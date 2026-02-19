// // import MetricsCards from './MetricsCards';
// // import ForensicGraph from './ForensicGraph';
// // import RingSummaryTable from './RingSummaryTable';
// // import { ShieldCheck, Download } from 'lucide-react';

// // export default function Dashboard({ data, onReset }) {
// //   // Download the strict JSON format required by the judges
// //   const handleDownloadJSON = () => {
// //     const jsonString = JSON.stringify({
// //       suspicious_accounts: data.suspicious_accounts,
// //       fraud_rings: data.fraud_rings,
// //       summary: data.summary
// //     }, null, 2);
    
// //     const blob = new Blob([jsonString], { type: "application/json" });
// //     const href = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = href;
// //     link.download = "rift_forensics_output.json";
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   return (
// //     <div className="min-h-screen bg-dark-900 p-6 flex flex-col gap-6">
// //       {/* Top Navigation / Header */}
// //       <header className="flex justify-between items-center bg-dark-800 border border-dark-700 p-4 rounded-lg shadow-lg">
// //         <div className="flex items-center gap-3">
// //           <ShieldCheck className="w-8 h-8 text-neon-cyan" />
// //           <h1 className="text-2xl font-black tracking-widest text-white">
// //             RIFT <span className="text-neon-cyan font-mono text-lg">:: FORENSICS_DASHBOARD</span>
// //           </h1>
// //         </div>
// //         <div className="flex gap-4">
// //           <button 
// //             onClick={handleDownloadJSON}
// //             className="flex items-center gap-2 bg-dark-700 hover:bg-dark-700/80 text-neon-cyan border border-neon-cyan px-4 py-2 rounded font-mono text-sm transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
// //           >
// //             <Download className="w-4 h-4" /> EXPORT_JSON
// //           </button>
// //           <button 
// //             onClick={onReset}
// //             className="text-gray-400 hover:text-white font-mono text-sm px-4 py-2"
// //           >
// //             NEW_SCAN
// //           </button>
// //         </div>
// //       </header>

// //       {/* Metrics Row */}
// //       <MetricsCards summary={data.summary} />

// //       {/* Main Grid: Graph (left) and Details (right) */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-[600px]">
        
// //         {/* Graph Canvas */}
// //         <div className="col-span-2 bg-dark-800 border border-dark-700 rounded-lg overflow-hidden flex flex-col shadow-lg relative">
// //           <div className="bg-dark-700 p-3 border-b border-dark-800 flex justify-between items-center">
// //             <h2 className="text-neon-cyan font-mono text-sm tracking-widest">NETWORK_TOPOLOGY</h2>
// //             <div className="flex gap-4 text-xs font-mono">
// //               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-neon-red rounded-full shadow-[0_0_5px_#ff2a2a]"></div> Suspicious</span>
// //               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-dark-700 border border-neon-cyan rounded-full"></div> Safe</span>
// //             </div>
// //           </div>
// //           <div className="flex-grow w-full h-full relative">
// //             {/* The Cytoscape Graph */}
// //             <ForensicGraph elements={data.graph_data} />
// //           </div>
// //         </div>

// //         {/* Right Panel: Table & Details */}
// //         <div className="col-span-1 flex flex-col gap-6">
// //           <div className="bg-dark-800 border border-dark-700 rounded-lg flex-grow overflow-hidden flex flex-col shadow-lg">
// //             <div className="bg-dark-700 p-3 border-b border-dark-800">
// //               <h2 className="text-neon-red font-mono text-sm tracking-widest">DETECTED_FRAUD_RINGS</h2>
// //             </div>
// //             <div className="p-4 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-dark-700">
// //               {/* The required Summary Table */}
// //               <RingSummaryTable rings={data.fraud_rings} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import MetricsCards from './MetricsCards';
// import ForensicGraph from './ForensicGraph';
// import RingSummaryTable from './RingSummaryTable';
// import { ShieldCheck, Download, Plus } from 'lucide-react';

// export default function Dashboard({ data, onNewScan, history, onSwitchScan }) {
//   const handleDownloadJSON = () => {
//     const jsonString = JSON.stringify({
//       suspicious_accounts: data.suspicious_accounts,
//       fraud_rings: data.fraud_rings,
//       summary: data.summary
//     }, null, 2);
    
//     const blob = new Blob([jsonString], { type: "application/json" });
//     const href = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = href;
//     link.download = "rift_forensics_output.json";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="min-h-screen bg-obsidian p-6 flex flex-col gap-6">
//       <header className="flex justify-between items-center bg-glass border border-glassBorder p-4 rounded-xl shadow-lg backdrop-blur-md">
//         <div className="flex items-center gap-3">
//           <ShieldCheck className="w-8 h-8 text-emerald" />
//           <h1 className="text-2xl font-black tracking-widest text-white">
//             RIFT <span className="text-emerald font-mono text-lg">:: FORENSICS_DASHBOARD</span>
//           </h1>
//         </div>
//         <div className="flex gap-4">
//           <button 
//             onClick={handleDownloadJSON}
//             className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-emerald border border-emerald/50 px-4 py-2 rounded font-mono text-sm transition-all shadow-[0_0_10px_rgba(0,255,163,0.1)] hover:shadow-[0_0_15px_rgba(0,255,163,0.3)]"
//           >
//             <Download className="w-4 h-4" /> EXPORT_JSON
//           </button>
//           <button 
//             onClick={onNewScan}
//             className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-sm px-4 py-2 bg-glass border border-glassBorder rounded hover:bg-white/10 transition"
//           >
//             <Plus className="w-4 h-4" /> NEW_DATASET
//           </button>
//         </div>
//       </header>

//       <MetricsCards summary={data.summary} />

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow min-h-[600px]">
//         <div className="col-span-2 bg-glass border border-glassBorder rounded-xl overflow-hidden flex flex-col shadow-lg relative backdrop-blur-md">
//           <div className="bg-white/5 p-3 border-b border-glassBorder flex justify-between items-center">
//             <h2 className="text-emerald font-mono text-sm tracking-widest">NETWORK_TOPOLOGY</h2>
//             <div className="flex gap-4 text-xs font-mono">
//               <span className="flex items-center gap-1"><div className="w-3 h-3 bg-crimson rounded-full shadow-[0_0_5px_#FF2A4D]"></div> Suspicious</span>
//               <span className="flex items-center gap-1"><div className="w-3 h-3 border border-white/30 rounded-full"></div> Safe</span>
//             </div>
//           </div>
//           <div className="flex-grow w-full h-full relative">
//             <ForensicGraph elements={data.graph_data} />
//           </div>
//         </div>

//         <div className="col-span-1 flex flex-col gap-6">
//           <div className="bg-glass border border-glassBorder rounded-xl flex-grow overflow-hidden flex flex-col shadow-lg backdrop-blur-md">
//             <div className="bg-white/5 p-3 border-b border-glassBorder">
//               <h2 className="text-crimson font-mono text-sm tracking-widest">DETECTED_FRAUD_RINGS</h2>
//             </div>
//             <div className="p-4 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-glassBorder">
//               <RingSummaryTable rings={data.fraud_rings} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import MetricsCards from './MetricsCards';
import ForensicGraph from './ForensicGraph';
import RingSummaryTable from './RingSummaryTable';
import { ShieldCheck, Download, Plus, Maximize, Minimize } from 'lucide-react';

export default function Dashboard({ data, onNewScan }) {
  const [isGraphFullscreen, setIsGraphFullscreen] = useState(false);

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify({ suspicious_accounts: data.suspicious_accounts, fraud_rings: data.fraud_rings, summary: data.summary }, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href; link.download = "rift_forensics_output.json"; document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 max-w-[1800px] mx-auto bg-slate-50">
      
      <header className="flex justify-between items-center bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-10 h-10 text-azure-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">RIFT <span className="font-light text-slate-400">| Dashboard</span></h1>
        </div>
        <div className="flex gap-4">
          <button onClick={handleDownloadJSON} className="flex items-center gap-2 bg-white text-azure-700 border-2 border-azure-200 hover:bg-azure-50 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
            <Download className="w-5 h-5" /> Export JSON
          </button>
          <button onClick={onNewScan} className="flex items-center gap-2 bg-azure-600 hover:bg-azure-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-azure-600/30">
            <Plus className="w-5 h-5" /> New Dataset
          </button>
        </div>
      </header>

      <MetricsCards summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* GRAPH CONTAINER WITH FULLSCREEN LOGIC */}
        <div className={`bg-white border border-slate-200 rounded-2xl flex flex-col shadow-lg transition-all duration-300 ${isGraphFullscreen ? 'fixed inset-4 z-50' : 'col-span-2 h-[700px]'}`}>
          <div className="bg-slate-50 p-5 border-b border-slate-200 flex justify-between items-center rounded-t-2xl">
            <h2 className="font-black text-slate-900 text-lg">Network Topology Analysis</h2>
            <div className="flex gap-6 items-center">
              <div className="flex gap-4 text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200">
                <span className="flex items-center gap-2"><div className="w-4 h-4 bg-danger rounded-full shadow-md"></div> Suspicious Nodes</span>
                <span className="flex items-center gap-2"><div className="w-4 h-4 bg-azure-400 rounded-full shadow-md"></div> Safe Nodes</span>
              </div>
              <button 
                onClick={() => setIsGraphFullscreen(!isGraphFullscreen)} 
                className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-azure-50 hover:text-azure-600 transition-colors shadow-sm"
              >
                {isGraphFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </div>
          <div className="flex-grow w-full h-full relative overflow-hidden bg-slate-50/50 rounded-b-2xl">
            <ForensicGraph elements={data.graph_data} />
          </div>
        </div>

        {/* TABLE CONTAINER */}
        {!isGraphFullscreen && (
          <div className="col-span-1 bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-lg h-[700px]">
            <div className="bg-slate-50 p-5 border-b border-slate-200">
              <h2 className="font-black text-slate-900 text-lg">Detected Fraud Rings</h2>
            </div>
            <div className="p-5 overflow-y-auto flex-grow">
              <RingSummaryTable rings={data.fraud_rings} />
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}