"use client"

import { useState } from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { ChatMessage } from "@/components/chat-message"
import { DefectReportCard } from "@/components/defect-report-card"
import { DrillBanner } from "@/components/drill-banner"
import { OperationOptions } from "@/components/operation-options"
import { EvaluationWidget } from "@/components/evaluation-widget"
import { SettlementDialog } from "@/components/settlement-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Sparkles } from "lucide-react"

type Mode = "assistant" | "drill"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  card?: {
    type: "defect-report" | "operation-options"
    data: Record<string, unknown>
  }
}

// Mock data for assistant mode
const assistantMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "110kV某变电站出现母线差动保护动作，请分析缺陷并给出处置建议。",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "根据您提供的信息，我已完成故障分析。110kV母线差动保护动作可能由多种原因引起，包括：CT饱和、二次回路故障、保护装置本体问题等。以下是详细的缺陷汇报报告：",
    card: {
      type: "defect-report",
      data: {
        defectLevel: "紧急",
        defectImpact:
          "110kV某变电站I母差动保护装置在运行中发生误动作，导致I母所带负荷全部转供。当前II母供电正常，但失去冗余供电能力，若II母发生故障将造成全站失压。",
        dispatchMeasure:
          "1. 立即安排值班人员检查I母差动保护装置及二次回路；\n2. 联系继保班组到现场进行保护校验；\n3. 临时将I母所带线路负荷转移至II母；\n4. 准备备用保护装置，随时准备更换。",
      },
    },
  },
]

// Mock data for drill mode
const drillMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "【演练开始】当前模拟场景：110kV某线路光纤通信异常。光纤通道中断导致纵联差动保护通道故障，请根据规程进行应急处置。",
  },
  {
    id: "2",
    role: "user",
    content: "收到，我将检查光纤通道状态并采取相应措施。",
  },
  {
    id: "3",
    role: "assistant",
    content:
      "系统检测到光纤通道A已中断，通道B状态正常但信号衰减较大。请选择下一步操作指令：",
    card: {
      type: "operation-options",
      data: {
        title: "操作指令集",
        type: "multiple",
        options: [
          { id: "a", code: "A", label: "申请停用纵联差动保护" },
          { id: "b", code: "B", label: "投入距离保护作为后备" },
          { id: "c", code: "C", label: "联系通信班检修光纤通道" },
          { id: "d", code: "D", label: "申请线路停电检修" },
        ],
      },
    },
  },
]

// Evaluation metrics for drill mode
const evaluationMetrics = [
  { label: "规程符合度", value: 85, color: "oklch(0.62 0.21 255)" },
  { label: "响应时效性", value: 92, color: "oklch(0.65 0.2 145)" },
  { label: "操作准确率", value: 78, color: "oklch(0.75 0.18 55)" },
]

// Settlement data
const radarData = [
  { subject: "故障判断", value: 88, fullMark: 100 },
  { subject: "规程执行", value: 85, fullMark: 100 },
  { subject: "操作规范", value: 90, fullMark: 100 },
  { subject: "应急响应", value: 82, fullMark: 100 },
  { subject: "沟通协调", value: 95, fullMark: 100 },
]

const violations = [
  { id: "1", description: "未及时汇报调度，延误3分钟", deduction: 5 },
  { id: "2", description: "操作顺序有误，先投后停", deduction: 8 },
]

export default function PowerGridAssistant() {
  const [mode, setMode] = useState<Mode>("assistant")
  const [inputValue, setInputValue] = useState("")
  const [settlementOpen, setSettlementOpen] = useState(false)

  const messages = mode === "assistant" ? assistantMessages : drillMessages

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    // In a real app, this would send the message to the backend
    setInputValue("")
  }

  const handleOperationSubmit = (selected: string[]) => {
    console.log("Selected operations:", selected)
    // In a real app, this would process the selection
  }

  const handleEndDrill = () => {
    setSettlementOpen(true)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav currentMode={mode} onModeChange={setMode} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Drill Banner (only in drill mode) */}
        {mode === "drill" && <DrillBanner scenario="110kV某线路光纤通信异常" />}

        {/* Chat Area */}
        <div className="flex-1 flex relative overflow-hidden">
          <ScrollArea className="flex-1 p-6">
            <div className="max-w-3xl mx-auto space-y-6 pb-32">
              {/* Welcome message */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech-blue/10 text-tech-blue mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {mode === "assistant" ? "缺陷处置助手" : "模拟演练模式"}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  {mode === "assistant" ? "智能辅助缺陷分析与处置" : "故障场景模拟演练"}
                </h2>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {mode === "assistant"
                    ? "描述您遇到的设备缺陷或故障现象，AI将帮助您分析问题并提供处置建议"
                    : "在模拟场景中练习故障处置流程，提升应急响应能力"}
                </p>
              </div>

              {/* Messages */}
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content}>
                  {message.card?.type === "defect-report" && (
                    <DefectReportCard
                      defectLevel={message.card.data.defectLevel as string}
                      defectImpact={message.card.data.defectImpact as string}
                      dispatchMeasure={message.card.data.dispatchMeasure as string}
                    />
                  )}
                  {message.card?.type === "operation-options" && (
                    <OperationOptions
                      title={message.card.data.title as string}
                      type={message.card.data.type as "single" | "multiple"}
                      options={
                        message.card.data.options as { id: string; code: string; label: string }[]
                      }
                      onSubmit={handleOperationSubmit}
                    />
                  )}
                </ChatMessage>
              ))}
            </div>
          </ScrollArea>

          {/* Evaluation Widget (only in drill mode) */}
          {mode === "drill" && (
            <div className="absolute top-4 right-4 w-48">
              <EvaluationWidget metrics={evaluationMetrics} />
              <Button
                onClick={handleEndDrill}
                variant="outline"
                className="w-full mt-3 border-warning-orange/50 text-warning-orange hover:bg-warning-orange/10"
              >
                结束演练
              </Button>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  mode === "assistant" ? "描述您遇到的设备缺陷或故障现象..." : "输入您的操作指令或回复..."
                }
                className="flex-1 bg-secondary/50 border-border/50 focus-visible:ring-tech-blue"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-tech-blue hover:bg-tech-blue/90 text-background px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              AI 助手基于电力行业规程和历史案例提供建议，请结合实际情况判断
            </p>
          </div>
        </div>
      </div>

      {/* Settlement Dialog */}
      <SettlementDialog
        open={settlementOpen}
        onOpenChange={setSettlementOpen}
        radarData={radarData}
        violations={violations}
        totalScore={87}
      />
    </div>
  )
}
