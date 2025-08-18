"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  RefreshCw,
  Database,
  Link,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
  Server,
  Activity,
  TrendingUp,
} from "lucide-react"

interface Transaction {
  id: string
  hash: string
  timestamp: string
  type: "device_registration" | "authentication" | "data_storage" | "chaincode_invoke"
  channel: "local" | "global"
  chaincode: "localchain" | "globalchain"
  function: "createAsset" | "readAsset" | "updateAsset" | "deleteAsset"
  status: "confirmed" | "pending" | "failed"
  blockNumber: number
  deviceId?: string
  endorsements: number
  gasUsed: number
  details: any
}

interface Block {
  number: number
  hash: string
  previousHash: string
  timestamp: string
  transactionCount: number
  dataHash: string
  channel: "local" | "global"
}

interface PeerNode {
  id: string
  name: string
  organization: string
  status: "online" | "offline" | "syncing"
  lastSeen: string
  blockHeight: number
  endorsements: number
}

// Mock data for blockchain transactions
const mockTransactions: Transaction[] = [
  {
    id: "tx_001",
    hash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: "2024-01-15 14:32:18",
    type: "device_registration",
    channel: "global",
    chaincode: "globalchain",
    function: "createAsset",
    status: "confirmed",
    blockNumber: 1247,
    deviceId: "IoMT-001",
    endorsements: 3,
    gasUsed: 21000,
    details: {
      pseudoId: "PID_7f8e9d0c1b2a",
      publicKey: "04a1b2c3d4e5f6...",
      deviceType: "Heart Rate Monitor",
    },
  },
  {
    id: "tx_002",
    hash: "0x2b3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-01-15 14:30:45",
    type: "authentication",
    channel: "local",
    chaincode: "localchain",
    function: "updateAsset",
    status: "confirmed",
    blockNumber: 892,
    deviceId: "IoMT-002",
    endorsements: 2,
    gasUsed: 18500,
    details: {
      authResult: "success",
      sessionKey: "SS_abc123...",
      responseTime: "1.18ms",
    },
  },
  {
    id: "tx_003",
    hash: "0x3c4d5e6f7890ab121234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-01-15 14:28:12",
    type: "data_storage",
    channel: "global",
    chaincode: "globalchain",
    function: "createAsset",
    status: "confirmed",
    blockNumber: 1246,
    deviceId: "IoMT-003",
    endorsements: 4,
    gasUsed: 25000,
    details: {
      dataType: "patient_vitals",
      encrypted: true,
      size: "2.4KB",
    },
  },
  {
    id: "tx_004",
    hash: "0x4d5e6f7890ab12341234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-01-15 14:25:33",
    type: "chaincode_invoke",
    channel: "local",
    chaincode: "localchain",
    function: "readAsset",
    status: "pending",
    blockNumber: 891,
    endorsements: 1,
    gasUsed: 15000,
    details: {
      operation: "device_status_check",
      requestedBy: "admin",
    },
  },
  {
    id: "tx_005",
    hash: "0x5e6f7890ab123451234567890abcdef1234567890abcdef1234567890abcdef",
    timestamp: "2024-01-15 14:22:07",
    type: "authentication",
    channel: "local",
    chaincode: "localchain",
    function: "updateAsset",
    status: "failed",
    blockNumber: 890,
    deviceId: "IoMT-004",
    endorsements: 0,
    gasUsed: 12000,
    details: {
      authResult: "failed",
      errorCode: "INVALID_SIGNATURE",
      retryCount: 3,
    },
  },
]

const mockBlocks: Block[] = [
  {
    number: 1247,
    hash: "0xabc123def456789012345678901234567890123456789012345678901234567890",
    previousHash: "0x123def456789012345678901234567890123456789012345678901234567890abc",
    timestamp: "2024-01-15 14:32:18",
    transactionCount: 3,
    dataHash: "0xdef456789012345678901234567890123456789012345678901234567890abc123",
    channel: "global",
  },
  {
    number: 892,
    hash: "0xbcd234efa567890123456789012345678901234567890123456789012345678901",
    previousHash: "0x234efa567890123456789012345678901234567890123456789012345678901bcd",
    timestamp: "2024-01-15 14:30:45",
    transactionCount: 2,
    dataHash: "0xefa567890123456789012345678901234567890123456789012345678901bcd234",
    channel: "local",
  },
]

const mockPeers: PeerNode[] = [
  {
    id: "peer0.hospital-a.biomtake.com",
    name: "Hospital A - Peer 0",
    organization: "Hospital A",
    status: "online",
    lastSeen: "2024-01-15 14:32:18",
    blockHeight: 1247,
    endorsements: 156,
  },
  {
    id: "peer1.hospital-a.biomtake.com",
    name: "Hospital A - Peer 1",
    organization: "Hospital A",
    status: "online",
    lastSeen: "2024-01-15 14:32:15",
    blockHeight: 1247,
    endorsements: 142,
  },
  {
    id: "peer0.hospital-b.biomtake.com",
    name: "Hospital B - Peer 0",
    organization: "Hospital B",
    status: "syncing",
    lastSeen: "2024-01-15 14:31:45",
    blockHeight: 1246,
    endorsements: 98,
  },
  {
    id: "peer1.hospital-b.biomtake.com",
    name: "Hospital B - Peer 1",
    organization: "Hospital B",
    status: "online",
    lastSeen: "2024-01-15 14:32:10",
    blockHeight: 1247,
    endorsements: 134,
  },
]

export function BlockchainMonitor() {
  const [transactions, setTransactions] = useState(mockTransactions)
  const [blocks, setBlocks] = useState(mockBlocks)
  const [peers, setPeers] = useState(mockPeers)
  const [searchTerm, setSearchTerm] = useState("")
  const [channelFilter, setChannelFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-chart-3 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-chart-4 text-white">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPeerStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return (
          <Badge className="bg-chart-3 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Online
          </Badge>
        )
      case "syncing":
        return (
          <Badge className="bg-chart-4 text-white">
            <Activity className="mr-1 h-3 w-3" />
            Syncing
          </Badge>
        )
      case "offline":
        return (
          <Badge variant="secondary">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Offline
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getChannelBadge = (channel: string) => {
    return (
      <Badge variant="outline" className={channel === "global" ? "border-chart-1" : "border-chart-2"}>
        {channel === "global" ? "Global" : "Local"}
      </Badge>
    )
  }

  const getTransactionTypeBadge = (type: string) => {
    const typeMap = {
      device_registration: { label: "Device Registration", color: "bg-chart-1" },
      authentication: { label: "Authentication", color: "bg-chart-2" },
      data_storage: { label: "Data Storage", color: "bg-chart-3" },
      chaincode_invoke: { label: "Chaincode Invoke", color: "bg-chart-4" },
    }
    const config = typeMap[type as keyof typeof typeMap] || { label: type, color: "bg-muted" }
    return <Badge className={`${config.color} text-white`}>{config.label}</Badge>
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.deviceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChannel = channelFilter === "all" || tx.channel === channelFilter
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter
    return matchesSearch && matchesChannel && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-black text-2xl text-foreground">Blockchain Transaction Monitor</h1>
          <p className="text-muted-foreground">
            Real-time monitoring of Hyperledger Fabric blockchain transactions and network status
          </p>
        </div>
        <Button onClick={refreshData} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-chart-1" />
              <div>
                <p className="text-sm font-medium">Total Transactions</p>
                <p className="text-2xl font-bold">{transactions.length.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4 text-chart-2" />
              <div>
                <p className="text-sm font-medium">Latest Block</p>
                <p className="text-2xl font-bold">#{Math.max(...blocks.map((b) => b.number))}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-chart-3" />
              <div>
                <p className="text-sm font-medium">Active Peers</p>
                <p className="text-2xl font-bold">{peers.filter((p) => p.status === "online").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-chart-4" />
              <div>
                <p className="text-sm font-medium">TPS (24h avg)</p>
                <p className="text-2xl font-bold">3.2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by hash, device ID, or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={channelFilter} onValueChange={setChannelFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="global">Global</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Recent Transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} of {transactions.length} transactions shown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hash</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Block</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-mono text-sm">{tx.hash.substring(0, 16)}...</TableCell>
                      <TableCell>{getTransactionTypeBadge(tx.type)}</TableCell>
                      <TableCell>{getChannelBadge(tx.channel)}</TableCell>
                      <TableCell>{getStatusBadge(tx.status)}</TableCell>
                      <TableCell>#{tx.blockNumber}</TableCell>
                      <TableCell className="font-mono text-sm">{tx.timestamp}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedTransaction(tx)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Recent Blocks</CardTitle>
              <CardDescription>Latest blocks added to the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Block #</TableHead>
                    <TableHead>Hash</TableHead>
                    <TableHead>Channel</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blocks.map((block) => (
                    <TableRow key={block.number}>
                      <TableCell className="font-bold">#{block.number}</TableCell>
                      <TableCell className="font-mono text-sm">{block.hash.substring(0, 16)}...</TableCell>
                      <TableCell>{getChannelBadge(block.channel)}</TableCell>
                      <TableCell>{block.transactionCount}</TableCell>
                      <TableCell className="font-mono text-sm">{block.timestamp}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedBlock(block)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Peer Nodes</CardTitle>
              <CardDescription>Status of Hyperledger Fabric peer nodes in the network</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Peer ID</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Block Height</TableHead>
                    <TableHead>Endorsements</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {peers.map((peer) => (
                    <TableRow key={peer.id}>
                      <TableCell className="font-mono text-sm">{peer.name}</TableCell>
                      <TableCell>{peer.organization}</TableCell>
                      <TableCell>{getPeerStatusBadge(peer.status)}</TableCell>
                      <TableCell>#{peer.blockHeight}</TableCell>
                      <TableCell>{peer.endorsements}</TableCell>
                      <TableCell className="font-mono text-sm">{peer.lastSeen}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Transaction Details Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-serif font-bold">Transaction Details</DialogTitle>
            <DialogDescription>Detailed information for transaction {selectedTransaction?.id}</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Transaction Hash</label>
                  <p className="font-mono text-sm break-all">{selectedTransaction.hash}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <div className="mt-1">{getTransactionTypeBadge(selectedTransaction.type)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Channel</label>
                  <div className="mt-1">{getChannelBadge(selectedTransaction.channel)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Block Number</label>
                  <p>#{selectedTransaction.blockNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Endorsements</label>
                  <p>{selectedTransaction.endorsements}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Chaincode</label>
                  <p>{selectedTransaction.chaincode}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Function</label>
                  <p>{selectedTransaction.function}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Transaction Details</label>
                <pre className="mt-1 text-xs bg-muted p-3 rounded overflow-auto">
                  {JSON.stringify(selectedTransaction.details, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Block Details Dialog */}
      <Dialog open={!!selectedBlock} onOpenChange={() => setSelectedBlock(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-serif font-bold">Block Details</DialogTitle>
            <DialogDescription>Detailed information for block #{selectedBlock?.number}</DialogDescription>
          </DialogHeader>
          {selectedBlock && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Block Number</label>
                  <p className="font-bold">#{selectedBlock.number}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Channel</label>
                  <div className="mt-1">{getChannelBadge(selectedBlock.channel)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium">Transaction Count</label>
                  <p>{selectedBlock.transactionCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Timestamp</label>
                  <p className="font-mono text-sm">{selectedBlock.timestamp}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Block Hash</label>
                <p className="font-mono text-sm break-all">{selectedBlock.hash}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Previous Hash</label>
                <p className="font-mono text-sm break-all">{selectedBlock.previousHash}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Data Hash</label>
                <p className="font-mono text-sm break-all">{selectedBlock.dataHash}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
