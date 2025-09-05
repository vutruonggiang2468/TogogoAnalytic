import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  Calendar,
  Bell,
  Star,
  BarChart3,
  Activity,
  Zap
} from "lucide-react";

interface NewsSidebarProps {
  onViewDetails: (code: string) => void;
}

const trendingTopics = [
  { topic: "Cổ phiếu ngân hàng", count: 24, trend: "up" },
  { topic: "IPO MEATLife", count: 15, trend: "up" },
  { topic: "Chính sách BĐS", count: 12, trend: "neutral" },
  { topic: "AI Trading", count: 18, trend: "up" },
  { topic: "Crypto Vietnam", count: 9, trend: "down" }
];

const marketMovers = [
  { code: "HPG", change: "+5.13%", isPositive: true, volume: "12.3M" },
  { code: "MSN", change: "+4.83%", isPositive: true, volume: "5.7M" },
  { code: "TCB", change: "+3.08%", isPositive: true, volume: "8.5M" },
  { code: "VHM", change: "-1.74%", isPositive: false, volume: "2.9M" },
  { code: "VIC", change: "-0.48%", isPositive: false, volume: "1.8M" }
];

const economicCalendar = [
  { event: "GDP Q4 2024", date: "28/08", time: "09:00", importance: "high" },
  { event: "PMI sản xuất", date: "30/08", time: "10:00", importance: "medium" },
  { event: "Lãi suất SBV", date: "05/09", time: "14:00", importance: "high" },
  { event: "CPI tháng 8", date: "10/09", time: "08:30", importance: "medium" }
];

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case "high": return "text-red-300 border-red-400/50 bg-red-500/20";
    case "medium": return "text-amber-300 border-amber-400/50 bg-amber-500/20";
    case "low": return "text-slate-300 border-slate-400/50 bg-slate-500/20";
    default: return "text-slate-300 border-slate-400/50 bg-slate-500/20";
  }
};

export function NewsSidebar({ onViewDetails }: NewsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span className="text-white">Trending Topics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 rounded cursor-pointer transition-all">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{item.topic}</span>
                {item.trend === "up" && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                {item.trend === "down" && <TrendingDown className="w-3 h-3 text-red-400" />}
              </div>
              <Badge variant="outline" className={
                item.trend === "up" ? "text-emerald-300 border-emerald-400/50 bg-emerald-500/20" :
                item.trend === "down" ? "text-red-300 border-red-400/50 bg-red-500/20" :
                "text-slate-300 border-slate-400/50 bg-slate-500/20"
              }>
                {item.count}
              </Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full border-blue-400/30 text-slate-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-400/50">
            Xem tất cả xu hướng
          </Button>
        </CardContent>
      </Card>

      {/* Market Movers */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span className="text-white">Market Movers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {marketMovers.map((stock, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-2 hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50 rounded cursor-pointer transition-all"
                onClick={() => onViewDetails(stock.code)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-cyan-400">{stock.code}</span>
                  <span className="text-xs text-slate-400">{stock.volume}</span>
                </div>
                <div className="flex items-center gap-1">
                  {stock.isPositive ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-sm font-medium ${stock.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stock.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-3 border-blue-400/30 text-slate-300 hover:bg-blue-500/20 hover:text-white hover:border-blue-400/50"
            onClick={() => onViewDetails('VCB')}
          >
            Xem phân tích chi tiết
          </Button>
        </CardContent>
      </Card>

      {/* Economic Calendar */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span className="text-white">Lịch kinh tế</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {economicCalendar.map((event, index) => (
              <div key={index} className="p-3 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-lg border border-blue-400/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">{event.event}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getImportanceColor(event.importance)}`}
                  >
                    {event.importance === "high" ? "Quan trọng" : 
                     event.importance === "medium" ? "Trung bình" : "Thấp"}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  <span>{event.date}</span>
                  <Clock className="w-3 h-3 ml-2 text-blue-400" />
                  <span>{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-400/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-blue-400">
            <Zap className="w-4 h-4" />
            <span className="text-white">Thao tác nhanh</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start text-blue-300 border-blue-400/30 hover:bg-blue-500/20 hover:text-white hover:border-blue-400/50">
            <Bell className="w-4 h-4 mr-2" />
            Đặt cảnh báo tin tức
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-emerald-300 border-emerald-400/30 hover:bg-emerald-500/20 hover:text-white hover:border-emerald-400/50">
            <Star className="w-4 h-4 mr-2" />
            Danh sách theo dõi
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-purple-300 border-purple-400/30 hover:bg-purple-500/20 hover:text-white hover:border-purple-400/50">
            <Users className="w-4 h-4 mr-2" />
            Cộng đồng trader
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start text-orange-300 border-orange-400/30 hover:bg-orange-500/20 hover:text-white hover:border-orange-400/50">
            <Activity className="w-4 h-4 mr-2" />
            Phân tích portfolio
          </Button>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-400/30">
        <CardHeader>
          <CardTitle className="text-base text-emerald-400">📬 Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-emerald-300 mb-3">
            Nhận tin tức và phân tích hàng ngày từ chuyên gia
          </p>
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
            Đăng ký miễn phí
          </Button>
          <p className="text-xs text-emerald-400 mt-2 text-center">
            2.3K+ người đã đăng ký
          </p>
        </CardContent>
      </Card>

      {/* Market Status */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-blue-400/20">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-white">Trạng thái thị trường</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Phiên giao dịch:</span>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse mr-1"></div>
                Mở cửa
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Thời gian:</span>
              <span className="font-medium text-white">14:32 (GMT+7)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Phiên tiếp theo:</span>
              <span className="text-cyan-400">ATC 14:45</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Đóng cửa:</span>
              <span className="text-slate-400">15:00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}