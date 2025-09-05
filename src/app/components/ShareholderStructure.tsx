import { Badge } from "./ui/bagde";
import { Progress } from "./ui/progress";
import { Users } from "lucide-react";

interface ShareholderStructureProps {
  shareholderData: any;
}

export function ShareholderStructure({ shareholderData }: ShareholderStructureProps) {
  return (
    <div className="p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl border-2 border-cyan-400/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-600/10 to-teal-600/10 rounded-full blur-2xl"></div>
      <div className="relative">
        <div className="flex items-start gap-4">
          <div className="w-3 h-3 bg-cyan-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-cyan-300">
              <Users className="w-6 h-6" />
              Cơ cấu cổ đông
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 bg-cyan-400/10">
                Chi tiết
              </Badge>
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-br from-slate-700/30 to-cyan-500/20 rounded-xl border-2 border-cyan-400/30">
                  <div className="text-sm text-slate-400 mb-2">Sở hữu Nhà nước</div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">{shareholderData.governmentOwnership}</div>
                  <Progress value={parseFloat(shareholderData.governmentOwnership.replace('%', ''))} className="h-2" />
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-slate-700/30 to-blue-500/20 rounded-xl border-2 border-blue-400/30">
                  <div className="text-sm text-slate-400 mb-2">Sở hữu nước ngoài</div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{shareholderData.foreignOwnership}</div>
                  <Progress value={parseFloat(shareholderData.foreignOwnership.replace('%', ''))} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-4">
                <span className="text-slate-400 text-sm font-medium mb-3 block">Cổ đông lớn:</span>
                <div className="space-y-3">
                  {shareholderData.majorShareholders.map((shareholder: any, index: number) => (
                    <div key={index} className="p-4 bg-slate-700/30 backdrop-blur-sm rounded-xl border border-cyan-400/20">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <div className="font-medium text-white text-sm mb-1">{shareholder.name}</div>
                          <div className="text-xs text-slate-400">{shareholder.type}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-cyan-400">{shareholder.ownership}</div>
                          <div className="text-xs text-slate-400">{shareholder.shares}</div>
                        </div>
                      </div>
                      <Progress value={parseFloat(shareholder.ownership.replace('%', ''))} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}