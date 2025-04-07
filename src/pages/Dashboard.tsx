
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardIllustration from "@/components/DashboardIllustration";

const Dashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    {
      title: "Active Channels",
      value: 5,
      description: "WhatsApp channels connected",
      icon: <Users className="h-5 w-5 text-primary" />,
      change: "+2 this week",
    },
    {
      title: "New Contacts",
      value: 24,
      description: "Contacts across all channels",
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      change: "+8 today",
    },
    {
      title: "Pending Connections",
      value: 1,
      description: "Channels awaiting QR scan",
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      change: "",
    },
    {
      title: "Successful Exports",
      value: 12,
      description: "CSV exports completed",
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      change: "+3 this week",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your WhatsApp channel management system
          </p>
        </div>

        {/* Dashboard Illustration */}
        <DashboardIllustration />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                {stat.change && (
                  <p className="text-xs font-medium text-primary mt-2">
                    {stat.change}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Channels</CardTitle>
              <CardDescription>
                Your most recently configured WhatsApp channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sales Team", status: "active", lastActive: "2 minutes ago" },
                  { name: "Support", status: "active", lastActive: "1 hour ago" },
                  { name: "Marketing", status: "active", lastActive: "3 hours ago" },
                  { name: "Events", status: "pending", lastActive: "N/A" },
                ].map((channel, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          channel.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {channel.lastActive}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest contact and channel activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New contact detected", details: "From Sales Team channel", time: "5 minutes ago" },
                  { action: "CSV Export", details: "All contacts from Support", time: "2 hours ago" },
                  { action: "Channel created", details: "Events channel", time: "5 hours ago" },
                  { action: "New contact detected", details: "From Marketing channel", time: "1 day ago" },
                ].map((activity, i) => (
                  <div key={i} className="border-l-2 border-primary/30 pl-3">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
