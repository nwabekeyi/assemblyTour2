import {
    Users,
    PenTool,
    Calendar,
    Package,
    BarChart2,
    Menu,
    X,
    TrendingUp,
    DollarSign,
    UserPlus,
    Eye,
    LogOut,
  } from "lucide-react";
  import React, { useState } from "react";
  import { render } from "react-dom";
  import Sidebar from "./Sidebar";
  import Header from "./Header";
function Activities() {
  return (
   
    <main className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-blue-500/20 rounded-full">
            <TrendingUp className="w-6 h-6 text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-slate-400">Total Sales</p>
            <p className="text-2xl font-semibold text-white">$24,563</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-emerald-500/20 rounded-full">
            <DollarSign className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="ml-4">
            <p className="text-slate-400">Revenue</p>
            <p className="text-2xl font-semibold text-white">$18,230</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-purple-500/20 rounded-full">
            <UserPlus className="w-6 h-6 text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-slate-400">New Users</p>
            <p className="text-2xl font-semibold text-white">573</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-6 rounded-lg shadow">
        <div className="flex items-center">
          <div className="p-3 bg-amber-500/20 rounded-full">
            <Eye className="w-6 h-6 text-amber-400" />
          </div>
          <div className="ml-4">
            <p className="text-slate-400">Page Views</p>
            <p className="text-2xl font-semibold text-white">24,312</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 bg-slate-800 rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <div className="mt-4">
          <div className="border-b border-slate-700 py-3">
            <p className="text-sm text-slate-200">New user registered</p>
            <p className="text-xs text-slate-500">2 minutes ago</p>
          </div>
          <div className="border-b border-slate-700 py-3">
            <p className="text-sm text-slate-200">New blog post created</p>
            <p className="text-xs text-slate-500">1 hour ago</p>
          </div>
          <div className="border-b border-slate-700 py-3">
            <p className="text-sm text-slate-200">Event "Summer Sale" created</p>
            <p className="text-xs text-slate-500">3 hours ago</p>
          </div>
          <div className="py-3">
            <p className="text-sm text-slate-200">New package added</p>
            <p className="text-xs text-slate-500">5 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default Activities
