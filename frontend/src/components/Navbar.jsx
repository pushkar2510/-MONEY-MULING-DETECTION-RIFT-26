import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-slate-200 px-8 py-4 flex items-center shadow-sm z-50 relative">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-azure-600" />
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          RIFT <span className="font-light text-azure-600">Forensics</span>
        </span>
      </div>
    </nav>
  );
}