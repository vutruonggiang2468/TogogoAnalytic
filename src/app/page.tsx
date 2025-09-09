'use client'
import Image from "next/image";
import { useState } from "react";
// import { DetailedAnalysisPage } from "./viewdetails/components/DetailedAnalysisPage";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import { Header } from "./components/Header";
import { DeepAnalysisPage } from "./components/DeepAnalysisPage";
import { Clock, Eye, MessageCircle, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { NewsDetailPage } from "./components/NewDetailPage";
import { QuickAnalysis } from "./components/QuickAnalysis";
import { TogogoTradingBotCompact } from "./components/TogogoTradingBotCompact";
import { NewsColumns } from "./components/NewsColumns";
import { EconomicCalendar } from "./components/EconomicCalendar";
import { NewsSidebar } from "./components/NewsSidebar";
import { DetailedAnalysisPage } from "./components/DetailedAnalysisPage";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "details" | "news-detail" | "deep-analysis">("home");
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [selectedArticle, setSelectedArticle] = useState<number>(1);

  const handleViewDetails = (stockCode: string) => {
    setSelectedStock(stockCode);
    setCurrentView("details");
  };

  const handleViewNews = (articleId: number) => {
    setSelectedArticle(articleId);
    setCurrentView("news-detail");
  };

  const handleViewDeepAnalysis = () => {
    setCurrentView("deep-analysis");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedStock("");
    setSelectedArticle(1);
  };

  // Render different views based on current state
  if (currentView === "details") {
    return (
      <DetailedAnalysisPage
        stockCode={selectedStock}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentView === "news-detail") {
    return (
      <NewsDetailPage
        articleId={selectedArticle}
        onBack={handleBackToHome}
        onViewDetails={handleViewDetails}
      />
    );
  }

  if (currentView === "deep-analysis") {
    return (
      <DeepAnalysisPage
        onBack={handleBackToHome}
      />
    );
  }
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E1B36' }}>
      {/* Header */}
      <Header />

      {/* Add top padding to account for fixed header (smaller on mobile) */}
      <div className="pt-16 md:pt-32">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Deep Analysis CTA Section - Enhanced with unified colors */}
          <Card className="mb-8 shadow-2xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-2 border-blue-500/30 backdrop-blur-sm relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-600/10 to-teal-600/10 animate-pulse"></div>

          </Card>

          {/* Quick Analysis Section - Enhanced */}
          <Card className="mb-8 shadow-lg bg-gradient-to-r from-slate-800/40 to-slate-700/40 border border-blue-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">PHÂN TÍCH NHANH</h2>
                  {/* <Badge variant="outline" className="ml-3 text-cyan-400 border-cyan-400/50 bg-cyan-400/10 px-3 py-1 whitespace-normal flex-wrap items-start leading-tight text-left max-w-[96px] shrink sm:whitespace-nowrap sm:flex-nowrap sm:max-w-none">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2 mt-0.5 sm:mt-0"></div>
                    Cập nhật liên tục
                  </Badge> */}
                  <Badge
                    variant="outline"
                    className="ml-3 text-cyan-400 border-cyan-400/50 bg-cyan-400/10 px-3 py-1 flex items-center leading-tight"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></div>
                    Cập nhật liên tục
                  </Badge>

                </div>
                <div className="text-sm text-slate-400 w-full sm:w-auto mt-2 sm:mt-0">
                  Cập nhật lần cuối: 14:32 hôm nay
                </div>
              </div>
              <QuickAnalysis onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>

          {/* Trading Bot Suggestions Section - Enhanced */}
          <Card className="mb-8 shadow-lg bg-gradient-to-r from-slate-800/40 to-slate-700/40 border border-teal-400/30 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-8 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">GỢI Ý TRADING BOT</h2>
                <Badge variant="outline" className="ml-3 text-teal-400 border-teal-400/50 bg-teal-400/10 px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-2" />
                  AI v2.1
                </Badge>
              </div>
              <TogogoTradingBotCompact onViewDetails={handleViewDetails} />
            </CardContent>
          </Card>

          {/* Economic Calendar Section - New */}
          <div className="mb-8">
            <EconomicCalendar />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area - 3 columns */}
            <div className="lg:col-span-3">
              <NewsColumns onViewNews={handleViewNews} />

              {/* Layout theo wireframe - Enhanced with unified colors */}
              <div className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left column - spans 2 columns */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Tin tức mới nhất - Enhanced */}
                    <Card className="border border-blue-400/20 bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1.5 h-8 bg-gradient-to-b from-sky-400 to-blue-500 rounded-full"></div>
                          <h3 className="text-xl font-bold text-white">Tin tức mới nhất</h3>
                          <Badge className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-3 py-1 text-xs">
                            Live
                          </Badge>
                        </div>

                        {/* Featured news items - Enhanced */}
                        <div className="space-y-4">
                          <div className="p-5 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-xl border border-blue-400/20 hover:border-blue-400/40 cursor-pointer transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                              <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-3 text-white text-lg leading-tight">VN-Index vượt mốc 1,280 điểm trong phiên chiều với thanh khoản cao</h4>
                                <div className="flex items-center gap-6 text-sm text-slate-400">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <span>2 giờ trước</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-400" />
                                    <span>12.5K</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-teal-400" />
                                    <span>89</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-xl border border-blue-400/20 hover:border-blue-400/40 cursor-pointer transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                              <div className="w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-3 text-white text-lg leading-tight">Khối ngoại mua ròng 500 tỷ đồng, tập trung vào nhóm ngân hàng</h4>
                                <div className="flex items-center gap-6 text-sm text-slate-400">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <span>3 giờ trước</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-400" />
                                    <span>8.2K</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-teal-400" />
                                    <span>56</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-5 bg-gradient-to-r from-slate-700/40 to-slate-600/40 rounded-xl border border-blue-400/20 hover:border-blue-400/40 cursor-pointer transition-all duration-300 hover:shadow-lg">
                            <div className="flex items-start gap-4">
                              <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full mt-2 flex-shrink-0 shadow-lg"></div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-3 text-white text-lg leading-tight">HPG công bố kết quả kinh doanh Q4 vượt kỳ vọng</h4>
                                <div className="flex items-center gap-6 text-sm text-slate-400">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <span>4 giờ trước</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-blue-400" />
                                    <span>6.1K</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-teal-400" />
                                    <span>34</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Heading section - Enhanced */}
                    <Card className="border border-teal-400/20 bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-8">
                        <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                          Market Insights
                        </h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                          Thị trường chứng khoán Việt Nam đang cho thấy những dấu hiệu tích cực với sự phục hồi mạnh mẽ
                          của các nhóm cổ phiếu lớn. Thanh khoản gia tăng và dòng tiền từ khối ngoại tiếp tục đổ vào
                          thị trường tạo động lực tích cực cho xu hướng tăng trong các phiên giao dịch tới.
                        </p>
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-lg border border-blue-400/20">
                          <p className="text-cyan-300 text-sm">
                            <strong>Điểm nhấn:</strong> VN-Index có thể thử thách vùng kháng cự 1,300 điểm trong tuần tới
                            nếu duy trì được momentum hiện tại.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right column - spans 1 column - Enhanced */}
                  <div className="lg:col-span-1 space-y-6">
                    {/* Post card 1 - Enhanced */}
                    <Card className="border border-cyan-400/20 bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h4 className="font-semibold mb-4 text-white text-lg">Trending Stocks</h4>
                          <div className="bg-gradient-to-br from-slate-700/40 to-slate-600/40 rounded-xl p-6 border border-blue-400/20">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-300">VCB</span>
                                <span className="text-emerald-400 font-semibold">+2.4%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-300">TCB</span>
                                <span className="text-emerald-400 font-semibold">+3.1%</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-300">HPG</span>
                                <span className="text-emerald-400 font-semibold">+5.2%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Post card 2 - Enhanced */}
                    <Card className="border border-sky-400/20 bg-gradient-to-br from-slate-800/40 to-slate-700/40 backdrop-blur-sm shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-center">
                          <h4 className="font-semibold mb-4 text-white text-lg">Market Sentiment</h4>
                          <div className="bg-gradient-to-br from-slate-700/40 to-slate-600/40 rounded-xl p-6 border border-sky-400/20">
                            <div className="flex items-center justify-center mb-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-8 h-8 text-white" />
                              </div>
                            </div>
                            <p className="text-emerald-400 font-semibold text-lg">Bullish</p>
                            <p className="text-slate-400 text-sm mt-2">
                              Tâm lý thị trường tích cực
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar - Enhanced with unified colors */}
            <div className="lg:col-span-1 space-y-6">
              {/* Compact Market Overview - Enhanced */}
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border border-blue-400/30 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Tổng quan thị trường</h3>
                  </div>

                  {/* Key indices in enhanced format */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-blue-400/20">
                      <div>
                        <div className="text-base font-semibold text-white">VN-Index</div>
                        <div className="text-sm text-slate-400">Chỉ số chung</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-white">1,278.45</div>
                        <div className="text-sm text-emerald-400 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          +0.97%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-blue-400/20">
                      <div>
                        <div className="text-base font-semibold text-white">HNX-Index</div>
                        <div className="text-sm text-slate-400">Sàn HNX</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-white">234.12</div>
                        <div className="text-sm text-red-400 flex items-center gap-1">
                          <TrendingDown className="w-4 h-4" />
                          -0.79%
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-blue-400/20">
                      <div>
                        <div className="text-base font-semibold text-white">Khối ngoại</div>
                        <div className="text-sm text-slate-400">Giao dịch ròng</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-emerald-400">+127B</div>
                        <div className="text-sm text-emerald-400">Mua ròng</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl border border-blue-400/20">
                      <div>
                        <div className="text-base font-semibold text-white">Thanh khoản</div>
                        <div className="text-sm text-slate-400">Tổng GTGD</div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-white">12,345B</div>
                        <div className="text-sm text-cyan-400">+8.5%</div>
                      </div>
                    </div>
                  </div>

                  {/* Market status indicator - Enhanced */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-400">Trạng thái thị trường:</span>
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1">
                        <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse mr-2"></div>
                        Mở cửa
                      </Badge>
                    </div>
                    <div className="text-sm text-emerald-400/80">
                      Phiên giao dịch • 14:32 (GMT+7)
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue with original NewsSidebar content */}
              <NewsSidebar onViewDetails={handleViewDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
