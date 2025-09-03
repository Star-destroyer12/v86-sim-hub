import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalLine {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success' | 'system';
  message: string;
}

interface TerminalOutputProps {
  isRunning: boolean;
  selectedOS?: string;
  onLog?: (line: TerminalLine) => void;
}

export const TerminalOutput = ({ isRunning, selectedOS, onLog }: TerminalOutputProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const addLine = (level: TerminalLine['level'], message: string) => {
    const newLine: TerminalLine = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message
    };
    
    setLines(prev => [...prev, newLine]);
    onLog?.(newLine);
    
    // Auto-scroll to bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const getLinuxBootSequence = () => [
    "GRUB loading...",
    "Loading Linux kernel...",
    "Initializing hardware...",
    "Starting kernel modules",
    "Mounting file systems",
    "Starting system services",
    "NetworkManager starting",
    "Loading desktop environment",
    "System ready - Welcome to " + selectedOS + "!",
    "user@localhost:~$ "
  ];

  const getRandomSystemMessages = () => [
    "CPU temperature: 45°C",
    "Memory usage: 2.1GB / 8GB",
    "Disk I/O: 15MB/s read, 8MB/s write",
    "Network: eth0 connected (192.168.1.100)",
    "Process started: systemd (PID: 1)",
    "Audio device initialized: HDA Intel",
    "USB device connected: Generic Mouse",
    "Firewall: 3 rules loaded",
    "Cron daemon started",
    "SSH server listening on port 22"
  ];

  useEffect(() => {
    if (isRunning && selectedOS) {
      setLines([]);
      addLine('system', `=== Starting ${selectedOS} Emulation ===`);
      
      // Boot sequence
      const bootMessages = getLinuxBootSequence();
      bootMessages.forEach((message, index) => {
        setTimeout(() => {
          addLine(index === bootMessages.length - 1 ? 'success' : 'info', message);
        }, index * 800);
      });

      // Random system activity
      intervalRef.current = setInterval(() => {
        const messages = getRandomSystemMessages();
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        addLine('system', randomMessage);
        
        // Occasionally add user commands
        if (Math.random() > 0.7) {
          const commands = ['ls -la', 'ps aux | grep systemd', 'df -h', 'free -m', 'uname -a'];
          const cmd = commands[Math.floor(Math.random() * commands.length)];
          setTimeout(() => {
            addLine('info', `user@localhost:~$ ${cmd}`);
          }, 1000);
        }
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, selectedOS]);

  const getLevelColor = (level: TerminalLine['level']) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-yellow-400';
      case 'success': return 'text-terminal-foreground';
      case 'system': return 'text-electric';
      default: return 'text-gray-300';
    }
  };

  return (
    <Card className="h-80 bg-terminal border-2 border-border">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground flex items-center">
          <div className="w-2 h-2 bg-terminal-foreground rounded-full mr-2 animate-pulse" />
          System Console
        </h3>
      </div>
      <ScrollArea className="h-64 p-4" ref={scrollRef}>
        <div className="font-mono text-sm space-y-1">
          {lines.length === 0 && (
            <div className="text-muted-foreground">
              Terminal ready - Start emulation to see output...
            </div>
          )}
          {lines.map((line, index) => (
            <div key={index} className="flex">
              <span className="text-muted-foreground mr-2 text-xs">
                [{line.timestamp}]
              </span>
              <span className={getLevelColor(line.level)}>
                {line.message}
              </span>
            </div>
          ))}
          {isRunning && (
            <div className="flex items-center mt-2">
              <span className="text-terminal-foreground animate-pulse">▊</span>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};