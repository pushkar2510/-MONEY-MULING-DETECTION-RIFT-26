export default function RingSummaryTable({ rings }) {
  if (!rings || rings.length === 0) {
    return <div className="text-gray-500 font-mono text-center mt-10">NO RINGS DETECTED IN TOPOLOGY.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {rings.map((ring, idx) => (
        <div key={idx} className="bg-dark-900 border border-dark-700 rounded p-4 relative group hover:border-neon-red transition-colors">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-mono text-neon-red font-bold">{ring.ring_id}</h3>
            <span className="bg-neon-red/10 text-neon-red border border-neon-red/30 px-2 py-1 rounded text-xs font-mono">
              SCORE: {ring.risk_score.toFixed(1)}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
            <div className="text-gray-500">Pattern</div>
            <div className="text-white text-right uppercase">{ring.pattern_type.replace('_', ' ')}</div>
            
            <div className="text-gray-500">Node Count</div>
            <div className="text-neon-cyan text-right font-mono">{ring.member_accounts.length}</div>
          </div>
          
          <div>
            <div className="text-gray-500 text-xs mb-2">MEMBER_ACCOUNTS</div>
            <div className="bg-dark-800 border border-dark-700 rounded p-2 text-xs font-mono text-gray-300 break-words leading-relaxed">
              {/* Comma separated as requested */}
              {ring.member_accounts.join(', ')}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}