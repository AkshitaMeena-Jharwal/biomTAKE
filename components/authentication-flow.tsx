"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  Shield,
  Key,
  CheckCircle,
  Clock,
  Database,
  Smartphone,
  Server,
  AlertCircle,
} from "lucide-react"

interface AuthStep {
  id: number
  title: string
  description: string
  sender: "iomt" | "dc" | "system"
  receiver: "iomt" | "dc" | "system"
  message?: string
  cryptoOps: string[]
  status: "pending" | "active" | "completed" | "error"
  duration: number
}

const authenticationSteps: AuthStep[] = [
  {
    id: 1,
    title: "IoMT Device Initiation",
    description: "IoMT device generates session parameters and computes shared secret",
    sender: "iomt",
    receiver: "system",
    cryptoOps: [
      "Generate SK_IM, S_x, TM_x",
      "Compute SK_DC-IM = SK_IM · Pb_DC",
      "Compute α = h(PID_IM || SK_DC-IM || TM_x || h(Pb_IM))",
      "Split α into α_a, α_b (128 bits each)",
      "Compute K_IM = α_a ⊕ α_b, N_x = α_a",
      "ASCON Encrypt: (CT_x, Tag_x) = E_K_IM{N_x, S_x}",
    ],
    status: "pending",
    duration: 2000,
  },
  {
    id: 2,
    title: "Authentication Request",
    description: "IoMT device sends authentication message to Data Collector",
    sender: "iomt",
    receiver: "dc",
    message: "MSG1: {TM_x, CT_x, Tag_x, h(Pb_IM)}",
    cryptoOps: ["Transmit encrypted authentication request", "Include timestamp and device hash"],
    status: "pending",
    duration: 1500,
  },
  {
    id: 3,
    title: "DC Validation & Processing",
    description: "Data Collector validates timestamp and authenticates the device",
    sender: "dc",
    receiver: "system",
    cryptoOps: [
      "Validate timestamp: ΔT ≥ |TM* - TM_x|",
      "Compute SK_DC-IM = SK_DC · Pb_IM1",
      "Extract PID_IM using h(Pb_IM) from ledger",
      "Compute β = h(PID_IM || SK_DC-IM || TM_x || h(Pb_IM))",
      "Split β into β_a, β_b and compute K_DC = β_a ⊕ β_b",
      "ASCON Decrypt: (PT_y, Tag_y) = D_K_DC{N_y, CT_x}",
      "Validate Tag_y = Tag_x for message authenticity",
    ],
    status: "pending",
    duration: 2500,
  },
  {
    id: 4,
    title: "DC Response Generation",
    description: "Data Collector generates response message with session parameters",
    sender: "dc",
    receiver: "system",
    cryptoOps: [
      "Retrieve {CT_DC, Tag_DC} from globalchain using PID_IM",
      "Validate blockchain data authenticity",
      "Generate TM_z, S_z parameters",
      "Compute γ = h(SK_DC-IM || ID_IM || h(Pb_IM) || TM_z || S_x)",
      "Split γ into γ_a, γ_b and compute AD_z = γ_a ⊕ γ_b",
      "ASCON Encrypt: (CT_z, Tag_z) = E_Pb_IM{AD_z, N_z, PT_z}",
      "Compute session key: SS_DC = h(γ || S_x || S_z || TM_z)",
    ],
    status: "pending",
    duration: 2200,
  },
  {
    id: 5,
    title: "Authentication Response",
    description: "Data Collector sends response back to IoMT device",
    sender: "dc",
    receiver: "iomt",
    message: "MSG2: {TM_z, CT_z, Tag_z}",
    cryptoOps: ["Transmit encrypted response", "Include session parameters"],
    status: "pending",
    duration: 1500,
  },
  {
    id: 6,
    title: "IoMT Final Validation",
    description: "IoMT device validates response and establishes session key",
    sender: "iomt",
    receiver: "system",
    cryptoOps: [
      "Validate timestamp: ΔT ≥ |TM* - TM_z|",
      "Compute δ = h(SK_DC-IM || ID_IM || h(Pb_IM) || TM_z || S_x)",
      "Split δ into δ_a, δ_b and compute AD_p = δ_a ⊕ δ_b",
      "ASCON Decrypt: (PT_z, Tag_p) = D_Pb_IM{AD_p, N_p, CT_z}",
      "Validate Tag_p = Tag_z for message authenticity",
      "Extract S_z from PT_z",
      "Compute session key: SS_IM = h(δ || S_x || S_z || TM_z)",
    ],
    status: "pending",
    duration: 2000,
  },
  {
    id: 7,
    title: "Session Established",
    description: "Mutual authentication completed, secure session key established",
    sender: "system",
    receiver: "system",
    cryptoOps: [
      "Session keys match: SS_DC = SS_IM",
      "Secure communication channel established",
      "Authentication protocol completed successfully",
    ],
    status: "pending",
    duration: 1000,
  },
]

export function AuthenticationFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState(authenticationSteps)
  const [progress, setProgress] = useState(0)

  const resetSimulation = () => {
    setCurrentStep(0)
    setIsRunning(false)
    setProgress(0)
    setSteps(
      authenticationSteps.map((step) => ({
        ...step,
        status: "pending",
      })),
    )
  }

  const startSimulation = () => {
    if (currentStep >= steps.length) {
      resetSimulation()
      return
    }
    setIsRunning(true)
  }

  const pauseSimulation = () => {
    setIsRunning(false)
  }

  useEffect(() => {
    if (!isRunning || currentStep >= steps.length) return

    const timer = setTimeout(() => {
      setSteps((prevSteps) =>
        prevSteps.map((step, index) => {
          if (index === currentStep) {
            return { ...step, status: "completed" }
          }
          if (index === currentStep + 1) {
            return { ...step, status: "active" }
          }
          return step
        }),
      )

      setCurrentStep((prev) => prev + 1)
      setProgress(((currentStep + 1) / steps.length) * 100)

      if (currentStep + 1 >= steps.length) {
        setIsRunning(false)
      }
    }, steps[currentStep].duration)

    // Set current step as active immediately
    setSteps((prevSteps) =>
      prevSteps.map((step, index) => {
        if (index === currentStep) {
          return { ...step, status: "active" }
        }
        return step
      }),
    )

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, steps.length])

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case "iomt":
        return <Smartphone className="h-5 w-5" />
      case "dc":
        return <Server className="h-5 w-5" />
      case "system":
        return <Database className="h-5 w-5" />
      default:
        return <Shield className="h-5 w-5" />
    }
  }

  const getEntityName = (entity: string) => {
    switch (entity) {
      case "iomt":
        return "IoMT Device"
      case "dc":
        return "Data Collector"
      case "system":
        return "System"
      default:
        return "Unknown"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-chart-4 text-white">
            <Clock className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-chart-3 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertCircle className="mr-1 h-3 w-3" />
            Error
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-black text-2xl text-foreground">Authentication Flow Simulator</h1>
          <p className="text-muted-foreground">Interactive simulation of the BIoMTAKE mutual authentication protocol</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={resetSimulation}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          {isRunning ? (
            <Button onClick={pauseSimulation}>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button onClick={startSimulation}>
              <Play className="mr-2 h-4 w-4" />
              {currentStep >= steps.length ? "Restart" : "Start"} Simulation
            </Button>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold">Simulation Progress</CardTitle>
          <CardDescription>
            Step {Math.min(currentStep + 1, steps.length)} of {steps.length} - {progress.toFixed(0)}% Complete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Device Initiation</span>
            <span>Authentication</span>
            <span>Session Established</span>
          </div>
        </CardContent>
      </Card>

      {/* Protocol Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <Smartphone className="mr-2 h-5 w-5 text-chart-1" />
              IoMT Device
            </CardTitle>
            <CardDescription>Internet of Medical Things device requesting authentication</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Device ID</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">IoMT-001</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Type</span>
                <span className="text-xs">Heart Rate Monitor</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="secondary" className="bg-chart-3 text-white">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Ready
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <ArrowRight className="mr-2 h-5 w-5 text-chart-2" />
              Protocol Flow
            </CardTitle>
            <CardDescription>BIoMTAKE authentication and key agreement process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Encryption</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">ASCON AEAD</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Key Exchange</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">ECC</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Hash Function</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">ASCON Hash</code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <Server className="mr-2 h-5 w-5 text-chart-3" />
              Data Collector
            </CardTitle>
            <CardDescription>Blockchain peer node handling authentication requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Node ID</span>
                <code className="text-xs bg-muted px-2 py-1 rounded">DC-Hospital-A</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Blockchain</span>
                <span className="text-xs">Hyperledger Fabric</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Status</span>
                <Badge variant="secondary" className="bg-chart-3 text-white">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Authentication Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold">Authentication Protocol Steps</CardTitle>
          <CardDescription>Detailed view of each step in the BIoMTAKE authentication process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {index < steps.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-16 bg-border"></div>}
                <div className="flex items-start space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      step.status === "completed"
                        ? "bg-chart-3 border-chart-3 text-white"
                        : step.status === "active"
                          ? "bg-chart-4 border-chart-4 text-white animate-pulse"
                          : step.status === "error"
                            ? "bg-destructive border-destructive text-destructive-foreground"
                            : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : step.status === "active" ? (
                      <Clock className="h-5 w-5" />
                    ) : step.status === "error" ? (
                      <AlertCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-bold">{step.id}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-card-foreground">{step.title}</h3>
                      {getStatusBadge(step.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                    {step.message && (
                      <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex items-center space-x-1 text-sm">
                            {getEntityIcon(step.sender)}
                            <span>{getEntityName(step.sender)}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          <div className="flex items-center space-x-1 text-sm">
                            {getEntityIcon(step.receiver)}
                            <span>{getEntityName(step.receiver)}</span>
                          </div>
                        </div>
                        <code className="text-xs bg-muted px-3 py-2 rounded block">{step.message}</code>
                      </div>
                    )}

                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-card-foreground">Cryptographic Operations:</h4>
                      <ul className="space-y-1">
                        {step.cryptoOps.map((op, opIndex) => (
                          <li key={opIndex} className="text-xs text-muted-foreground flex items-start">
                            <span className="mr-2">•</span>
                            <span>{op}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Security Features
            </CardTitle>
            <CardDescription>Key security mechanisms in BIoMTAKE protocol</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Mutual Authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Forward Secrecy</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Replay Attack Protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Man-in-the-Middle Prevention</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Device Anonymity</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-chart-3" />
                <span className="text-sm">Session Key Agreement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold flex items-center">
              <Key className="mr-2 h-5 w-5 text-secondary" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Computational and communication efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Total Computation Time</span>
                <span className="text-sm font-mono">1.181ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">IoMT Device Time</span>
                <span className="text-sm font-mono">0.387ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Data Collector Time</span>
                <span className="text-sm font-mono">0.518ms</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm">Communication Overhead</span>
                <span className="text-sm font-mono">832 bits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Message 1 Size</span>
                <span className="text-sm font-mono">544 bits</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Message 2 Size</span>
                <span className="text-sm font-mono">288 bits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
