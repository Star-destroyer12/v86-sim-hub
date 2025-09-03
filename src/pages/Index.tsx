import { useState } from "react";
import { OSSelector } from "@/components/OSSelector";
import { EmulatorDisplay } from "@/components/EmulatorDisplay";
import { EmulatorControls } from "@/components/EmulatorControls";
import { toast } from "sonner";

interface OSOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const Index = () => {
  const [selectedOS, setSelectedOS] = useState<string>();
  const [isRunning, setIsRunning] = useState(false);
  const [emulator, setEmulator] = useState<any>(null);

  const handleOSSelect = (os: OSOption) => {
    setSelectedOS(os.id);
    setIsRunning(false);
    toast(`${os.name} selected!`);
  };

  const handleStart = () => {
    if (!selectedOS) {
      toast.error("Please select an operating system first");
      return;
    }
    setIsRunning(true);
    toast("Starting emulator...");
  };

  const handlePause = () => {
    setIsRunning(false);
    toast("Emulator paused");
  };

  const handleReset = () => {
    if (emulator) {
      // In a real implementation, you would call emulator.restart()
      toast("Emulator reset");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    if (emulator) {
      // In a real implementation, you would call emulator.stop()
      toast("Emulator stopped");
    }
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
            Run operating systems directly in your browser using the power of v86 emulation
          </p>
        </div>

        {/* OS Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Choose Your Operating System
          </h2>
          <OSSelector onOSSelect={handleOSSelect} selectedOS={selectedOS} />
        </div>

        {/* Emulator Controls */}
        <div className="mb-6">
          <EmulatorControls
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onStop={handleStop}
            disabled={!selectedOS}
          />
        </div>

        {/* Emulator Display */}
        <EmulatorDisplay
          selectedOS={selectedOS}
          isRunning={isRunning}
          onEmulatorReady={setEmulator}
        />
      </div>
    </div>
  );
};

export default Index;
