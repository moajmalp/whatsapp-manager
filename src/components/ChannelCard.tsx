
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Edit, MoreVertical, QrCode, Trash2, Smartphone } from "lucide-react";
import { Channel } from "@/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface ChannelCardProps {
  channel: Channel;
  onDelete: (id: string) => void;
  onEdit: (channel: Channel) => void;
  onQrScan: (channelId: string) => void;
}

const ChannelCard: React.FC<ChannelCardProps> = ({
  channel,
  onDelete,
  onEdit,
  onQrScan,
}) => {
  const navigate = useNavigate();

  return (
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
                  <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                    onEdit(channel);
                  }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DialogTrigger>
              </Dialog>
              
              <DropdownMenuItem 
                onSelect={(e) => {
                  e.preventDefault();
                  onQrScan(channel.id);
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
                      onClick={() => onDelete(channel.id)}
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
  );
};

export default ChannelCard;
