
import { useEffect, useState, useCallback } from "react";
import { socketService, WhatsAppSession, WhatsAppContact } from "@/services/socket";

// Re-export the WhatsAppSession type
export type { WhatsAppSession } from "@/services/socket";

interface UseWhatsAppSocketProps {
  channelId?: string;
  onQrCode?: (qrCode: string) => void;
  onReady?: (session: WhatsAppSession) => void;
  onDisconnected?: (reason: string) => void;
  onContactsReceived?: (contacts: WhatsAppContact[]) => void;
  autoConnect?: boolean;
}

export function useWhatsAppSocket({
  channelId,
  onQrCode,
  onReady,
  onDisconnected,
  onContactsReceived,
  autoConnect = true,
}: UseWhatsAppSocketProps = {}) {
  const [connected, setConnected] = useState(socketService.isConnected());
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [session, setSession] = useState<WhatsAppSession | null>(null);
  const [contacts, setContacts] = useState<WhatsAppContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Connect to socket and initialize WhatsApp session
  const connect = useCallback(async (cid?: string, forceNewQR?: boolean) => {
    setIsLoading(true);
    const targetChannelId = cid || channelId;
    
    if (!targetChannelId) {
      console.error("No channel ID provided");
      setIsLoading(false);
      return false;
    }
    
    const success = await socketService.connect(targetChannelId);
    setConnected(success);
    
    if (success) {
      socketService.initializeWhatsAppSession(targetChannelId, !!forceNewQR);
    }
    
    setIsLoading(false);
    return success;
  }, [channelId]);

  // Disconnect from socket
  const disconnect = useCallback(() => {
    if (channelId) {
      socketService.disconnectWhatsAppSession(channelId);
    }
    socketService.disconnect();
    setConnected(false);
    setQrCode(null);
    setSession(null);
  }, [channelId]);

  // Get contacts
  const getContacts = useCallback(() => {
    if (!channelId) return;
    socketService.getContacts(channelId);
  }, [channelId]);

  // Refresh QR code
  const refreshQrCode = useCallback(() => {
    if (!channelId) return;
    connect(channelId, true);
  }, [channelId, connect]);

  // Set up socket event listeners
  useEffect(() => {
    if (!connected) return;

    // Handler for QR code event
    const qrCleanup = socketService.on('qr', (code) => {
      setQrCode(code);
      onQrCode?.(code);
    });

    // Handler for ready event
    const readyCleanup = socketService.on('ready', (sessionInfo) => {
      setSession(sessionInfo);
      setQrCode(null);
      onReady?.(sessionInfo);
    });

    // Handler for authenticated event
    const authCleanup = socketService.on('authenticated', (sessionInfo) => {
      setSession(sessionInfo);
    });

    // Handler for disconnected event
    const disconnectCleanup = socketService.on('disconnected', (reason) => {
      setSession(null);
      onDisconnected?.(reason);
    });

    // Handler for contacts received event
    const contactsCleanup = socketService.on('contacts_received', (contactsList) => {
      setContacts(contactsList);
      onContactsReceived?.(contactsList);
    });

    return () => {
      qrCleanup();
      readyCleanup();
      authCleanup();
      disconnectCleanup();
      contactsCleanup();
    };
  }, [connected, onQrCode, onReady, onDisconnected, onContactsReceived]);

  // Auto-connect on mount if autoConnect is true
  useEffect(() => {
    if (autoConnect && channelId) {
      connect();
    }

    return () => {
      if (autoConnect) {
        // No need to disconnect on unmount if we're auto-connecting
        // The socket is managed globally
      }
    };
  }, [autoConnect, channelId, connect]);

  return {
    connected,
    qrCode,
    session,
    contacts,
    isLoading,
    connect,
    disconnect,
    getContacts,
    refreshQrCode,
  };
}
