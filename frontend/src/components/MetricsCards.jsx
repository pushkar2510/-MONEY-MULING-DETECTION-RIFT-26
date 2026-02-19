// import { Activity, AlertTriangle, Users, Clock } from 'lucide-react';

// export default function MetricsCards({ summary }) {
//   const cards = [
//     { title: "ACCOUNTS ANALYZED", value: summary.total_accounts_analyzed, icon: Users, color: "text-blue-400", border: "border-blue-500/30" },
//     { title: "FRAUD RINGS", value: summary.fraud_rings_detected, icon: Activity, color: "text-neon-cyan", border: "border-neon-cyan/50" },
//     { title: "SUSPICIOUS MULES", value: summary.suspicious_accounts_flagged, icon: AlertTriangle, color: "text-neon-red", border: "border-neon-red/50", shadow: "shadow-[0_0_15px_rgba(255,42,42,0.2)]" },
//     { title: "PROCESSING TIME", value: `${summary.processing_time_seconds}s`, icon: Clock, color: "text-neon-green", border: "border-neon-green/30" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//       {cards.map((card, idx) => (
//         <div key={idx} className={`bg-dark-800 border ${card.border} rounded-lg p-5 flex items-center justify-between ${card.shadow || 'shadow-lg'}`}>
//           <div>
//             <p className="text-gray-500 font-mono text-xs mb-1">{card.title}</p>
//             <h3 className={`text-3xl font-black ${card.color}`}>{card.value}</h3>
//           </div>
//           <card.icon className={`w-10 h-10 ${card.color} opacity-80`} />
//         </div>
//       ))}
//     </div>
//   );
// }


import { Activity, AlertTriangle, Users, Clock } from 'lucide-react';

export default function MetricsCards({ summary }) {
  const cards = [
    { title: "Accounts Analyzed", value: summary.total_accounts_analyzed, icon: Users, color: "text-brand-600", bg: "bg-brand-100" },
    { title: "Fraud Rings", value: summary.fraud_rings_detected, icon: Activity, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Suspicious Nodes", value: summary.suspicious_accounts_flagged, icon: AlertTriangle, color: "text-danger", bg: "bg-red-100" },
    { title: "Processing Time", value: `${summary.processing_time_seconds}s`, icon: Clock, color: "text-brand-700", bg: "bg-brand-100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white border border-brand-100 rounded-xl p-5 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-slate-500 font-bold text-sm mb-1">{card.title}</p>
            <h3 className="text-3xl font-black text-brand-900">{card.value}</h3>
          </div>
          <div className={`p-3 rounded-lg ${card.bg}`}>
            <card.icon className={`w-8 h-8 ${card.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}