
import React from "react";
import { MessageSquare, QrCode, Download, Users, Plus } from "lucide-react";

const DashboardIllustration = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 p-6 rounded-xl border border-emerald-100 dark:border-emerald-900/30 shadow-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-teal-200/20 dark:bg-teal-700/10 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300">WhatsApp Channel Manager</h3>
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-70"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-40"></div>
          </div>
        </div>
        
        {/* Main illustration content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Left side - Channels */}
          <div className="md:col-span-1 bg-white dark:bg-gray-800/90 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                <Users className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                Channels
              </h4>
              <button className="text-xs bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full px-2 py-1 transition-colors flex items-center">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-3 mt-2">
              {["Sales Team", "Support", "Marketing"].map((channel, i) => (
                <div key={i} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="bg-emerald-500 w-2 h-2 rounded-full"></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{channel}</span>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-gray-500">Active</span>
                </div>
              ))}
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-md transition-colors">
                <div className="flex items-center space-x-2">
                  <div className="bg-amber-500 w-2 h-2 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Events</span>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">Pending</span>
              </div>
            </div>
          </div>
          
          {/* Middle - QR Code */}
          <div className="bg-white dark:bg-gray-800/90 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
            <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center mb-4">
              <QrCode className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              Connect Channel
            </h4>
            <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900/50 rounded-lg p-3">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg relative flex items-center justify-center">
                <div className="grid grid-cols-4 grid-rows-4 gap-1 w-24 h-24">
                  {[...Array(16)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`${Math.random() > 0.6 ? 'bg-gray-800 dark:bg-gray-300' : 'bg-transparent'} 
                                  ${i === 0 || i === 3 || i === 12 || i === 15 ? 'bg-gray-800 dark:bg-gray-300 rounded-lg' : ''}`}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <MessageSquare className="h-12 w-12 text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">Scan with WhatsApp to connect</p>
            </div>
          </div>
          
          {/* Right side - Contacts */}
          <div className="bg-white dark:bg-gray-800/90 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-emerald-600 dark:text-emerald-400" />
                New Contacts
              </h4>
              <button className="text-xs bg-emerald-100 dark:bg-emerald-900/50 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 rounded-full px-2 py-1 transition-colors flex items-center">
                <Download className="h-3 w-3 mr-1" />
                Export
              </button>
            </div>
            <div className="space-y-2">
              {[
                { number: "+1 555-123-4567", channel: "Sales" },
                { number: "+1 555-765-4321", channel: "Support" },
                { number: "+1 555-987-6543", channel: "Marketing" }
              ].map((contact, i) => (
                <div key={i} className="p-2 text-xs border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{contact.number}</span>
                    <span className="text-gray-400 dark:text-gray-500">2m ago</span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 mt-1">
                    via {contact.channel} channel
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {[
            { label: "Active Channels", value: "5" },
            { label: "Total Contacts", value: "32" },
            { label: "New Today", value: "8" },
            { label: "Exports", value: "12" }
          ].map((stat, i) => (
            <div key={i} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50 text-center">
              <div className="text-xl font-semibold text-emerald-700 dark:text-emerald-400">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardIllustration;
