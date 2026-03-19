"use client"

import { cn } from "@/lib/utils"
import { 
  MessageSquare, 
  Settings, 
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

interface SidebarNavProps {
  onNewChat?: () => void
}

// 静态对话历史数据
const chatHistory = [
  { id: "1", title: "国园站故障分析" },
  { id: "2", title: "110kV送电方案" },
  { id: "3", title: "母线保护动作处置" },
]

export function SidebarNav({ onNewChat }: SidebarNavProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
          <div className="p-2 rounded-lg bg-tech-blue/20 shrink-0">
            <Zap className="w-5 h-5 text-tech-blue" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-semibold text-sidebar-foreground truncate">
                电网调度系统
              </h1>
              <p className="text-xs text-muted-foreground truncate">智能辅助决策</p>
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-sidebar-border">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onNewChat}
                  variant="outline"
                  size="icon"
                  className="w-full border-tech-blue/50 text-tech-blue hover:bg-tech-blue/10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">发起新对话</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              onClick={onNewChat}
              variant="outline"
              className="w-full border-tech-blue/50 text-tech-blue hover:bg-tech-blue/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              发起新对话
            </Button>
          )}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {!collapsed && (
            <div className="px-3 py-2">
              <p className="text-xs text-muted-foreground mb-2 px-2">历史对话</p>
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 cursor-pointer transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-lg hover:bg-sidebar-accent/50 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">设置</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>系统设置</TooltipContent>
              </Tooltip>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="text-sidebar-foreground/70 hover:text-sidebar-foreground ml-auto"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
