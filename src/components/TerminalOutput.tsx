import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TerminalOutput = ({ isRunning }) => {
  const [lines, setLines] = useState([]);
  const scrollRef = useRef(null);

  const addLine = (level, message) => {
    const newLine = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
    };
    setLines(prev => [...prev, newLine]);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (isRunning) {
      setLines([]);
      const bootMessages = [
        "=== Starting Tiny Core Linux Emulation ===",
        "GRUB loading...",
        "Loading Linux kernel...",
        "Initializing hardware...",
        "Starting kernel modules",
        "Mounting file systems",
        "Starting system services",
        "Loading desktop environment",
        "System ready - Welcome to Tiny Core Linux!",
        "tc@box:~$ "
      ];
      // Show boot messages one at a time
      bootMessages.forEach((message, index) => {
        setTimeout(() => {
          addLine(index === bootMessages.length - 1 ? 'success' : 'info', message);
        }, index * 800);
      });
    }
    // No interval, so no looping!
  }, [isRunning]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'success': return "text-green-500";
      case 'info': return "text-blue-500";
      case 'system': return "text-yellow-500";
      case 'error': return "text-red-500";
      default: return "";
    }
  };

  return (
    <Card>
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
};import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TerminalOutput = ({ isRunning }) => {
  const [lines, setLines] = useState([]);
  const scrollRef = useRef(null);

  const addLine = (level, message) => {
    const newLine = {
      timestamp: new Date().toLocaleTimeString(),
      level,
      message,
    };
    setLines(prev => [...prev, newLine]);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    if (isRunning) {
      setLines([]);
      const bootMessages = [
        "=== Starting Tiny Core Linux Emulation ===",
        "GRUB loading...",
        "Loading Linux kernel...",
        "Initializing hardware...",
        "Starting kernel modules",
        "Mounting file systems",
        "Starting system services",
        "Loading desktop environment",
        "System ready - Welcome to Tiny Core Linux!",
        "tc@box:~$ "
      ];
      // Show boot messages one at a time
      bootMessages.forEach((message, index) => {
        setTimeout(() => {
          addLine(index === bootMessages.length - 1 ? 'success' : 'info', message);
        }, index * 800);
      });
    }
    // No interval, so no looping!
  }, [isRunning]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'success': return "text-green-500";
      case 'info': return "text-blue-500";
      case 'system': return "text-yellow-500";
      case 'error': return "text-red-500";
      default: return "";
    }
  };

  return (
    <Card>
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
