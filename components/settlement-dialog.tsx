"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { AlertCircle, Trophy, X } from "lucide-react"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts"

interface ViolationItem {
  id: string
  description: string
  deduction: number
}

interface SettlementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  radarData: { subject: string; value: number; fullMark: number }[]
  violations: ViolationItem[]
  totalScore: number
}

export function SettlementDialog({
  open,
  onOpenChange,
  radarData,
  violations,
  totalScore,
}: SettlementDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Trophy className="w-6 h-6 text-warning-orange" />
            演练结算报告
          </DialogTitle>
          <DialogDescription className="sr-only">
            显示本次模拟演练的能力分析雷达图和违章扣分详情
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Radar Chart */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">能力分析</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.25 0.02 250)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "oklch(0.6 0 0)", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "oklch(0.5 0 0)", fontSize: 10 }}
                  />
                  <Radar
                    name="能力值"
                    dataKey="value"
                    stroke="oklch(0.62 0.21 255)"
                    fill="oklch(0.62 0.21 255)"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-secondary/30">
              <span className="text-sm text-muted-foreground">综合得分</span>
              <span className="text-3xl font-bold text-tech-blue">{totalScore}</span>
              <span className="text-sm text-muted-foreground">分</span>
            </div>
          </div>

          {/* Violations List */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">违章扣分项</h3>
            <ScrollArea className="h-72 rounded-lg border border-border/50 bg-secondary/20">
              <div className="p-4 space-y-3">
                {violations.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    无违章记录，表现优秀！
                  </p>
                ) : (
                  violations.map((violation) => (
                    <div
                      key={violation.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                    >
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-destructive">{violation.description}</p>
                      </div>
                      <span className="text-sm font-semibold text-destructive shrink-0">
                        -{violation.deduction}分
                      </span>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-tech-blue hover:bg-tech-blue/90 text-background font-medium"
            >
              确认结算
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
