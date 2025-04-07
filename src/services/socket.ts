
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

// Define event types for better type safety
export interface WhatsAppEvents {
  "qr": (qrCode: string) => void;
  "ready": (sessionInfo: WhatsAppSession) => void;
  "authenticated": (sessionInfo: WhatsAppSession) => void;
  "disconnected": (reason: string) => void;
  "connection_failed": (error: string) => void;
  "contacts_received": (contacts: WhatsAppContact[]) => void;
}

export interface WhatsAppSession {
  id: string;
  phoneNumber: string;
  status: 'active' | 'inactive' | 'connecting';
  lastActive: string;
}

export interface WhatsAppContact {
  id: string;
  name?: string;
  number: string;
  isGroup?: boolean;
  timestamp?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Function[]> = new Map();
  private connectionAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  
  // Connect to the socket server
  connect(channelId?: string): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.socket && this.socket.connected) {
        resolve(true);
        return;
      }
      
      const serverUrl = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';
      
      this.socket = io(serverUrl, {
        query: channelId ? { channelId } : undefined,
        reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
        timeout: 10000,
      });
      
      this.setupDefaultListeners();
      
      this.socket.on('connect', () => {
        this.connectionAttempts = 0;
        console.log('Socket connected with ID:', this.socket?.id);
        resolve(true);
      });
      
      this.socket.on('connect_error', (error) => {
        this.connectionAttempts++;
        console.error('Socket connection error:', error);
        
        if (this.connectionAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
          toast.error("Failed to connect to WhatsApp service. Please try again later.");
          this.disconnect();
          resolve(false);
        }
      });
    });
  }
  
  // Setup default socket event listeners
  private setupDefaultListeners() {
    if (!this.socket) return;
    
    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      
      if (reason === "io server disconnect") {
        // The server has forcefully disconnected the socket
        toast.error("Connection lost. The server has disconnected.");
      } else if (reason === "transport close" || reason === "ping timeout") {
        toast.error("Connection to WhatsApp service lost. Attempting to reconnect...");
      }
    });
    
    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error("An error occurred with the WhatsApp connection.");
    });
  }
  
  // Disconnect from the socket server
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }
  
  // Add event listener for WhatsApp events
  on<T extends keyof WhatsAppEvents>(event: T, callback: WhatsAppEvents[T]) {
    if (!this.socket) {
      console.error('Socket not connected');
      return () => {}; // Return noop cleanup function
    }
    
    // Add to our listener map for cleanup
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback as Function);
    
    // Add the actual socket listener
    this.socket.on(event, callback as any);
    
    // Return a cleanup function
    return () => {
      if (this.socket) {
        this.socket.off(event, callback as any);
        
        // Also remove from our listener map
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
          const index = eventListeners.indexOf(callback as Function);
          if (index !== -1) {
            eventListeners.splice(index, 1);
          }
        }
      }
    };
  }
  
  // Emit an event to the socket server
  emit<T>(event: string, data?: T) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    
    this.socket.emit(event, data);
  }
  
  // Check if socket is connected
  isConnected(): boolean {
    return !!this.socket && this.socket.connected;
  }
  
  // Get active contacts from WhatsApp
  getContacts(channelId: string) {
    this.emit('get_contacts', { channelId });
  }
  
  // Initialize or reconnect to a WhatsApp session
  initializeWhatsAppSession(channelId: string, forceNewQR: boolean = false) {
    this.emit('initialize_whatsapp', { channelId, forceNewQR });
  }
  
  // Disconnect a WhatsApp session
  disconnectWhatsAppSession(channelId: string) {
    this.emit('disconnect_whatsapp', { channelId });
  }
}

// Export as singleton
export const socketService = new SocketService();
