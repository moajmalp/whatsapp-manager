
import React from "react";
import QRCode from "qrcode.react";
import { RefreshCw } from "lucide-react";

interface WhatsAppQRCodeProps {
  qrCode: string | null;
  onRefresh?: () => void;
  size?: number;
  isLoading?: boolean;
}

const WhatsAppQRCode: React.FC<WhatsAppQRCodeProps> = ({
  qrCode,
  onRefresh,
  size = 256,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="relative border border-input p-4 rounded-lg bg-muted/50 w-64 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-sm text-muted-foreground">Loading QR code...</p>
        </div>
      </div>
    );
  }

  if (!qrCode) {
    return (
      <div className="relative border border-input p-4 rounded-lg bg-muted/50 w-64 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Waiting for WhatsApp connection...
          </p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="text-sm flex items-center gap-1 text-primary hover:underline"
            >
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative border border-input p-4 rounded-lg bg-white w-64 h-64 flex items-center justify-center">
      <QRCode
        value={qrCode}
        size={size}
        level="M"
        includeMargin={true}
        renderAs="svg"
      />
      {onRefresh && (
        <RefreshCw
          className="absolute bottom-2 right-2 h-6 w-6 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={onRefresh}
        />
      )}
    </div>
  );
};

export default WhatsAppQRCode;
