"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, Shield, Database, Network, CheckCircle, AlertTriangle } from "lucide-react"

// Performance data based on the research paper
const computationalData = [
  { scheme: "BIoMTAKE", iomt: 0.387, dc: 0.518, total: 1.181 },
  { scheme: "Chen et al.", iomt: 0.637, dc: 1.338, total: 1.975 },
  { scheme: "Wang et al.", iomt: 0.763, dc: 0.949, total: 1.713 },
  { scheme: "Bera et al. (2020)", iomt: 1.493, dc: 0.693, total: 1.386 },
  { scheme: "Das et al.", iomt: 1.042, dc: 1.042, total: 2.084 },
  { scheme: "Bera et al. (2021)", iomt: 1.076, dc: 1.076, total: 2.151 },
]

const communicationData = [
  { scheme: "BIoMTAKE", msg1: 544, msg2: 288, total: 832 },
  { scheme: "Chen et al.", msg1: 544, msg2: 2144, total: 2688 },
  { scheme: "Wang et al.", msg1: 928, msg2: 544, total: 1472 },
  { scheme: "Bera et al. (2020)", msg1: 864, msg2: 832, total: 1696 },
  { scheme: "Das et al.", msg1: 1664, msg2: 1632, total: 3296 },
  { scheme: "Bera et al. (2021)", msg1: 1472, msg2: 1568, total: 3040 },
]

const cryptoOperationsData = [
  { operation: "Hash Operations", count: 8, time: 0.51, percentage: 43.2 },
  { operation: "ECC Point Multiplication", count: 3, time: 0.279, percentage: 23.6 },
  { operation: "ASCON Encryption", count: 2, time: 0.165, percentage: 14.0 },
  { operation: "ASCON Decryption", count: 3, time: 0.131, percentage: 11.1 },
  { operation: "ECC Point Addition", count: 2, time: 0.006, percentage: 0.5 },
  { operation: "Other Operations", count: 5, time: 0.09, percentage: 7.6 },
]

const blockchainPerformanceData = [
  { time: "00:00", tps: 2.1, latency: 1.2, blockTime: 3.5 },
  { time: "04:00", tps: 2.8, latency: 1.1, blockTime: 3.2 },
  { time: "08:00", tps: 3.5, latency: 0.9, blockTime: 2.8 },
  { time: "12:00", tps: 4.2, latency: 0.8, blockTime: 2.5 },
  { time: "16:00", tps: 3.8, latency: 1.0, blockTime: 2.9 },
  { time: "20:00", tps: 3.2, latency: 1.1, blockTime: 3.1 },
]

const securityFeaturesData = [
  {
    feature: "Mutual Authentication",
    biomtake: true,
    chen: true,
    wang: true,
    bera2020: true,
    das: true,
    bera2021: true,
  },
  { feature: "Forward Secrecy", biomtake: true, chen: false, wang: true, bera2020: true, das: false, bera2021: true },
  { feature: "Anonymity", biomtake: true, chen: false, wang: false, bera2020: true, das: true, bera2021: true },
  { feature: "Replay Protection", biomtake: true, chen: true, wang: true, bera2020: true, das: true, bera2021: true },
  { feature: "MITM Prevention", biomtake: true, chen: true, wang: false, bera2020: true, das: true, bera2021: true },
  {
    feature: "Device Capture Resistance",
    biomtake: true,
    chen: false,
    wang: true,
    bera2020: false,
    das: false,
    bera2021: true,
  },
  { feature: "Offline TA", biomtake: true, chen: false, wang: false, bera2020: false, das: false, bera2021: false },
]

const realTimeMetrics = [
  { metric: "Authentication Success Rate", value: 99.7, target: 99.5, trend: "up" },
  { metric: "Average Response Time", value: 1.18, target: 1.5, trend: "down" },
  { metric: "Blockchain TPS", value: 3.2, target: 3.0, trend: "up" },
  { metric: "Network Uptime", value: 99.9, target: 99.0, trend: "up" },
  { metric: "Device Registration Rate", value: 95.4, target: 90.0, trend: "up" },
  { metric: "Error Rate", value: 0.3, target: 1.0, trend: "down" },
]

const COLORS = ["#4f46e5", "#3b82f6", "#10b981", "#f59e0b", "#dc2626", "#8b5cf6"]

export function PerformanceAnalytics() {
  const [timeRange, setTimeRange] = useState("24h")
  const [selectedMetric, setSelectedMetric] = useState("computational")

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-chart-3" />
    ) : (
      <TrendingDown className="h-4 w-4 text-chart-5" />
    )
  }

  const getPerformanceStatus = (value: number, target: number, higherIsBetter = true) => {
    const isGood = higherIsBetter ? value >= target : value <= target
    return isGood ? (
      <CheckCircle className="h-4 w-4 text-chart-3" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-chart-4" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-black text-2xl text-foreground">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive performance analysis of the BIoMTAKE authentication system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Real-time Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {realTimeMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.metric}</span>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">
                    {metric.value}
                    {metric.metric.includes("Rate") || metric.metric.includes("Uptime")
                      ? "%"
                      : metric.metric.includes("Time")
                        ? "ms"
                        : metric.metric.includes("TPS")
                          ? ""
                          : "%"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Target: {metric.target}
                    {metric.metric.includes("Rate") || metric.metric.includes("Uptime")
                      ? "%"
                      : metric.metric.includes("Time")
                        ? "ms"
                        : metric.metric.includes("TPS")
                          ? ""
                          : "%"}
                  </p>
                </div>
                {getPerformanceStatus(
                  metric.value,
                  metric.target,
                  !metric.metric.includes("Time") && !metric.metric.includes("Error"),
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="computational" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="computational">Computational</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="computational" className="space-y-6">
          {/* Computational Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Clock className="mr-2 h-5 w-5 text-chart-1" />
                Computational Performance Comparison
              </CardTitle>
              <CardDescription>
                Comparison of computation times across different authentication schemes (in milliseconds)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={computationalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scheme" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: "Time (ms)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="iomt" stackId="a" fill="#4f46e5" name="IoMT Device" />
                  <Bar dataKey="dc" stackId="a" fill="#3b82f6" name="Data Collector" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cryptographic Operations Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Cryptographic Operations Breakdown</CardTitle>
                <CardDescription>Distribution of computation time by operation type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cryptoOperationsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {cryptoOperationsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Operation Details</CardTitle>
                <CardDescription>Detailed breakdown of cryptographic operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cryptoOperationsData.map((op, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{op.operation}</span>
                        <span className="font-mono">{op.time}ms</span>
                      </div>
                      <Progress value={op.percentage} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{op.count} operations</span>
                        <span>{op.percentage}% of total time</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Improvements */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Performance Improvements</CardTitle>
              <CardDescription>BIoMTAKE performance compared to existing schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-3">40.2%</div>
                  <p className="text-sm text-muted-foreground">Faster than average</p>
                  <p className="text-xs text-muted-foreground">Computational time reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-1">67.3%</div>
                  <p className="text-sm text-muted-foreground">Lower overhead</p>
                  <p className="text-xs text-muted-foreground">Communication cost reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-chart-2">99.7%</div>
                  <p className="text-sm text-muted-foreground">Success rate</p>
                  <p className="text-xs text-muted-foreground">Authentication reliability</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          {/* Communication Overhead Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Network className="mr-2 h-5 w-5 text-chart-2" />
                Communication Overhead Comparison
              </CardTitle>
              <CardDescription>
                Message sizes and total communication overhead across different schemes (in bits)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={communicationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scheme" angle={-45} textAnchor="end" height={100} />
                  <YAxis label={{ value: "Bits", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="msg1" stackId="a" fill="#3b82f6" name="Message 1" />
                  <Bar dataKey="msg2" stackId="a" fill="#10b981" name="Message 2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Message Structure Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">BIoMTAKE Message Structure</CardTitle>
                <CardDescription>Breakdown of message components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Message 1 (IoMT → DC): 544 bits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Timestamp (TM_x)</span>
                        <span className="text-sm font-mono">32 bits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Ciphertext (CT_x)</span>
                        <span className="text-sm font-mono">128 bits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Authentication Tag (Tag_x)</span>
                        <span className="text-sm font-mono">128 bits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Device Hash (h(Pb_IM))</span>
                        <span className="text-sm font-mono">256 bits</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Message 2 (DC → IoMT): 288 bits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Timestamp (TM_z)</span>
                        <span className="text-sm font-mono">32 bits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Ciphertext (CT_z)</span>
                        <span className="text-sm font-mono">128 bits</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Authentication Tag (Tag_z)</span>
                        <span className="text-sm font-mono">128 bits</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Network Efficiency Metrics</CardTitle>
                <CardDescription>Communication performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Overhead</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">832 bits</span>
                      <Badge className="bg-chart-3 text-white">Optimal</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Message Efficiency</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">65.4%</span>
                      <Badge className="bg-chart-3 text-white">High</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bandwidth Usage</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">Low</span>
                      <Badge className="bg-chart-3 text-white">Excellent</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Latency Impact</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">Minimal</span>
                      <Badge className="bg-chart-3 text-white">Good</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          {/* Blockchain Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Database className="mr-2 h-5 w-5 text-chart-3" />
                Blockchain Performance Trends
              </CardTitle>
              <CardDescription>Real-time blockchain network performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={blockchainPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tps" stroke="#4f46e5" name="TPS" strokeWidth={2} />
                  <Line type="monotone" dataKey="latency" stroke="#3b82f6" name="Latency (s)" strokeWidth={2} />
                  <Line type="monotone" dataKey="blockTime" stroke="#10b981" name="Block Time (s)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hyperledger Fabric Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Hyperledger Fabric Performance</CardTitle>
                <CardDescription>Network-specific performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Transaction Throughput</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">3.2 TPS</span>
                      <Badge className="bg-chart-3 text-white">Above Target</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Consensus Latency</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">0.9s</span>
                      <Badge className="bg-chart-3 text-white">Optimal</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Block Generation Time</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">2.8s</span>
                      <Badge className="bg-chart-3 text-white">Good</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Endorsement Policy</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">Majority</span>
                      <Badge className="bg-chart-1 text-white">Secure</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Chaincode Performance</CardTitle>
                <CardDescription>Smart contract execution metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">createAsset</span>
                      <span className="font-mono text-sm">5.27s avg</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">readAsset</span>
                      <span className="font-mono text-sm">0.04s avg</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">updateAsset</span>
                      <span className="font-mono text-sm">0.58s avg</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">deleteAsset</span>
                      <span className="font-mono text-sm">0.04s avg</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          {/* Security Features Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-chart-1" />
                Security Features Comparison
              </CardTitle>
              <CardDescription>Comparison of security features across different authentication schemes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Security Feature</th>
                      <th className="text-center p-2">BIoMTAKE</th>
                      <th className="text-center p-2">Chen et al.</th>
                      <th className="text-center p-2">Wang et al.</th>
                      <th className="text-center p-2">Bera et al. (2020)</th>
                      <th className="text-center p-2">Das et al.</th>
                      <th className="text-center p-2">Bera et al. (2021)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityFeaturesData.map((feature, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2 font-medium">{feature.feature}</td>
                        <td className="text-center p-2">
                          {feature.biomtake ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                        <td className="text-center p-2">
                          {feature.chen ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                        <td className="text-center p-2">
                          {feature.wang ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                        <td className="text-center p-2">
                          {feature.bera2020 ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                        <td className="text-center p-2">
                          {feature.das ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                        <td className="text-center p-2">
                          {feature.bera2021 ? (
                            <CheckCircle className="h-4 w-4 text-chart-3 mx-auto" />
                          ) : (
                            <span className="text-muted-foreground">✗</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Security Analysis Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Formal Security Analysis</CardTitle>
                <CardDescription>Scyther tool verification results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Secrecy Claims</span>
                    <Badge className="bg-chart-3 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Weak Agreement</span>
                    <Badge className="bg-chart-3 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      OK
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Aliveness</span>
                    <Badge className="bg-chart-3 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      OK
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Non-injective Synchronization</span>
                    <Badge className="bg-chart-3 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      OK
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Non-injective Agreement</span>
                    <Badge className="bg-chart-3 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      OK
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Attack Resistance</CardTitle>
                <CardDescription>Resistance against common security attacks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Replay Attack</span>
                    <Badge className="bg-chart-3 text-white">
                      <Shield className="mr-1 h-3 w-3" />
                      Resistant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Man-in-the-Middle</span>
                    <Badge className="bg-chart-3 text-white">
                      <Shield className="mr-1 h-3 w-3" />
                      Resistant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Impersonation Attack</span>
                    <Badge className="bg-chart-3 text-white">
                      <Shield className="mr-1 h-3 w-3" />
                      Resistant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device Capture</span>
                    <Badge className="bg-chart-3 text-white">
                      <Shield className="mr-1 h-3 w-3" />
                      Resistant
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Key Disclosure</span>
                    <Badge className="bg-chart-3 text-white">
                      <Shield className="mr-1 h-3 w-3" />
                      Resistant
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Score */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Overall Security Score</CardTitle>
              <CardDescription>Comprehensive security assessment based on all features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-chart-3 mb-2">9.4</div>
                <div className="text-lg text-muted-foreground mb-4">out of 10</div>
                <Badge className="bg-chart-3 text-white text-lg px-4 py-2">
                  <Shield className="mr-2 h-5 w-5" />
                  Excellent Security
                </Badge>
                <p className="text-sm text-muted-foreground mt-4">
                  BIoMTAKE provides comprehensive security features with formal verification and resistance to all major
                  attack vectors.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
