'use client'
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  AlertCircle,
  Zap,
  Clock,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Minus,

} from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import Link from "next/link";



interface QuickAnalysisProps {
  onViewDetails: (code: string) => void;
}

// Stock data with detailed information
const stockData = [
  {
    code: " YTC",
    name: "Vietcombank",
    price: "95.8",
    change: "+2.1",
    changePercent: "+2.24%",
    trend: "up",
    color: "text-green-600",
    volume: "2.1M",
    value: "201.8B",
    session: {
      open: "93.5",
      high: "96.2",
      low: "93.0",
      avgPrice: "95.1"
    },
    technical: {
      rsi: 65.4,
      macd: "Bullish",
      ma20: "Above",
      support: "92.0",
      resistance: "98.0"
    },
    recommendation: "BUY",
    sector: "Banking"
  },
  {
    code: "TCB",
    name: "Techcombank",
    price: "23.4",
    change: "+0.7",
    changePercent: "+3.08%",
    trend: "up",
    color: "text-green-600",
    volume: "8.5M",
    value: "198.9B",
    session: {
      open: "22.7",
      high: "23.6",
      low: "22.6",
      avgPrice: "23.2"
    },
    technical: {
      rsi: 72.1,
      macd: "Strong Bullish",
      ma20: "Above",
      support: "22.0",
      resistance: "25.0"
    },
    recommendation: "STRONG_BUY",
    sector: "Banking"
  },
  {
    code: "BID",
    name: "BIDV",
    price: "48.2",
    change: "-0.3",
    changePercent: "-0.62%",
    trend: "down",
    color: "text-red-600",
    volume: "1.2M",
    value: "57.8B",
    session: {
      open: "48.5",
      high: "48.7",
      low: "47.8",
      avgPrice: "48.3"
    },
    technical: {
      rsi: 45.8,
      macd: "Bearish",
      ma20: "Below",
      support: "47.0",
      resistance: "50.0"
    },
    recommendation: "HOLD",
    sector: "Banking"
  },
  {
    code: "ACB",
    name: "ACB",
    price: "22.5",
    change: "+0.5",
    changePercent: "+2.27%",
    trend: "up",
    color: "text-green-600",
    volume: "3.8M",
    value: "85.5B",
    session: {
      open: "22.0",
      high: "22.7",
      low: "21.9",
      avgPrice: "22.3"
    },
    technical: {
      rsi: 58.2,
      macd: "Bullish",
      ma20: "Above",
      support: "21.5",
      resistance: "24.0"
    },
    recommendation: "BUY",
    sector: "Banking"
  },
  {
    code: "HPG",
    name: "Hoa Phat Group",
    price: "24.6",
    change: "+1.2",
    changePercent: "+5.13%",
    trend: "up",
    color: "text-green-600",
    volume: "12.3M",
    value: "302.4B",
    session: {
      open: "23.4",
      high: "24.8",
      low: "23.2",
      avgPrice: "24.1"
    },
    technical: {
      rsi: 76.3,
      macd: "Very Bullish",
      ma20: "Above",
      support: "23.0",
      resistance: "26.0"
    },
    recommendation: "STRONG_BUY",
    sector: "Steel"
  },
  {
    code: "HSG",
    name: "Hoa Sen Group",
    price: "3.4",
    change: "+0.1",
    changePercent: "+3.03%",
    trend: "up",
    color: "text-green-600",
    volume: "15.2M",
    value: "51.7B",
    session: {
      open: "3.3",
      high: "3.5",
      low: "3.3",
      avgPrice: "3.4"
    },
    technical: {
      rsi: 68.9,
      macd: "Bullish",
      ma20: "Above",
      support: "3.2",
      resistance: "3.7"
    },
    recommendation: "BUY",
    sector: "Steel"
  },
  {
    code: "VHM",
    name: "Vinhomes",
    price: "45.2",
    change: "-0.8",
    changePercent: "-1.74%",
    trend: "down",
    color: "text-red-600",
    volume: "2.9M",
    value: "131.1B",
    session: {
      open: "46.0",
      high: "46.1",
      low: "44.8",
      avgPrice: "45.4"
    },
    technical: {
      rsi: 38.7,
      macd: "Bearish",
      ma20: "Below",
      support: "43.0",
      resistance: "47.0"
    },
    recommendation: "SELL",
    sector: "Real Estate"
  },
  {
    code: "VIC",
    name: "Vingroup",
    price: "41.8",
    change: "-0.2",
    changePercent: "-0.48%",
    trend: "down",
    color: "text-red-600",
    volume: "1.8M",
    value: "75.2B",
    session: {
      open: "42.0",
      high: "42.3",
      low: "41.5",
      avgPrice: "41.9"
    },
    technical: {
      rsi: 42.1,
      macd: "Neutral",
      ma20: "At",
      support: "40.0",
      resistance: "44.0"
    },
    recommendation: "HOLD",
    sector: "Conglomerate"
  }
];

const getTrendIcon = (trend: string) => {
  return trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />;
};

const getRecommendationColor = (rec: string) => {
  switch (rec) {
    case "STRONG_BUY": return "text-emerald-300 bg-emerald-500/20 border-emerald-400/50";
    case "BUY": return "text-blue-300 bg-blue-500/20 border-blue-400/50";
    case "HOLD": return "text-amber-300 bg-amber-500/20 border-amber-400/50";
    case "SELL": return "text-red-300 bg-red-500/20 border-red-400/50";
    default: return "text-slate-300 bg-slate-500/20 border-slate-400/50";
  }
};

const getRecommendationIcon = (rec: string) => {
  switch (rec) {
    case "STRONG_BUY": return <ArrowUpRight className="w-3 h-3" />;
    case "BUY": return <TrendingUp className="w-3 h-3" />;
    case "HOLD": return <Minus className="w-3 h-3" />;
    case "SELL": return <ArrowDownRight className="w-3 h-3" />;
    default: return <AlertCircle className="w-3 h-3" />;
  }
};

export function QuickAnalysis({ onViewDetails }: QuickAnalysisProps) {
  const [selectedStock, setSelectedStock] = useState("YTC");
  const [activeTab, setActiveTab] = useState("overview");

  const selectedData = stockData.find(stock => stock.code === selectedStock) || stockData[0];

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {/* Stock Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 mb-6 items-stretch">
          {stockData.map((stock) => (
            <Card
              key={stock.code}
              className={`h-full cursor-pointer transition-all hover:shadow-lg border-2 ${selectedStock === stock.code
                ? "ring-2 ring-cyan-400 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-cyan-400/50"
                : "hover:bg-gradient-to-br hover:from-slate-700/50 hover:to-slate-600/50 bg-gradient-to-br from-slate-800/40 to-slate-700/40 border-blue-400/20 hover:border-blue-400/40"
                }`}
              onClick={() => setSelectedStock(stock.code)}
            >
              <CardContent className="p-3 text-center h-full flex flex-col">
                {/* Mã cổ phiếu */}
                <div className="text-sm font-medium mb-1 text-white">{stock.code}</div>
                {/* Giá */}
                <div className="text-xs text-slate-300 mb-1">{stock.price}</div>
                {/* % thay đổi */}
                <div
                  className={`text-xs flex items-center justify-center gap-1 ${stock.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                >
                  {getTrendIcon(stock.trend)}
                  <span>{stock.change}</span>
                </div>

                {/* Badge khuyến nghị */}
                <div className="mt-auto">
                  <Badge
                    variant="outline"
                    className={`inline-flex items-center justify-center 
                            w-full px-2 rounded-md text-xs font-semibold
                            leading-tight whitespace-normal text-center h-auto
                            ${getRecommendationColor(stock.recommendation)}`}
                  >
                    {getRecommendationIcon(stock.recommendation)}

                    {/* Text hiển thị khuyến nghị */}
                    <span className="ml-1 break-words">
                      {stock.recommendation === "STRONG_BUY" ? (
                        <>
                          MUA <br /> MẠNH
                        </>
                      ) : stock.recommendation === "BUY" ? (
                        "MUA"
                      ) : stock.recommendation === "HOLD" ? (
                        "GIỮ"
                      ) : (
                        "BÁN"
                      )}
                    </span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Analysis Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-2 ">
        {/* Chart and Visual Section */}
        <div className="lg:col-span-2">
          <CardContent className="p-4 pt-0">
            {/* Stock Chart */}
            <div className="flex-1 h-full bg-gradient-to-br from-slate-700/30 to-slate-600/30 rounded-lg p-4 mb-4 border border-blue-400/20">
              <h1 className="flex items-center justify-center gap-2 text-lg font-bold text-white mb-4">
                Tổng quan
              </h1>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-white">{selectedData.code} - {selectedData.name}</h3>
                  <Badge variant="outline" className="text-xs text-cyan-300 border-cyan-400/50 bg-cyan-400/10">
                    {selectedData.sector}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Cập nhật: 14:32</span>
                </div>

              </div>

              <ImageWithFallback
                src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHN8ZW58MXx8fHwxNzU2MDkxMDQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt={`Biểu đồ giao dịch ${selectedData.code}`}
                className="w-full h-48 object-cover rounded"
              />

              <div className="mt-3 flex items-center justify-between">
                <Badge variant="secondary" className="flex items-center gap-1 bg-blue-500/20 text-blue-300 border-blue-400/50">
                  <Zap className="w-3 h-3" />
                  Biểu đồ {selectedData.code}
                </Badge>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>1D</span>
                  <span className="text-cyan-400 font-medium">1W</span>
                  <span>1M</span>
                  <span>3M</span>
                  <span>1Y</span>
                </div>
              </div>
            </div>

            {/* Simple Text Analysis */}
            <div className="space-y-4 h-full">
              <h4 className="text-lg font-medium text-white flex items-center gap-2 h-full ">
                <Activity className="w-4 h-4 text-cyan-400" />
                Thông tin phân tích
              </h4>

              <div className="bg-gradient-to-r from-slate-700/30 to-slate-600/30 rounded-lg border border-blue-400/20 p-4">
                <div className="space-y-2 text-sm leading-relaxed">
                  <p className="text-slate-300">
                    <span className="text-slate-400">RSI (14):</span>
                    <span className={`ml-2 font-medium ${selectedData.technical.rsi > 70 ? 'text-red-400' : selectedData.technical.rsi < 30 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                      {selectedData.technical.rsi}
                      {selectedData.technical.rsi > 70 ? ' (Quá mua)' : selectedData.technical.rsi < 30 ? ' (Quá bán)' : ' (Trung tính)'}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    <span className="text-slate-400">MACD:</span>
                    <span className={`ml-2 font-medium ${selectedData.technical.macd.includes('Bullish') ? 'text-emerald-400' : selectedData.technical.macd.includes('Bearish') ? 'text-red-400' : 'text-yellow-400'}`}>
                      {selectedData.technical.macd}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    <span className="text-slate-400">Đường trung bình 20:</span>
                    <span className={`ml-2 font-medium ${selectedData.technical.ma20 === 'Above' ? 'text-emerald-400' : selectedData.technical.ma20 === 'Below' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {selectedData.technical.ma20 === 'Above' ? 'Trên MA20' : selectedData.technical.ma20 === 'Below' ? 'Dưới MA20' : 'Tại MA20'}
                    </span>
                  </p>

                  <p className="text-slate-300">
                    <span className="text-slate-400">Vùng hỗ trợ:</span>
                    <span className="ml-2 font-medium text-cyan-400">{selectedData.technical.support}</span>
                    <span className="text-slate-400"> • </span>
                    <span className="text-slate-400">Vùng kháng cự:</span>
                    <span className="ml-1 font-medium text-orange-400">{selectedData.technical.resistance}</span>
                  </p>

                  <p className="text-slate-300">
                    <span className="text-slate-400">Khối lượng giao dịch:</span>
                    <span className="ml-2 font-medium text-white">{selectedData.volume}</span>
                    <span className="text-slate-400"> • </span>
                    <span className="text-slate-400">Giá trị:</span>
                    <span className="ml-1 font-medium text-white">{selectedData.value}</span>
                  </p>

                  <div className="pt-2 border-t border-slate-600/50  ">
                    <p className="text-slate-300">
                      <span className="text-slate-400">Khuyến nghị đầu tư:</span>
                      <span className={`ml-2 font-medium ${selectedData.recommendation === 'STRONG_BUY' ? 'text-emerald-400' : selectedData.recommendation === 'BUY' ? 'text-blue-400' : selectedData.recommendation === 'SELL' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {selectedData.recommendation === 'STRONG_BUY' ? 'MUA MẠNH' :
                          selectedData.recommendation === 'BUY' ? 'MUA' :
                            selectedData.recommendation === 'SELL' ? 'BÁN' : 'GIỮ'}
                      </span>
                      <span className="text-slate-400"> cho nhóm </span>
                      <span className="font-medium text-cyan-400">{selectedData.sector}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* Action and Summary Section */}
        <div className="space-y-4">
          {/* Stock Summary Card */}
          <Card className="bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border border-blue-400/30 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-lg text-white">{selectedData.code}</h3>
                  <p className="text-sm text-slate-400">{selectedData.name}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`${getRecommendationColor(selectedData.recommendation)} font-medium`}
                >
                  {getRecommendationIcon(selectedData.recommendation)}
                  <span className="ml-1 whitespace-normal">
                    {selectedData.recommendation === "STRONG_BUY" ? "MUA MẠNH" :
                      selectedData.recommendation === "BUY" ? "MUA" :
                        selectedData.recommendation === "HOLD" ? "GIỮ" : "BÁN"}
                  </span>
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-400">Giá hiện tại:</span>
                  <div className="text-right">
                    <div className={`font-medium text-lg ${selectedData.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {selectedData.price}
                    </div>
                    <div className={`text-sm flex items-center gap-1 ${selectedData.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {getTrendIcon(selectedData.trend)}
                      <span>{selectedData.change} ({selectedData.changePercent})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-400/20 flex items-center justify-center">
                  {/* <Link href={`/viewdetails/${selectedData.code}`}
                    // onClick={() => onViewDetails(selectedData.code)}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0">
                    <Eye className="w-4 h-4 mr-2" />
                    <span>Xem chi tiết</span>
                  </Link> */}
                  <Link
                    href={`/viewdetails/${selectedData.code}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-md transition-colors duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Xem chi tiết</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-700/40 border border-blue-400/20">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3 text-white">Thống kê nhanh</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cao nhất trong ngày:</span>
                  <span className="text-emerald-400">{selectedData.session.high}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Thấp nhất trong ngày:</span>
                  <span className="text-red-400">{selectedData.session.low}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Giá mở cửa:</span>
                  <span className="text-white">{selectedData.session.open}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khối lượng:</span>
                  <span className="text-cyan-400">{selectedData.volume}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

