
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Channel, ChannelFormData } from "@/types";
import { useWhatsAppSocket, WhatsAppSession } from "@/hooks/useWhatsAppSocket";
import ChannelCard from "@/components/ChannelCard";
import ChannelForm from "@/components/ChannelForm";
import QRCodeDialog from "@/components/QRCodeDialog";
import EmptyChannelState from "@/components/EmptyChannelState";

const Channels: React.FC = () => {
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
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  
  // WhatsApp socket integration
  const { 
    qrCode, 
    session, 
    isLoading,
    connect,
    refreshQrCode
  } = useWhatsAppSocket({
    channelId: currentQRChannel?.id,
    autoConnect: false,
    onReady: (sessionInfo) => {
      handleSessionReady(sessionInfo);
    }
  });
  
  const handleOpenAddDialog = () => {
    setNewChannel({ name: "", phoneNumber: "" });
    setShowAddDialog(true);
  };
  
  const handleSessionReady = (sessionInfo: WhatsAppSession) => {
    // Update the channel with the session info
    if (!currentQRChannel) return;
    
    const updatedChannels = channels.map(channel => 
      channel.id === currentQRChannel.id 
        ? { 
            ...channel, 
            status: "active" as const,
            phoneNumber: sessionInfo.phoneNumber || channel.phoneNumber,
            lastActive: new Date().toISOString() 
          }
        : channel
    );
    
    setChannels(updatedChannels);
    toast.success("WhatsApp connected successfully");
    setShowQRDialog(false);
    setCurrentQRChannel(null);
  };
  
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
      setShowAddDialog(false);
      toast.success("Channel created successfully");
      
      // Automatically show QR code for scanning
      setCurrentQRChannel(createdChannel);
      setShowQRDialog(true);
      
      // Connect to WhatsApp
      connect(createdChannel.id);
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
      setShowEditDialog(false);
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
      
      // Connect to WhatsApp
      connect(channelId);
    }
  };
  
  const handleEditChannel = (channel: Channel) => {
    setEditChannel(channel);
    setShowEditDialog(true);
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
          
          <Button className="flex items-center gap-1" onClick={handleOpenAddDialog}>
            <Plus className="h-4 w-4" />
            <span>Add Channel</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              onDelete={handleDeleteChannel}
              onEdit={handleEditChannel}
              onQrScan={handleQRScan}
            />
          ))}
        </div>
        
        {channels.length === 0 && (
          <EmptyChannelState onClick={handleOpenAddDialog} />
        )}
        
        {/* Add Channel Dialog */}
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <ChannelForm
            mode="add"
            data={newChannel}
            isSubmitting={isSubmitting}
            onCancel={() => setShowAddDialog(false)}
            onSubmit={handleAddChannel}
            onChange={(data) => setNewChannel(data as ChannelFormData)}
          />
        </Dialog>
        
        {/* Edit Channel Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          {editChannel && (
            <ChannelForm
              mode="edit"
              data={editChannel}
              isSubmitting={isSubmitting}
              onCancel={() => {
                setShowEditDialog(false);
                setEditChannel(null);
              }}
              onSubmit={handleUpdateChannel}
              onChange={(data) => setEditChannel(data as Channel)}
            />
          )}
        </Dialog>
        
        {/* QR Code Dialog */}
        <QRCodeDialog
          isOpen={showQRDialog}
          onOpenChange={setShowQRDialog}
          channel={currentQRChannel}
          qrCode={qrCode}
          isLoading={isLoading}
          onRefreshQR={refreshQrCode}
          onManualSuccess={() => {
            // This simulates a successful scan for demo purposes
            if (currentQRChannel) {
              handleSessionReady({
                id: currentQRChannel.id,
                phoneNumber: currentQRChannel.phoneNumber,
                status: 'active',
                lastActive: new Date().toISOString()
              });
            }
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default Channels;
