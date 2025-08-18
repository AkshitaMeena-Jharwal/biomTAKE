"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for IoMT devices
const mockDevices = [
  {
    id: "IoMT-001",
    name: "Heart Rate Monitor",
    type: "Cardiac Sensor",
    status: "active",
    lastAuth: "2024-01-15 14:30:22",
    location: "ICU Room 101",
    publicKey: "04a1b2c3d4e5f6...",
    pseudoId: "PID_7f8e9d0c1b2a",
    registrationDate: "2024-01-10",
    authCount: 1247,
  },
  {
    id: "IoMT-002",
    name: "Blood Pressure Monitor",
    type: "Cardiovascular Sensor",
    status: "active",
    lastAuth: "2024-01-15 14:28:15",
    location: "Ward A Room 205",
    publicKey: "04b2c3d4e5f6a7...",
    pseudoId: "PID_8f9e0d1c2b3a",
    registrationDate: "2024-01-12",
    authCount: 892,
  },
  {
    id: "IoMT-003",
    name: "Temperature Sensor",
    type: "Environmental Monitor",
    status: "warning",
    lastAuth: "2024-01-15 13:45:10",
    location: "Emergency Room",
    publicKey: "04c3d4e5f6a7b8...",
    pseudoId: "PID_9f0e1d2c3b4a",
    registrationDate: "2024-01-08",
    authCount: 2156,
  },
  {
    id: "IoMT-004",
    name: "Glucose Monitor",
    type: "Metabolic Sensor",
    status: "inactive",
    lastAuth: "2024-01-14 09:22:33",
    location: "Diabetes Clinic",
    publicKey: "04d4e5f6a7b8c9...",
    pseudoId: "PID_0f1e2d3c4b5a",
    registrationDate: "2024-01-05",
    authCount: 445,
  },
  {
    id: "IoMT-005",
    name: "Pulse Oximeter",
    type: "Respiratory Monitor",
    status: "active",
    lastAuth: "2024-01-15 14:32:18",
    location: "ICU Room 103",
    publicKey: "04e5f6a7b8c9da...",
    pseudoId: "PID_1f2e3d4c5b6a",
    registrationDate: "2024-01-11",
    authCount: 1089,
  },
]

const deviceTypes = [
  "Cardiac Sensor",
  "Cardiovascular Sensor",
  "Environmental Monitor",
  "Metabolic Sensor",
  "Respiratory Monitor",
  "Neurological Monitor",
  "Surgical Equipment",
]

export function DeviceManagement() {
  const [devices, setDevices] = useState(mockDevices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRegistering, setIsRegistering] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<(typeof mockDevices)[0] | null>(null)

  // Registration form state
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    location: "",
    description: "",
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-chart-3 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Active
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-chart-4 text-white">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Warning
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || device.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleRegisterDevice = () => {
    const deviceId = `IoMT-${String(devices.length + 1).padStart(3, "0")}`
    const pseudoId = `PID_${Math.random().toString(16).substr(2, 12)}`
    const publicKey = `04${Math.random().toString(16).substr(2, 14)}...`

    const device = {
      id: deviceId,
      name: newDevice.name,
      type: newDevice.type,
      status: "active" as const,
      lastAuth: new Date().toISOString().replace("T", " ").substr(0, 19),
      location: newDevice.location,
      publicKey,
      pseudoId,
      registrationDate: new Date().toISOString().substr(0, 10),
      authCount: 0,
    }

    setDevices([...devices, device])
    setNewDevice({ name: "", type: "", location: "", description: "" })
    setIsRegistering(false)
  }

  const handleDeleteDevice = (deviceId: string) => {
    setDevices(devices.filter((d) => d.id !== deviceId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif font-black text-2xl text-foreground">Device Management</h1>
          <p className="text-muted-foreground">Manage IoMT devices and their authentication status</p>
        </div>
        <Dialog open={isRegistering} onOpenChange={setIsRegistering}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Register Device
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="font-serif font-bold">Register New IoMT Device</DialogTitle>
              <DialogDescription>
                Add a new Internet of Medical Things device to the blockchain network
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="device-name">Device Name</Label>
                <Input
                  id="device-name"
                  placeholder="e.g., Heart Rate Monitor"
                  value={newDevice.name}
                  onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-type">Device Type</Label>
                <Select value={newDevice.type} onValueChange={(value) => setNewDevice({ ...newDevice, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                  <SelectContent>
                    {deviceTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-location">Location</Label>
                <Input
                  id="device-location"
                  placeholder="e.g., ICU Room 101"
                  value={newDevice.location}
                  onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="device-description">Description (Optional)</Label>
                <Input
                  id="device-description"
                  placeholder="Additional device information"
                  value={newDevice.description}
                  onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsRegistering(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleRegisterDevice}
                disabled={!newDevice.name || !newDevice.type || !newDevice.location}
              >
                Register Device
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-chart-3" />
              <div>
                <p className="text-sm font-medium">Active Devices</p>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-chart-4" />
              <div>
                <p className="text-sm font-medium">Warning Status</p>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === "warning").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Inactive Devices</p>
                <p className="text-2xl font-bold">{devices.filter((d) => d.status === "inactive").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Devices</p>
                <p className="text-2xl font-bold">{devices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices by name, ID, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold">Registered IoMT Devices</CardTitle>
          <CardDescription>
            {filteredDevices.length} of {devices.length} devices shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Auth</TableHead>
                <TableHead>Auth Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-mono text-sm">{device.id}</TableCell>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>{device.type}</TableCell>
                  <TableCell>{getStatusBadge(device.status)}</TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell className="font-mono text-sm">{device.lastAuth}</TableCell>
                  <TableCell>{device.authCount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedDevice(device)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Device
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteDevice(device.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Device
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Device Details Dialog */}
      <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-serif font-bold">Device Details</DialogTitle>
            <DialogDescription>Detailed information for {selectedDevice?.name}</DialogDescription>
          </DialogHeader>
          {selectedDevice && (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Device ID</Label>
                    <p className="font-mono text-sm">{selectedDevice.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Device Name</Label>
                    <p>{selectedDevice.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Type</Label>
                    <p>{selectedDevice.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedDevice.status)}</div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Location</Label>
                    <p>{selectedDevice.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Registration Date</Label>
                    <p>{selectedDevice.registrationDate}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Pseudo Identity (PID)</Label>
                    <p className="font-mono text-sm break-all">{selectedDevice.pseudoId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Public Key</Label>
                    <p className="font-mono text-sm break-all">{selectedDevice.publicKey}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Authentication</Label>
                    <p className="font-mono text-sm">{selectedDevice.lastAuth}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Total Authentications</Label>
                    <p className="text-2xl font-bold">{selectedDevice.authCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Average Daily Authentications</Label>
                    <p className="text-lg">~{Math.round(selectedDevice.authCount / 30)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Last Activity</Label>
                    <p>{selectedDevice.lastAuth}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
