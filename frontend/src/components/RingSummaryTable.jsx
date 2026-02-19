// export default function RingSummaryTable({ rings }) {
//   if (!rings || rings.length === 0) {
//     return <div className="text-gray-500 font-mono text-center mt-10">NO RINGS DETECTED IN TOPOLOGY.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       {rings.map((ring, idx) => (
//         <div key={idx} className="bg-dark-900 border border-dark-700 rounded p-4 relative group hover:border-neon-red transition-colors">
//           <div className="flex justify-between items-center mb-3">
//             <h3 className="font-mono text-neon-red font-bold">{ring.ring_id}</h3>
//             <span className="bg-neon-red/10 text-neon-red border border-neon-red/30 px-2 py-1 rounded text-xs font-mono">
//               SCORE: {ring.risk_score.toFixed(1)}
//             </span>
//           </div>
          
//           <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
//             <div className="text-gray-500">Pattern</div>
//             <div className="text-white text-right uppercase">{ring.pattern_type.replace('_', ' ')}</div>
            
//             <div className="text-gray-500">Node Count</div>
//             <div className="text-neon-cyan text-right font-mono">{ring.member_accounts.length}</div>
//           </div>
          
//           <div>
//             <div className="text-gray-500 text-xs mb-2">MEMBER_ACCOUNTS</div>
//             <div className="bg-dark-800 border border-dark-700 rounded p-2 text-xs font-mono text-gray-300 break-words leading-relaxed">
//               {/* Comma separated as requested */}
//               {ring.member_accounts.join(', ')}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


export default function RingSummaryTable({ rings }) {
  if (!rings || rings.length === 0) return <div className="text-brand-600 text-center font-bold mt-10 p-6 bg-brand-50 rounded-xl border border-brand-200">No illicit activity detected.</div>;

  return (
    <div className="flex flex-col gap-4">
      {rings.map((ring, idx) => (
        <div key={idx} className="bg-white border-2 border-brand-100 rounded-xl p-5 hover:border-danger hover:shadow-lg transition-all shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-brand-50">
            <h3 className="font-black text-brand-900 text-lg">{ring.ring_id}</h3>
            <span className="bg-red-100 text-danger border border-red-200 px-3 py-1 rounded-md text-xs font-black">
              Score: {ring.risk_score.toFixed(1)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4 text-sm">
            <div className="text-slate-500 font-bold">Pattern Type</div>
            <div className="text-brand-900 text-right font-black uppercase">{ring.pattern_type.replace('_', ' ')}</div>
            <div className="text-slate-500 font-bold">Node Count</div>
            <div className="text-brand-600 text-right font-black">{ring.member_accounts.length}</div>
          </div>
          <div>
            <div className="text-slate-500 text-xs font-bold mb-2 uppercase tracking-wider">Member Accounts</div>
            <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-xs font-mono text-brand-900 break-words leading-relaxed font-semibold">
              {ring.member_accounts.join(', ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}