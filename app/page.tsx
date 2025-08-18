"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Activity, Database, Users, Lock, Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { DeviceManagement } from "@/components/device-management"
import { AuthenticationFlow } from "@/components/authentication-flow"
import { BlockchainMonitor } from "@/components/blockchain-monitor"
import { PerformanceAnalytics } from "@/components/performance-analytics"

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview")

  const renderContent = () => {
    switch (activeView) {
      case "devices":
        return <DeviceManagement />
      case "authentication":
        return <AuthenticationFlow />
      case "blockchain":
        return <BlockchainMonitor />
      case "performance":
        return <PerformanceAnalytics />
      case "overview":
      default:
        return (
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Active IoMT Devices</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">247</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Authentication Success</CardTitle>
                  <CheckCircle className="h-4 w-4 text-chart-3" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">99.7%</div>
                  <p className="text-xs text-muted-foreground">+0.3% from last week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Blockchain Transactions</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">1,429</div>
                  <p className="text-xs text-muted-foreground">+89 in last 24h</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-card-foreground">Avg Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-card-foreground">1.18ms</div>
                  <p className="text-xs text-muted-foreground">-0.2ms improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold text-card-foreground">System Status</CardTitle>
                  <CardDescription>Current operational status of BIoMTAKE components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                      <span className="text-sm">Hyperledger Fabric Network</span>
                    </div>
                    <Badge variant="secondary" className="bg-chart-3 text-white">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                      <span className="text-sm">ASCON Encryption Service</span>
                    </div>
                    <Badge variant="secondary" className="bg-chart-3 text-white">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-chart-4" />
                      <span className="text-sm">ECC Key Management</span>
                    </div>
                    <Badge variant="secondary" className="bg-chart-4 text-white">
                      Warning
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-chart-3" />
                      <span className="text-sm">Device Registration Portal</span>
                    </div>
                    <Badge variant="secondary" className="bg-chart-3 text-white">
                      Online
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif font-bold text-card-foreground">Recent Activity</CardTitle>
                  <CardDescription>Latest authentication and blockchain events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-3 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">IoMT Device #247 authenticated successfully</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-1 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">New blockchain transaction committed</p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-2 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">Key agreement protocol completed</p>
                      <p className="text-xs text-muted-foreground">8 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-chart-4 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-card-foreground">System performance optimization applied</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold text-card-foreground">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks and system operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    className="h-auto p-4 flex flex-col items-center space-y-2"
                    onClick={() => setActiveView("devices")}
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Register Device</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    onClick={() => setActiveView("authentication")}
                  >
                    <Lock className="h-6 w-6" />
                    <span className="text-sm">Test Authentication</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    onClick={() => setActiveView("blockchain")}
                  >
                    <Database className="h-6 w-6" />
                    <span className="text-sm">View Blockchain</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    onClick={() => setActiveView("performance")}
                  >
                    <Zap className="h-6 w-6" />
                    <span className="text-sm">Performance Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-serif font-black text-xl text-foreground">BIoMTAKE</h1>
                <p className="text-xs text-muted-foreground">Blockchain IoT Healthcare Auth</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              <Activity className="mr-1 h-3 w-3" />
              System Active
            </Badge>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              Admin Panel
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar">
          <nav className="p-4 space-y-2">
            <div className="mb-6">
              <h2 className="font-serif font-bold text-sidebar-foreground mb-3">Dashboard</h2>
            </div>

            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeView === "overview"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveView("overview")}
            >
              <Activity className="mr-3 h-4 w-4" />
              Overview
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeView === "devices"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveView("devices")}
            >
              <Users className="mr-3 h-4 w-4" />
              Device Management
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeView === "authentication"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveView("authentication")}
            >
              <Lock className="mr-3 h-4 w-4" />
              Authentication Flow
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeView === "blockchain"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveView("blockchain")}
            >
              <Database className="mr-3 h-4 w-4" />
              Blockchain Monitor
            </Button>

            <Button
              variant="ghost"
              className={`w-full justify-start ${
                activeView === "performance"
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => setActiveView("performance")}
            >
              <Zap className="mr-3 h-4 w-4" />
              Performance Analytics
            </Button>
          </nav>
        </aside>

        {/* Main Dashboard Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
