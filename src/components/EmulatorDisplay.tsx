import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EmulatorDisplayProps {
  selectedOS?: string;
  isRunning: boolean;
  onEmulatorReady?: (emulator: any) => void;
}

export const EmulatorDisplay = ({ selectedOS, isRunning, onEmulatorReady }: EmulatorDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const emulatorRef = useRef<any>(null);

  useEffect(() => {
    if (selectedOS && isRunning && containerRef.current) {
      setIsLoading(true);
      
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      // Note: In a real implementation, you would initialize v86 here
      // For now, we'll show a demo screen
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      canvas.style.border = '1px solid hsl(var(--border))';
      canvas.style.backgroundColor = 'hsl(var(--terminal))';
      canvas.style.borderRadius = '0.5rem';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw a terminal-like interface
        ctx.fillStyle = 'hsl(120, 100%, 75%)';
        ctx.font = '16px monospace';
        ctx.fillText(`Loading ${selectedOS}...`, 20, 40);
        ctx.fillText('v86 Emulator Ready', 20, 70);
        ctx.fillText('> Booting operating system...', 20, 100);
        ctx.fillText('> Initializing hardware...', 20, 130);
        ctx.fillText('> Loading kernel modules...', 20, 160);
        
        // Simulate progress
        setTimeout(() => {
          ctx.fillText('> System ready!', 20, 190);
          setIsLoading(false);
        }, 2000);
      }
      
      containerRef.current.appendChild(canvas);
      
      if (onEmulatorReady) {
        onEmulatorReady(emulatorRef.current);
      }
    }
  }, [selectedOS, isRunning, onEmulatorReady]);

  return (
    <Card className="p-6 bg-gradient-card border-2 border-border">
      <div className="relative">
        {!selectedOS && (
          <div className="flex items-center justify-center h-96 text-center">
            <div>
              <div className="text-6xl mb-4">🖥️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Select an Operating System
              </h3>
              <p className="text-muted-foreground">
                Choose an OS from the options above to start emulation
              </p>
            </div>
          </div>
        )}
        
        {selectedOS && !isRunning && (
          <div className="flex items-center justify-center h-96 text-center">
            <div>
              <div className="text-6xl mb-4">⏸️</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Emulator Ready
              </h3>
              <p className="text-muted-foreground">
                Click Start to begin running {selectedOS}
              </p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 bg-terminal/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-foreground">Loading {selectedOS}...</p>
            </div>
          </div>
        )}
        
        <div ref={containerRef} className="w-full" />
      </div>
    </Card>
  );
};