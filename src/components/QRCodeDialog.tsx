
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import WhatsAppQRCode from "./WhatsAppQRCode";
import { Channel } from "@/types";

interface QRCodeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Channel | null;
  qrCode: string | null;
  isLoading: boolean;
  onRefreshQR: () => void;
  onManualSuccess: () => void;
}

const QRCodeDialog: React.FC<QRCodeDialogProps> = ({
  isOpen,
  onOpenChange,
  channel,
  qrCode,
  isLoading,
  onRefreshQR,
  onManualSuccess,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan WhatsApp QR Code</DialogTitle>
          <DialogDescription>
            Open WhatsApp on your phone, tap Menu or Settings and select WhatsApp Web
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center py-4">
          <WhatsAppQRCode 
            qrCode={qrCode} 
            onRefresh={onRefreshQR}
            isLoading={isLoading} 
          />
          <p className="text-sm text-muted-foreground mt-4">
            Scanning will connect <strong>{channel?.name}</strong> to WhatsApp Web
          </p>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="gap-1" 
            onClick={onManualSuccess}
          >
            <Check className="h-4 w-4" />
            <span>I've Scanned the Code</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
