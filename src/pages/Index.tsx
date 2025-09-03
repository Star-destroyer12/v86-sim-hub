import { useState } from "react";
import { OSSelector } from "@/components/OSSelector";
import { EmulatorDisplay } from "@/components/EmulatorDisplay";
import { EmulatorControls } from "@/components/EmulatorControls";
import { TerminalOutput } from "@/components/TerminalOutput";
import { SystemInfo } from "@/components/SystemInfo";
import { DebugPanel } from "@/components/DebugPanel";
import { toast } from "sonner";

interface OSOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface DebugLog {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  component: string;
  message: string;
}

const Index = () => {
  const [selectedOS, setSelectedOS] = useState<string>();
  const [isRunning, setIsRunning] = useState(false);
  const [emulator, setEmulator] = useState<any>(null);
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([]);

  const addDebugLog = (component: string, level: 'debug' | 'info' | 'warn' | 'error', message: string) => {
    const newLog: DebugLog = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      component,
      message
    };
    setDebugLogs(prev => [...prev.slice(-50), newLog]); // Keep last 50 logs
  };

  const handleOSSelect = (os: OSOption) => {
    setSelectedOS(os.id);
    setIsRunning(false);
    addDebugLog('OSSelector', 'info', `Operating system selected: ${os.name}`);
    toast(`${os.name} selected!`);
  };

  const handleStart = () => {
    if (!selectedOS) {
      addDebugLog('EmulatorControls', 'error', 'No operating system selected');
      toast.error("Please select an operating system first");
      return;
    }
    setIsRunning(true);
    addDebugLog('EmulatorControls', 'info', `Starting emulator for ${selectedOS}`);
    toast("Starting emulator...");
  };

  const handlePause = () => {
    setIsRunning(false);
    addDebugLog('EmulatorControls', 'info', 'Emulator paused');
    toast("Emulator paused");
  };

  const handleReset = () => {
    addDebugLog('EmulatorControls', 'info', 'Emulator reset requested');
    if (emulator) {
      // In a real implementation, you would call emulator.restart()
      toast("Emulator reset");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    addDebugLog('EmulatorControls', 'info', 'Emulator stopped');
    if (emulator) {
      // In a real implementation, you would call emulator.stop()
      toast("Emulator stopped");
    }
  };

  const handleClearLogs = () => {
    setDebugLogs([]);
    addDebugLog('DebugPanel', 'info', 'Debug logs cleared');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            v86 OS Emulator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Run operating systems directly in your browser with full debugging capabilities
          </p>
        </div>

        {/* OS Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Choose Your Operating System
          </h2>
          <OSSelector onOSSelect={handleOSSelect} selectedOS={selectedOS} />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Emulator Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emulator Controls */}
            <EmulatorControls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStop={handleStop}
              disabled={!selectedOS}
            />

            {/* Emulator Display */}
            <EmulatorDisplay
              selectedOS={selectedOS}
              isRunning={isRunning}
              onEmulatorReady={setEmulator}
              onLog={addDebugLog}
            />

            {/* Terminal Output */}
            <TerminalOutput
              isRunning={isRunning}
              selectedOS={selectedOS}
              onLog={(line) => addDebugLog('Terminal', line.level as any, line.message)}
            />
          </div>

          {/* Right Column - Monitoring and Debug */}
          <div className="space-y-6">
            {/* System Info */}
            <SystemInfo 
              isRunning={isRunning} 
              selectedOS={selectedOS} 
            />

            {/* Debug Panel */}
            <DebugPanel
              isRunning={isRunning}
              selectedOS={selectedOS}
              logs={debugLogs}
              onClearLogs={handleClearLogs}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
