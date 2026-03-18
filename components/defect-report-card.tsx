"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Save, CheckCircle2, AlertTriangle, Zap, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface DefectReportCardProps {
  defectLevel: string
  defectContent: string
  defectImpact: string
  dispatchMeasure: string
}

const defectLevelOptions = [
  { value: "紧急", label: "紧急", color: "bg-red-500/20 text-red-400 border-red-500/50" },
  { value: "一般", label: "一般", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50" },
  { value: "轻微", label: "轻微", color: "bg-green-500/20 text-green-400 border-green-500/50" },
]

export function DefectReportCard({ 
  defectLevel: initialLevel,
  defectContent: initialContent,
  defectImpact: initialImpact, 
  dispatchMeasure: initialMeasure 
}: DefectReportCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [defectLevel, setDefectLevel] = useState(initialLevel)
  const [defectContent, setDefectContent] = useState(initialContent)
  const [defectImpact, setDefectImpact] = useState(initialImpact)
  const [dispatchMeasure, setDispatchMeasure] = useState(initialMeasure)

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  const getLevelBadgeClass = (level: string) => {
    const option = defectLevelOptions.find(o => o.value === level)
    return option?.color || "bg-muted text-muted-foreground"
  }

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-500 border-border/50",
      isConfirmed && "bg-smart-green/5 border-smart-green/30"
    )}>
      {/* Confirmed watermark */}
      {isConfirmed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-2 text-smart-green/20 text-4xl font-bold rotate-[-15deg]">
            <CheckCircle2 className="w-12 h-12" />
            <span>已下达</span>
          </div>
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-tech-blue/20">
            <AlertTriangle className="w-5 h-5 text-tech-blue" />
          </div>
          <CardTitle className="text-lg font-medium text-foreground">缺陷汇报报告</CardTitle>
        </div>
        {!isConfirmed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                保存
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4 mr-2" />
                编辑
              </>
            )}
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Defect Level */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            缺陷等级
          </div>
          {isEditing ? (
            <Select value={defectLevel} onValueChange={setDefectLevel}>
              <SelectTrigger className="w-full bg-secondary/50 border-border/50">
                <SelectValue placeholder="选择缺陷等级" />
              </SelectTrigger>
              <SelectContent>
                {defectLevelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Badge variant="outline" className={cn("font-medium", getLevelBadgeClass(defectLevel))}>
              {defectLevel}
            </Badge>
          )}
        </div>

        {/* Defect Content */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertTriangle className="w-4 h-4" />
            缺陷内容
          </div>
          {isEditing ? (
            <Textarea
              value={defectContent}
              onChange={(e) => setDefectContent(e.target.value)}
              className="min-h-[80px] bg-secondary/50 border-border/50 resize-none"
              placeholder="描述缺陷内容..."
            />
          ) : (
            <p className="text-sm text-foreground/90 bg-secondary/30 rounded-lg p-3">
              {defectContent}
            </p>
          )}
        </div>

        {/* Defect Impact */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            缺陷影响
          </div>
          {isEditing ? (
            <Textarea
              value={defectImpact}
              onChange={(e) => setDefectImpact(e.target.value)}
              className="min-h-[80px] bg-secondary/50 border-border/50 resize-none"
              placeholder="描述缺陷影响..."
            />
          ) : (
            <p className="text-sm text-foreground/90 bg-secondary/30 rounded-lg p-3">
              {defectImpact}
            </p>
          )}
        </div>

        {/* Dispatch Measure */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="w-4 h-4" />
            调度措施
          </div>
          {isEditing ? (
            <Textarea
              value={dispatchMeasure}
              onChange={(e) => setDispatchMeasure(e.target.value)}
              className="min-h-[80px] bg-secondary/50 border-border/50 resize-none"
              placeholder="描述调度措施..."
            />
          ) : (
            <p className="text-sm text-foreground/90 bg-secondary/30 rounded-lg p-3">
              {dispatchMeasure}
            </p>
          )}
        </div>
      </CardContent>

      {!isConfirmed && (
        <CardFooter>
          <Button 
            onClick={handleConfirm}
            className="w-full bg-smart-green hover:bg-smart-green/90 text-background font-medium transition-all duration-300 glow-green"
            disabled={isEditing}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            确认无误并下达
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
