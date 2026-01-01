"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Cpu, Zap, TrendingUp } from "lucide-react"

interface PerformanceMetrics {
  executionTime: number
  memoryUsage: number
  cpuUsage: number
  complexity: string
  linesOfCode: number
  averageExecutionTime?: number
}

interface PerformanceAnalyticsProps {
  metrics: PerformanceMetrics
}

export function PerformanceAnalytics({ metrics }: PerformanceAnalyticsProps) {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const formatMemory = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case "o(1)":
      case "constant":
        return "text-green-600"
      case "o(log n)":
      case "logarithmic":
        return "text-blue-600"
      case "o(n)":
      case "linear":
        return "text-yellow-600"
      case "o(n log n)":
      case "linearithmic":
        return "text-orange-600"
      case "o(n²)":
      case "quadratic":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <CardTitle className="text-sm">Execution Time</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatTime(metrics.executionTime)}</div>
            {metrics.averageExecutionTime && (
              <div className="text-xs text-muted-foreground mt-1">
                Avg: {formatTime(metrics.averageExecutionTime)}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-600" />
              <CardTitle className="text-sm">Memory Usage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMemory(metrics.memoryUsage)}</div>
            <Progress value={Math.min((metrics.memoryUsage / (100 * 1024 * 1024)) * 100, 100)} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-600" />
              <CardTitle className="text-sm">Complexity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getComplexityColor(metrics.complexity)}`}>
              {metrics.complexity}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Time complexity
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <CardTitle className="text-sm">Lines of Code</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.linesOfCode}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Total lines written
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">CPU Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={metrics.cpuUsage} className="flex-1" />
            <span className="text-sm font-medium">{metrics.cpuUsage}%</span>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 border-t">
        <h4 className="text-sm font-semibold mb-2">Performance Tips</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Consider optimizing loops for better time complexity</li>
          <li>• Use appropriate data structures to reduce memory usage</li>
          <li>• Profile your code to identify bottlenecks</li>
        </ul>
      </div>
    </div>
  )
}
