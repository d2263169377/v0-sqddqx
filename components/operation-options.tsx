"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Terminal, Send, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  id: string
  label: string
  code: string
  isCorrect?: boolean
}

interface OperationOptionsProps {
  title: string
  options: Option[]
  type: "single" | "multiple"
  correctAnswers: string[]
  onSubmit: (selected: string[], isCorrect: boolean) => void
  onNext?: () => void
}

export function OperationOptions({ 
  title, 
  options, 
  type, 
  correctAnswers,
  onSubmit, 
  onNext 
}: OperationOptionsProps) {
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleSingleSelect = (value: string) => {
    if (submitted) return
    setSelected([value])
  }

  const handleMultipleSelect = (optionId: string, checked: boolean) => {
    if (submitted) return
    if (checked) {
      setSelected([...selected, optionId])
    } else {
      setSelected(selected.filter((id) => id !== optionId))
    }
  }

  const handleSubmit = () => {
    if (selected.length === 0) return
    
    // Check if the answer is correct
    const sortedSelected = [...selected].sort()
    const sortedCorrect = [...correctAnswers].sort()
    const correct = 
      sortedSelected.length === sortedCorrect.length &&
      sortedSelected.every((val, idx) => val === sortedCorrect[idx])
    
    setIsCorrect(correct)
    setSubmitted(true)
    onSubmit(selected, correct)
  }

  const handleNext = () => {
    if (onNext) {
      onNext()
    }
  }

  const getOptionStyle = (optionId: string) => {
    if (!submitted) {
      return selected.includes(optionId) ? "border-tech-blue/50 bg-tech-blue/10" : ""
    }
    
    const isOptionCorrect = correctAnswers.includes(optionId)
    const isSelected = selected.includes(optionId)
    
    if (isOptionCorrect) {
      return "border-smart-green/50 bg-smart-green/10"
    }
    if (isSelected && !isOptionCorrect) {
      return "border-red-500/50 bg-red-500/10"
    }
    return "opacity-50"
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
          <RadioGroup 
            value={selected[0]} 
            onValueChange={handleSingleSelect}
            disabled={submitted}
          >
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-all duration-200",
                  !submitted && "cursor-pointer",
                  getOptionStyle(option.id)
                )}
              >
                <RadioGroupItem value={option.id} id={option.id} disabled={submitted} />
                <Label 
                  htmlFor={option.id} 
                  className={cn("flex-1", !submitted && "cursor-pointer")}
                >
                  <span className="text-tech-blue font-mono mr-2">[{option.code}]</span>
                  <span className="text-foreground/90">{option.label}</span>
                </Label>
                {submitted && correctAnswers.includes(option.id) && (
                  <CheckCircle2 className="w-5 h-5 text-smart-green" />
                )}
                {submitted && selected.includes(option.id) && !correctAnswers.includes(option.id) && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-2">
            {options.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "flex items-center space-x-3 rounded-lg border border-border/50 p-3 transition-all duration-200",
                  !submitted && "cursor-pointer",
                  getOptionStyle(option.id)
                )}
              >
                <Checkbox
                  id={option.id}
                  checked={selected.includes(option.id)}
                  onCheckedChange={(checked) => handleMultipleSelect(option.id, checked as boolean)}
                  disabled={submitted}
                />
                <Label 
                  htmlFor={option.id} 
                  className={cn("flex-1", !submitted && "cursor-pointer")}
                >
                  <span className="text-tech-blue font-mono mr-2">[{option.code}]</span>
                  <span className="text-foreground/90">{option.label}</span>
                </Label>
                {submitted && correctAnswers.includes(option.id) && (
                  <CheckCircle2 className="w-5 h-5 text-smart-green" />
                )}
                {submitted && selected.includes(option.id) && !correctAnswers.includes(option.id) && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Result feedback */}
        {submitted && (
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
            isCorrect 
              ? "bg-smart-green/10 border-smart-green/30" 
              : "bg-red-500/10 border-red-500/30"
          )}>
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-smart-green flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-smart-green">回答正确</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    操作规范，符合电力系统安全规程要求。
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-red-500">回答错误</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    正确答案已标注，请注意规程要求。
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Action buttons */}
        {!submitted ? (
          <Button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full bg-tech-blue hover:bg-tech-blue/90 text-background font-medium transition-all duration-300"
          >
            <Send className="w-4 h-4 mr-2" />
            提交操作
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="w-full bg-smart-green hover:bg-smart-green/90 text-background font-medium transition-all duration-300"
          >
            继续下一步
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
