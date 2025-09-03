import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bug, Activity, Settings, Terminal } from "lucide-react";

interface DebugLog {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  component: string;
  message: string;
}

interface DebugPanelProps {
  isRunning: boolean;
  selectedOS?: string;
  logs: DebugLog[];
  onClearLogs: () => void;
}

export const DebugPanel = ({ isRunning, selectedOS, logs = [], onClearLogs }: DebugPanelProps) => {
  const [activeTab, setActiveTab] = useState("logs");

  const emulatorInfo = {
    version: "v86 2.3.1",
    architecture: "x86_64",
    memory: "512MB",
    vgaMemory: "32MB",
    bootDevice: "hda",
    networkAdapter: "rtl8139",
    audioDevice: "sb16"
  };

  const hardwareInfo = {
    cpu: "Intel Pentium III (Coppermine)",
    clockSpeed: "1000 MHz",
    cores: 1,
    cache: "256KB L2",
    fpu: "Integrated",
    features: ["MMX", "SSE", "FXSR"]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'bg-red-500';
      case 'warn': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelTextColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-card border-2 border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Bug className="w-5 h-5 mr-2 text-primary" />
            Debug Panel
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? 'Active' : 'Inactive'}
            </Badge>
            {logs.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearLogs}
                className="text-xs"
              >
                Clear Logs
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 p-1 m-4">
          <TabsTrigger value="logs" className="text-xs">
            <Terminal className="w-4 h-4 mr-1" />
            Logs
          </TabsTrigger>
          <TabsTrigger value="hardware" className="text-xs">
            <Settings className="w-4 h-4 mr-1" />
            Hardware
          </TabsTrigger>
          <TabsTrigger value="emulator" className="text-xs">
            <Activity className="w-4 h-4 mr-1" />
            Emulator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="p-4 pt-0">
          <ScrollArea className="h-64">
            {logs.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                No debug logs available
              </div>
            ) : (
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <Badge className={`${getLevelColor(log.level)} text-white text-xs px-1 py-0`}>
                      {log.level.toUpperCase()}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-mono text-xs text-muted-foreground">
                          [{log.timestamp}] {log.component}:
                        </span>
                      </div>
                      <div className={`${getLevelTextColor(log.level)} font-mono text-xs`}>
                        {log.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="hardware" className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">CPU Information</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processor:</span>
                  <span className="font-mono">{hardwareInfo.cpu}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Clock Speed:</span>
                  <span className="font-mono">{hardwareInfo.clockSpeed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cores:</span>
                  <span className="font-mono">{hardwareInfo.cores}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cache:</span>
                  <span className="font-mono">{hardwareInfo.cache}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Features:</span>
                  <div className="flex space-x-1">
                    {hardwareInfo.features.map(feature => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="emulator" className="p-4 pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Emulator Configuration</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-mono">{emulatorInfo.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Architecture:</span>
                  <span className="font-mono">{emulatorInfo.architecture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory:</span>
                  <span className="font-mono">{emulatorInfo.memory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">VGA Memory:</span>
                  <span className="font-mono">{emulatorInfo.vgaMemory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boot Device:</span>
                  <span className="font-mono">{emulatorInfo.bootDevice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-mono">{emulatorInfo.networkAdapter}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Audio:</span>
                  <span className="font-mono">{emulatorInfo.audioDevice}</span>
                </div>
              </div>
            </div>

            {selectedOS && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Current Session</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">OS:</span>
                    <span className="font-mono">{selectedOS}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={isRunning ? "default" : "secondary"} className="text-xs">
                      {isRunning ? 'Running' : 'Stopped'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};