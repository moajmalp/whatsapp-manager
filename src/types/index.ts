
// Channel Types
export interface Channel {
  id: string;
  name: string;
  phoneNumber: string;
  status: 'active' | 'inactive' | 'connecting';
  createdAt: string;
  lastActive?: string;
}

// Contact Types
export interface Contact {
  id: string;
  phoneNumber: string;
  username?: string;
  channelId: string;
  channelName: string;
  timestamp: string;
  message?: string;
}

// Filter Types
export interface ContactFilters {
  search: string;
  channelId: string | null;
  dateRange: [Date | null, Date | null];
}

// Channel Form Types
export interface ChannelFormData {
  name: string;
  phoneNumber: string;
}
