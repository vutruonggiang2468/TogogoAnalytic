'use client'

import { Card, CardContent } from "..//../components/ui/card";
import { Badge } from "..//../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { StockChart } from "..//../components/StockChart";
import { ShareholderStructure } from "../../components/ShareholderStructure";
import { Subsidiaries } from "../../components/Subsidiaries";
import { calculateMarketPosition } from "../../components/helpers/detailedAnalysisHelpers";
import {
  BarChart,
  DollarSign,
  Users,
  TrendingUpIcon,
  Building2,
  PieChart,
  Crown,
  Leaf,
  Shield,
  Target,
  Activity,
  LineChart,
  CheckCircle
} from "lucide-react";

interface TabsDetailProps {
  stock: any; // Replace with proper type based on getStockAnalysis return type
  data: any;
  isPositive: boolean;
}

export default function TabsDetail({ stock, data, isPositive }: TabsDetailProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4 bg-slate-800/60 border border-blue-400/30 p-1">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-cyan-400 text-xs py-2"
        >
          <BarChart className="w-4 h-4 mr-1" />
          Tổng quan
        </TabsTrigger>
        <TabsTrigger
          value="financials"
          className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-cyan-400 text-xs py-2"
        >
          <DollarSign className="w-4 h-4 mr-1" />
          Tài chính
        </TabsTrigger>
        <TabsTrigger
          value="governance"
          className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-cyan-400 text-xs py-2"
        >
          <Users className="w-4 h-4 mr-1" />
          Quản trị
        </TabsTrigger>
        <TabsTrigger
          value="analysis"
          className="data-[state=active]:bg-blue-500/20 text-white data-[state=active]:text-cyan-400 text-xs py-2"
        >
          <TrendingUpIcon className="w-4 h-4 mr-1" />
          Phân tích
        </TabsTrigger>
      </TabsList>

      {/* Full Width Content */}
      <div className="w-full">
        <TabsContent value="overview" className="space-y-6 mt-0">
          {/* Stock Chart - Full Width */}
          <StockChart
            stockCode={stock.code}
            currentPrice={stock.currentPrice}
            change={stock.change}
            changePercent={stock.changePercent}
            isPositive={isPositive}
          />

          {/* Company Overview - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Thông tin doanh nghiệp
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-xs text-slate-400">Tên đầy đủ</div>
                    <div className="text-white">{data?.company.company_name}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Thành lập</div>
                      <div className="text-white">
                        {data?.company.history
                          ? data.company.history.match(/\d{4}/)?.[0] //lấy năm đầu tiên trong chuỗi
                          : '-'}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-xs text-slate-400">Hồ sơ doanh nghiệp</div>
                    <div className="text-white text-sm leading-relaxed">{data?.company.company_profile}</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-xs text-slate-400">Ngành</div>
                    <div className="text-white">{data?.company.industry}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Nhân viên</div>
                      <div className="text-white">{data?.company.no_employees}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Website</div>
                      <div className="text-cyan-400 text-xs">{data?.company.website}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Sàn giao dịch</div>
                      <div className="text-cyan-400 text-xs">{data?.exchange}</div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Tổng số cổ phần phát hành</div>
                      <div className="text-white">
                        {data?.company.financial_ratio_issue_share
                          ? `${Number(data.company.financial_ratio_issue_share).toLocaleString('vi-VN')} cổ phiếu`
                          : '-'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xs text-slate-400">Vốn điều lệ</div>
                      <div className="text-white">
                        {data?.company.charter_capital
                          ? Number(data.company.charter_capital).toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })
                          : '-'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {/* <div className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-xs text-slate-400">Trụ sở chính</div>
                    <div className="text-white">{stock.detailedInfo.companyOverview.headquarters}</div>
                  </div> */}
                </div>
              </div>

              {/* Key Products - Full Width */}
              <div className="mt-4">
                <div className="text-sm text-slate-400 mb-3">Sản phẩm/Dịch vụ chính:</div>
                <div className="flex flex-wrap gap-2">
                  {stock.detailedInfo.businessActivities.keyProducts.map((product: string, index: number) => (
                    <Badge key={index} className="bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 text-sm px-3 py-1">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Segments - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Phân khúc kinh doanh
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stock.detailedInfo.businessSegments.map((segment: any, index: number) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{segment.segment}</h4>
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                        {segment.growth}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="text-slate-400">Doanh thu</div>
                        <div className="font-semibold text-white">{segment.revenue}</div>
                        <div className="text-xs text-slate-500">{segment.revenueShare}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Lợi nhuận</div>
                        <div className="font-semibold text-emerald-400">{segment.profit}</div>
                        <div className="text-xs text-slate-500">{segment.profitShare}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Mô tả</div>
                        <div className="text-xs text-slate-300">{segment.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-6 mt-0">
          {/* Financial Highlights - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Kết quả tài chính
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Doanh thu</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {stock.detailedInfo.financialHighlights.revenueGrowth}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white">{stock.detailedInfo.financialHighlights.revenue}</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400 text-sm">Lợi nhuận ròng</span>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                      {stock.detailedInfo.financialHighlights.profitGrowth}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">{stock.detailedInfo.financialHighlights.netIncome}</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">Tổng tài sản</div>
                  <div className="text-2xl font-bold text-blue-400">{stock.detailedInfo.financialHighlights.totalAssets}</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">Biên lợi nhuận</div>
                  <div className="text-2xl font-bold text-purple-400">{stock.detailedInfo.financialHighlights.profitMargin}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance History - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Hiệu suất lịch sử
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {(Object.entries(stock.performance) as [string, string][]).map(([period, value]) => (
                  <div key={period} className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-xs text-slate-400 mb-1">{period}</div>
                    <div className={`font-bold ${value.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-6 mt-0">
          {/* Shareholder Structure - Full Width */}
          <ShareholderStructure shareholderData={stock.detailedInfo.shareholderStructure} />

          {/* Management Team - Full Width Grid */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Ban lãnh đạo
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stock.detailedInfo.managementTeam.map((member: any, index: number) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').pop()?.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white text-sm">{member.name}</h4>
                        <div className="text-xs text-orange-400">{member.position}</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Kinh nghiệm: {member.experience}</div>
                      <div>Học vấn: {member.education}</div>
                      <div>Nhiệm kỳ: {member.tenure}</div>
                    </div>
                    <div className="mt-3 text-xs text-slate-300 bg-slate-600/30 p-2 rounded">
                      {member.background}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subsidiaries - Full Width */}
          <Subsidiaries subsidiaries={stock.detailedInfo.subsidiaries} />

          {/* ESG & Risk - Full Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 border border-blue-400/30">
              <CardContent className="p-4">
                <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2 text-sm">
                  <Leaf className="w-4 h-4" />
                  ESG Rating
                </h3>
                <div className="text-center">
                  <div className="text-xl font-bold text-emerald-400 mb-2">
                    {stock.detailedInfo.esgInfo.overallRating}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <div className="text-slate-400">E</div>
                      <div className="font-bold text-emerald-400">{stock.detailedInfo.esgInfo.environmentalScore}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">S</div>
                      <div className="font-bold text-emerald-400">{stock.detailedInfo.esgInfo.socialScore}</div>
                    </div>
                    <div>
                      <div className="text-slate-400">G</div>
                      <div className="font-bold text-emerald-400">{stock.detailedInfo.esgInfo.governanceScore}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border border-blue-400/30">
              <CardContent className="p-4">
                <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4" />
                  Credit Risk
                </h3>
                <div className="space-y-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-xs w-full justify-center">
                    {stock.detailedInfo.riskAssessment.creditRisk.level}
                  </Badge>
                  <div className="text-xs text-slate-400">
                    NPL: {stock.detailedInfo.riskAssessment.creditRisk.nplRatio}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border border-blue-400/30">
              <CardContent className="p-4">
                <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4" />
                  Market Risk
                </h3>
                <div className="space-y-2">
                  <Badge className="bg-yellow-500/20 text-yellow-400 text-xs w-full justify-center">
                    {stock.detailedInfo.riskAssessment.marketRisk.level}
                  </Badge>
                  <div className="text-xs text-slate-400">
                    VaR: {stock.detailedInfo.riskAssessment.marketRisk.var}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border border-blue-400/30">
              <CardContent className="p-4">
                <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4" />
                  52W Range
                </h3>
                <div className="space-y-2">
                  <div className="relative">
                    <div className="h-2 bg-gradient-to-r from-red-400/30 via-yellow-400/30 to-emerald-400/30 rounded-full"></div>
                    <div
                      className="absolute top-0 h-2 w-1 bg-white rounded-full transform -translate-x-1/2"
                      style={{ left: `${calculateMarketPosition(stock.currentPrice, stock.additionalMetrics.week52Low, stock.additionalMetrics.week52High)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{stock.additionalMetrics.week52Low}</span>
                    <span>{stock.additionalMetrics.week52High}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6 mt-0">
          {/* Investment Recommendation - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Khuyến nghị đầu tư
                <Badge className={`${stock?.detailedInfo.investment.recommendation === "MUA MẠNH" ? "bg-emerald-500" :
                  stock?.detailedInfo.investment.recommendation === "MUA" ? "bg-blue-500" :
                    "bg-yellow-500"
                  } text-white`}>
                  {stock?.detailedInfo.investment.recommendation}
                </Badge>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-slate-700/30 to-emerald-500/20 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Mục tiêu giá</div>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{stock?.detailedInfo.investment.priceTarget}</div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 text-sm">
                    {stock?.detailedInfo.investment.upside} upside
                  </Badge>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">Khung thời gian</div>
                  <div className="font-semibold text-white text-lg">{stock?.detailedInfo.investment.timeHorizon}</div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-slate-400 text-sm mb-2">Luận điểm đầu tư:</div>
                  <div className="space-y-2">
                    {stock?.detailedInfo.investment.investmentThesis.slice(0, 3).map((thesis: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{thesis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analyst Consensus - Full Width */}
          <Card className="bg-slate-800/60 border border-blue-400/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Đồng thuận phân tích viên
                <Badge className="bg-blue-500/20 text-blue-400">
                  {stock?.detailedInfo.analystConsensus.totalAnalysts} chuyên gia
                </Badge>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                  <div className="text-sm text-slate-400 mb-1">Mục tiêu giá TB</div>
                  <div className="text-2xl font-bold text-blue-400">{stock.detailedInfo.analystConsensus.avgPriceTarget}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {stock.detailedInfo.analystConsensus.priceTargetLow} - {stock.detailedInfo.analystConsensus.priceTargetHigh}
                  </div>
                </div>

                <div className="p-3 bg-emerald-500/20 rounded-lg text-center">
                  <div className="text-emerald-400 text-sm">Mua mạnh</div>
                  <div className="text-emerald-400 font-bold text-xl">{stock.detailedInfo.analystConsensus.strongBuy}</div>
                </div>

                <div className="p-3 bg-blue-500/20 rounded-lg text-center">
                  <div className="text-blue-400 text-sm">Mua</div>
                  <div className="text-blue-400 font-bold text-xl">{stock.detailedInfo.analystConsensus.buy}</div>
                </div>

                <div className="p-3 bg-yellow-500/20 rounded-lg text-center">
                  <div className="text-yellow-400 text-sm">Giữ</div>
                  <div className="text-yellow-400 font-bold text-xl">{stock.detailedInfo.analystConsensus.hold}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
}
