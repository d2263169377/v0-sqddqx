"use client"

import { cn } from "@/lib/utils"
import { 
  AlertTriangle, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react"

type Mode = "assistant" | "drill"

interface SidebarNavProps {
  currentMode: Mode
  onModeChange: (mode: Mode) => void
}

const navItems = [
  {
    mode: "assistant" as Mode,
    icon: AlertTriangle,
    label: "缺陷处置",
    description: "智能辅助缺陷分析与处置",
  },
  {
    mode: "drill" as Mode,
    icon: GraduationCap,
    label: "模拟演练",
    description: "故障场景模拟与考核",
  },
]

export function SidebarNav({ currentMode, onModeChange }: SidebarNavProps) {
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

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentMode === item.mode

            const button = (
              <button
                onClick={() => onModeChange(item.mode)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary/20 text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-tech-blue")} />
                {!collapsed && (
                  <div className="text-left overflow-hidden">
                    <p className="text-sm font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                )}
              </button>
            )

            if (collapsed) {
              return (
                <Tooltip key={item.mode}>
                  <TooltipTrigger asChild>{button}</TooltipTrigger>
                  <TooltipContent side="right" className="bg-popover text-popover-foreground">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return <div key={item.mode}>{button}</div>
          })}
        </nav>

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
