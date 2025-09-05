import { Badge } from "./ui/badge";
import { Building2 } from "lucide-react";

interface SubsidiariesProps {
  subsidiaries: any[];
}

export function Subsidiaries({ subsidiaries }: SubsidiariesProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl border-2 border-indigo-400/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-full blur-2xl"></div>
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 bg-indigo-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-indigo-300">
              <Building2 className="w-6 h-6" />
              Công ty con & liên kết
              <Badge variant="outline" className="text-indigo-400 border-indigo-400/50 bg-indigo-400/10">
                {subsidiaries.length} công ty
              </Badge>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subsidiaries.map((subsidiary, index) => (
                <div key={index} className="p-5 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-indigo-400/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-bold text-white mb-1">{subsidiary.name}</h5>
                      <div className="text-sm text-slate-400 mb-2">{subsidiary.business}</div>
                    </div>
                    <Badge className={`${subsidiary.status === 'Hoạt động' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/50' : 'bg-red-500/20 text-red-400 border-red-400/50'} border`}>
                      {subsidiary.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Sở hữu:</span>
                      <div className="font-semibold text-indigo-400">{subsidiary.ownership}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Thành lập:</span>
                      <div className="font-semibold text-white">{subsidiary.establishedYear}</div>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400">Doanh thu:</span>
                      <div className="font-semibold text-emerald-400">{subsidiary.revenue}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}