
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Download, Search, Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Contact, ContactFilters, Channel } from "@/types";

const Contacts: React.FC = () => {
  const location = useLocation();
  const initialChannelId = location.state?.channelId || null;

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
    }
  ]);
  
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      phoneNumber: "+1555123456",
      username: "John Smith",
      channelId: "1",
      channelName: "Sales Team",
      timestamp: "2023-04-07T08:30:00Z",
      message: "Hello, I'm interested in your product"
    },
    {
      id: "2",
      phoneNumber: "+1555234567",
      username: "Maria Garcia",
      channelId: "1",
      channelName: "Sales Team",
      timestamp: "2023-04-07T09:15:00Z",
      message: "Can you tell me more about pricing?"
    },
    {
      id: "3",
      phoneNumber: "+1555345678",
      channelId: "2",
      channelName: "Support",
      timestamp: "2023-04-06T14:20:00Z",
      message: "I need help with my account"
    },
    {
      id: "4",
      phoneNumber: "+1555456789",
      username: "Alex Johnson",
      channelId: "3",
      channelName: "Marketing",
      timestamp: "2023-04-05T11:45:00Z",
      message: "I saw your ad and wanted to know more"
    },
    {
      id: "5",
      phoneNumber: "+1555567890",
      channelId: "2",
      channelName: "Support",
      timestamp: "2023-04-04T16:30:00Z",
      message: "How do I reset my password?"
    }
  ]);
  
  const [filters, setFilters] = useState<ContactFilters>({
    search: "",
    channelId: initialChannelId,
    dateRange: [null, null]
  });
  
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Filters applied");
  };
  
  const clearFilters = () => {
    setFilters({
      search: "",
      channelId: null,
      dateRange: [null, null]
    });
    setDate(undefined);
    toast.info("Filters cleared");
  };
  
  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id));
    }
    setIsSelectAll(!isSelectAll);
  };
  
  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };
  
  const exportCSV = () => {
    toast.success(`Exported ${selectedContacts.length || filteredContacts.length} contacts as CSV`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">New Contacts</h1>
            <p className="text-muted-foreground">
              Track and manage new contacts from all your WhatsApp channels
            </p>
          </div>
          
          <Button 
            onClick={exportCSV}
            className="flex items-center gap-1 self-start"
            disabled={filteredContacts.length === 0}
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter contacts by channel, date, or search terms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Phone, name or channel"
                      className="pl-8"
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select
                    value={filters.channelId || "all"}
                    onValueChange={(value) => setFilters({ ...filters, channelId: value === "all" ? null : value })}
                  >
                    <SelectTrigger id="channel">
                      <SelectValue placeholder="All channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All channels</SelectItem>
                      {channels.map((channel) => (
                        <SelectItem key={channel.id} value={channel.id}>
                          {channel.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          if (date) {
                            setFilters({
                              ...filters,
                              dateRange: [date, date]
                            });
                          }
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex items-end gap-2">
                  <Button type="submit" className="flex-1">Apply Filters</Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear filters</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>Contact List</CardTitle>
              <div className="text-sm text-muted-foreground">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredContacts.length > 0 ? (
              <>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={isSelectAll}
                            onCheckedChange={handleSelectAll}
                            aria-label="Select all"
                          />
                        </TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Message</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedContacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedContacts.includes(contact.id)}
                              onCheckedChange={() => handleSelectContact(contact.id)}
                              aria-label={`Select contact ${contact.phoneNumber}`}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{contact.phoneNumber}</TableCell>
                          <TableCell>{contact.username || "Unknown"}</TableCell>
                          <TableCell>{contact.channelName}</TableCell>
                          <TableCell>{new Date(contact.timestamp).toLocaleString()}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {contact.message || "No message"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-4">
                    <Pagination>
                      <PaginationContent>
                        {currentPage > 1 && (
                          <PaginationItem>
                            <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                          </PaginationItem>
                        )}
                        
                        {Array.from({ length: totalPages }).map((_, index) => (
                          <PaginationItem key={index}>
                            <PaginationLink
                              isActive={currentPage === index + 1}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        {currentPage < totalPages && (
                          <PaginationItem>
                            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No contacts found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Contacts;

