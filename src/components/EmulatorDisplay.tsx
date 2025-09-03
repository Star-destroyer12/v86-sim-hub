import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface EmulatorDisplayProps {
  selectedOS?: string;
  isRunning: boolean;
  onEmulatorReady?: (emulator: any) => void;
  onLog?: (component: string, level: string, message: string) => void;
}

export const EmulatorDisplay = ({ selectedOS, isRunning, onEmulatorReady, onLog }: EmulatorDisplayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const emulatorRef = useRef<any>(null);

  const addDebugLog = (level: string, message: string) => {
    if (onLog) {
      onLog('EmulatorDisplay', level, message);
    }
  };

  useEffect(() => {
    if (selectedOS && isRunning && containerRef.current) {
      setIsLoading(true);
      addDebugLog('info', `Starting emulation for ${selectedOS}`);
      
      // Clear previous content
      containerRef.current.innerHTML = '';
      
      // Create emulator display
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 600;
      canvas.style.border = '1px solid hsl(var(--border))';
      canvas.style.backgroundColor = 'hsl(var(--terminal))';
      canvas.style.borderRadius = '0.5rem';
      canvas.style.display = 'block';
      canvas.style.margin = '0 auto';
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        addDebugLog('info', 'Canvas context created successfully');
        
        // Draw boot screen
        ctx.fillStyle = 'hsl(120, 100%, 75%)';
        ctx.font = '14px monospace';
        
        const bootMessages = [
          `v86 Emulator - ${selectedOS}`,
          '',
          'BIOS Version 1.0.0',
          'Memory Test: 512MB OK',
          'CPU: Intel Pentium III 1000MHz',
          '',
          'Booting from Hard Disk...',
          '',
          'Loading GRUB...',
          'Loading kernel image...',
          'Loading initial ramdisk...',
          '',
          '[ OK ] Started Update UTMP about System Runlevel Changes',
          '[ OK ] Reached target Multi-User System',
          '[ OK ] Reached target Graphical Interface',
          '',
          `Welcome to ${selectedOS}!`,
          '',
          'Login: user',
          'Password: ********',
          '',
          'user@localhost:~$ █'
        ];

        // Simulate boot sequence
        let messageIndex = 0;
        const drawMessage = () => {
          if (messageIndex < bootMessages.length) {
            ctx.fillText(bootMessages[messageIndex], 20, 30 + (messageIndex * 20));
            messageIndex++;
            setTimeout(drawMessage, 300);
          } else {
            addDebugLog('success', 'Boot sequence completed');
            setIsLoading(false);
            
            // Start blinking cursor
            let cursorVisible = true;
            setInterval(() => {
              const cursorY = 30 + ((bootMessages.length - 1) * 20);
              const cursorX = 20 + (ctx.measureText('user@localhost:~$ ').width);
              
              if (cursorVisible) {
                ctx.fillStyle = 'hsl(var(--terminal))';
                ctx.fillRect(cursorX, cursorY - 15, 10, 18);
              } else {
                ctx.fillStyle = 'hsl(120, 100%, 75%)';
                ctx.fillRect(cursorX, cursorY - 15, 10, 18);
                ctx.fillText('█', cursorX, cursorY);
              }
              cursorVisible = !cursorVisible;
            }, 500);
          }
        };
        
        drawMessage();
      } else {
        addDebugLog('error', 'Failed to get canvas context');
      }
      
      containerRef.current.appendChild(canvas);
      
      if (onEmulatorReady) {
        onEmulatorReady(emulatorRef.current);
      }
      
      addDebugLog('info', 'Emulator display initialized');
    } else if (!isRunning) {
      addDebugLog('info', 'Emulator stopped');
    }
  }, [selectedOS, isRunning, onEmulatorReady, onLog]);

  return (
    <Card className="p-6 bg-gradient-card border-2 border-border">
      <div className="relative min-h-[400px]">
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
              <p className="text-muted-foreground text-sm mt-2">
                Initializing v86 emulator...
              </p>
            </div>
          </div>
        )}
        
        <div ref={containerRef} className="w-full" />
      </div>
    </Card>
  );
};