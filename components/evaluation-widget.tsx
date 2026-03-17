"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity } from "lucide-react"

interface EvaluationMetric {
  label: string
  value: number
  color: string
}

interface EvaluationWidgetProps {
  metrics: EvaluationMetric[]
}

function CircularProgress({ value, color, size = 80, strokeWidth = 6 }: { 
  value: number
  color: string
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-foreground">{value}%</span>
      </div>
    </div>
  )
}

export function EvaluationWidget({ metrics }: EvaluationWidgetProps) {
  return (
    <Card className="glass border-border/30 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-tech-blue" />
          <CardTitle className="text-sm font-medium text-foreground">实时考评</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex items-center gap-3">
              <CircularProgress value={metric.value} color={metric.color} size={60} strokeWidth={5} />
              <span className="text-xs text-muted-foreground leading-tight">{metric.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
