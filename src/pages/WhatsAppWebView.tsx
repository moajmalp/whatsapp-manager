
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useWhatsAppSocket } from "@/hooks/useWhatsAppSocket";

const WhatsAppWebView: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { session, connected } = useWhatsAppSocket({
    channelId,
    autoConnect: true,
    onDisconnected: (reason) => {
      setError(`WhatsApp disconnected: ${reason}`);
    }
  });

  useEffect(() => {
    // In a real implementation, this would connect to the WhatsApp Web interface
    // via the session data for the specific channel
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!channelId) {
        setError("Invalid channel ID");
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [channelId]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate("/channels")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp Web</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {session?.phoneNumber || "Loading..."}
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              <p>Loading WhatsApp Web interface...</p>
            </div>
          </div>
        ) : error ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            <div className="text-center space-y-4">
              <p className="text-destructive">{error}</p>
              <Button onClick={() => navigate("/channels")}>
                Return to Channels
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border shadow-sm p-4 h-[70vh] overflow-hidden">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <div className="text-center space-y-4 max-w-md">
                <h2 className="text-xl font-semibold">WhatsApp Web Interface</h2>
                <p className="text-muted-foreground">
                  This is where the embedded WhatsApp Web interface would appear for channel: {channelId}.
                </p>
                <p className="text-sm">
                  In a production environment, this would be an iframe or integration 
                  with the WhatsApp Web client for the specific channel.
                </p>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 mt-4">
                  <div className="flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary">
                      WhatsApp Web Session
                    </div>
                  </div>
                  <div className="mt-4 text-left">
                    <p><strong>Channel ID:</strong> {channelId}</p>
                    <p><strong>Phone:</strong> {session?.phoneNumber || "Unknown"}</p>
                    <p><strong>Status:</strong> {session?.status || "Unknown"}</p>
                    <p><strong>Connected:</strong> {connected ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WhatsAppWebView;
