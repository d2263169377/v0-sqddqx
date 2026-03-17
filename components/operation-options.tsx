"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Terminal, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  id: string
  label: string
  code: string
}

interface OperationOptionsProps {
  title: string
  options: Option[]
  type: "single" | "multiple"
  onSubmit: (selected: string[]) => void
}

export function OperationOptions({ title, options, type, onSubmit }: OperationOptionsProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleSingleSelect = (value: string) => {
    setSelected([value])
  }

  const handleMultipleSelect = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelected([...selected, optionId])
    } else {
      setSelected(selected.filter((id) => id !== optionId))
    }
  }

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit(selected)
    }
  }

  return (
    <Card className="border-tech-blue/30 bg-tech-blue/5">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-tech-blue" />
          <CardTitle className="text-base font-medium text-foreground">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {type === "single" ? (
          <RadioGroup value={selected[0]} onValueChange={handleSingleSelect}>
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-all duration-200 cursor-pointer",
                  selected.includes(option.id) && "border-tech-blue/50 bg-tech-blue/10"
                )}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  <span className="text-tech-blue font-mono mr-2">[{option.code}]</span>
                  <span className="text-foreground/90">{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-all duration-200 cursor-pointer",
                  selected.includes(option.id) && "border-tech-blue/50 bg-tech-blue/10"
                )}
              >
                <Checkbox
                  id={option.id}
                  checked={selected.includes(option.id)}
                  onCheckedChange={(checked) => handleMultipleSelect(option.id, checked as boolean)}
                />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  <span className="text-tech-blue font-mono mr-2">[{option.code}]</span>
                  <span className="text-foreground/90">{option.label}</span>
                </Label>
              </div>
            ))}
          </div>
        )}
        <Button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          className="w-full bg-tech-blue hover:bg-tech-blue/90 text-background font-medium transition-all duration-300"
        >
          <Send className="w-4 h-4 mr-2" />
          提交操作
        </Button>
      </CardContent>
    </Card>
  )
}
