"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Timer } from "lucide-react"

interface DrillBannerProps {
  scenario: string
}

export function DrillBanner({ scenario }: DrillBannerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-warning-orange/20 border-b border-warning-orange/30 px-4 py-3">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-warning-orange/20">
            <AlertTriangle className="w-5 h-5 text-warning-orange" />
          </div>
          <div>
            <span className="text-sm text-warning-orange/80">当前场景：</span>
            <span className="text-sm font-medium text-warning-orange">{scenario}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-warning-orange/10 rounded-lg px-3 py-1.5">
          <Timer className="w-4 h-4 text-warning-orange" />
          <span className="font-mono text-sm font-medium text-warning-orange">
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>
    </div>
  )
}
