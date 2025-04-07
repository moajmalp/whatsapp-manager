
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, MoreVertical, Edit, Trash2, QrCode, RefreshCw, Check, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Channel, ChannelFormData } from "@/types";

const Channels: React.FC = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: "1",
      name: "Sales Team",
      phoneNumber: "+1234567890",
      status: "active",
      createdAt: "2023-04-01T10:00:00Z",
      lastActive: "2023-04-07T09:35:00Z"
    },
    {
      id: "2",
      name: "Support",
      phoneNumber: "+1987654321",
      status: "active",
      createdAt: "2023-04-02T14:30:00Z",
      lastActive: "2023-04-07T08:15:00Z"
    },
    {
      id: "3",
      name: "Marketing",
      phoneNumber: "+1567890123",
      status: "active",
      createdAt: "2023-04-03T09:15:00Z",
      lastActive: "2023-04-06T17:45:00Z"
    },
    {
      id: "4",
      name: "Events",
      phoneNumber: "+1456789012",
      status: "connecting",
      createdAt: "2023-04-07T08:00:00Z"
    }
  ]);
  
  const [newChannel, setNewChannel] = useState<ChannelFormData>({
    name: "",
    phoneNumber: ""
  });
  
  const [editChannel, setEditChannel] = useState<Channel | null>(null);
  const [showQRDialog, setShowQRDialog] = useState<boolean>(false);
  const [currentQRChannel, setCurrentQRChannel] = useState<Channel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const handleAddChannel = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = Math.floor(Math.random() * 10000).toString();
      const createdChannel: Channel = {
        id: newId,
        name: newChannel.name,
        phoneNumber: newChannel.phoneNumber,
        status: "connecting",
        createdAt: new Date().toISOString()
      };
      
      setChannels([...channels, createdChannel]);
      setNewChannel({ name: "", phoneNumber: "" });
      setIsSubmitting(false);
      toast.success("Channel created successfully");
      
      // Automatically show QR code for scanning
      setCurrentQRChannel(createdChannel);
      setShowQRDialog(true);
    }, 800);
  };
  
  const handleUpdateChannel = () => {
    if (!editChannel) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedChannels = channels.map(channel => 
        channel.id === editChannel.id 
          ? { ...channel, name: editChannel.name, phoneNumber: editChannel.phoneNumber }
          : channel
      );
      
      setChannels(updatedChannels);
      setEditChannel(null);
      setIsSubmitting(false);
      toast.success("Channel updated successfully");
    }, 800);
  };
  
  const handleDeleteChannel = (id: string) => {
    // Simulate API call
    setTimeout(() => {
      const filteredChannels = channels.filter(channel => channel.id !== id);
      setChannels(filteredChannels);
      toast.success("Channel deleted successfully");
    }, 500);
  };
  
  const handleQRScan = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      setCurrentQRChannel(channel);
      setShowQRDialog(true);
    }
  };
  
  const completeQRScan = () => {
    if (!currentQRChannel) return;
    
    // Simulate successful QR scan
    setTimeout(() => {
      const updatedChannels = channels.map(channel => 
        channel.id === currentQRChannel.id 
          ? { ...channel, status: "active" as const, lastActive: new Date().toISOString() }
          : channel
      );
      
      setChannels(updatedChannels);
      setShowQRDialog(false);
      setCurrentQRChannel(null);
      toast.success("QR code scanned successfully");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp Channels</h1>
            <p className="text-muted-foreground">
              Manage your WhatsApp Web sessions and channels
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>Add Channel</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Channel</DialogTitle>
                <DialogDescription>
                  Create a new WhatsApp Web channel to track contacts
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Channel Name</Label>
                  <Input 
                    id="name"
                    placeholder="e.g. Sales Team" 
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({...newChannel, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    placeholder="e.g. +1234567890" 
                    value={newChannel.phoneNumber}
                    onChange={(e) => setNewChannel({...newChannel, phoneNumber: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    This should be the phone number associated with the WhatsApp account
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setNewChannel({ name: "", phoneNumber: "" })}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddChannel}
                  disabled={!newChannel.name || !newChannel.phoneNumber || isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Channel"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.id} className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{channel.name}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Channel</DialogTitle>
                            <DialogDescription>
                              Make changes to the WhatsApp channel
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Channel Name</Label>
                              <Input 
                                id="edit-name"
                                placeholder="e.g. Sales Team" 
                                value={editChannel?.name || channel.name}
                                onChange={(e) => setEditChannel({
                                  ...channel,
                                  name: e.target.value
                                })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-phone">Phone Number</Label>
                              <Input 
                                id="edit-phone"
                                placeholder="e.g. +1234567890" 
                                value={editChannel?.phoneNumber || channel.phoneNumber}
                                onChange={(e) => setEditChannel({
                                  ...channel,
                                  phoneNumber: e.target.value
                                })}
                              />
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setEditChannel(null)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleUpdateChannel}
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <DropdownMenuItem 
                        onSelect={(e) => {
                          e.preventDefault();
                          handleQRScan(channel.id);
                        }}
                      >
                        <QrCode className="h-4 w-4 mr-2" />
                        {channel.status === "connecting" ? "Scan QR Code" : "Reconnect"}
                      </DropdownMenuItem>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Channel?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the "{channel.name}" channel and all its data. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => handleDeleteChannel(channel.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>
                  {channel.phoneNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center gap-2 text-sm">
                  <span>Status:</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      channel.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                    }`} />
                    <span className="capitalize">{channel.status}</span>
                  </div>
                </div>
                {channel.lastActive && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Last active: {new Date(channel.lastActive).toLocaleString()}
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate("/contacts", { state: { channelId: channel.id } })}
                >
                  View Contacts
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {channels.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Plus className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No channels yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Add your first WhatsApp channel to start tracking contacts
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Channel</Button>
                </DialogTrigger>
                <DialogContent>{/* Same content as above */}</DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
        
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Scan WhatsApp QR Code</DialogTitle>
              <DialogDescription>
                Open WhatsApp on your phone, tap Menu or Settings and select WhatsApp Web
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <div className="relative border border-input p-4 rounded-lg bg-muted/50 w-64 h-64 flex items-center justify-center">
                {/* Placeholder for actual QR code */}
                <div className="w-full h-full bg-white p-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-4 border-black relative">
                      {/* QR Code corners */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-black"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-r-4 border-t-4 border-black"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-4 border-b-4 border-black"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-black"></div>
                      
                      {/* Center square */}
                      <div className="absolute inset-0 m-auto w-16 h-16 bg-black"></div>
                      <div className="absolute inset-0 m-auto w-10 h-10 bg-white"></div>
                      <div className="absolute inset-0 m-auto w-6 h-6 bg-black"></div>
                    </div>
                  </div>
                </div>
                
                <RefreshCw className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Scanning will connect <strong>{currentQRChannel?.name}</strong> to WhatsApp Web
              </p>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  setShowQRDialog(false);
                  setCurrentQRChannel(null);
                }}
              >
                Cancel
              </Button>
              <Button className="gap-1" onClick={completeQRScan}>
                <Check className="h-4 w-4" />
                <span>I've Scanned the Code</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Channels;
