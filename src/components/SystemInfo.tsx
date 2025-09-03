import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Wifi, Thermometer } from "lucide-react";

interface SystemStats {
  cpu: number;
  memory: number;
  disk: number;
  temperature: number;
  networkSpeed: string;
  processes: number;
  uptime: string;
}

interface SystemInfoProps {
  isRunning: boolean;
  selectedOS?: string;
}

export const SystemInfo = ({ isRunning, selectedOS }: SystemInfoProps) => {
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    memory: 0,
    disk: 0,
    temperature: 35,
    networkSpeed: "0 KB/s",
    processes: 0,
    uptime: "00:00:00"
  });

  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!isRunning) {
      setStats({
        cpu: 0,
        memory: 0,
        disk: 0,
        temperature: 35,
        networkSpeed: "0 KB/s",
        processes: 0,
        uptime: "00:00:00"
      });
      return;
    }

    const interval = setInterval(() => {
      setStats(prev => {
        // Calculate uptime
        const elapsed = Date.now() - startTime;
        const hours = Math.floor(elapsed / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        const uptime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        return {
          cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(20, Math.min(80, prev.memory + (Math.random() - 0.5) * 5)),
          disk: Math.max(10, Math.min(60, prev.disk + (Math.random() - 0.5) * 3)),
          temperature: Math.max(35, Math.min(65, prev.temperature + (Math.random() - 0.5) * 2)),
          networkSpeed: `${Math.floor(Math.random() * 1000)} KB/s`,
          processes: Math.floor(120 + Math.random() * 50),
          uptime
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const getStatusColor = (value: number, thresholds: { warn: number; danger: number }) => {
    if (value >= thresholds.danger) return "text-red-400";
    if (value >= thresholds.warn) return "text-yellow-400";
    return "text-terminal-foreground";
  };

  if (!selectedOS) {
    return (
      <Card className="p-6 bg-gradient-card border-2 border-border">
        <div className="text-center text-muted-foreground">
          <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select an OS to view system information</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-card border-2 border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Monitor</h3>
        <Badge variant={isRunning ? "default" : "secondary"} className="bg-primary">
          {selectedOS}
        </Badge>
      </div>

      <div className="space-y-4">
        {/* CPU Usage */}
        <div className="flex items-center space-x-4">
          <Cpu className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>CPU Usage</span>
              <span className={getStatusColor(stats.cpu, { warn: 70, danger: 85 })}>
                {stats.cpu.toFixed(1)}%
              </span>
            </div>
            <Progress value={stats.cpu} className="h-2" />
          </div>
        </div>

        {/* Memory Usage */}
        <div className="flex items-center space-x-4">
          <HardDrive className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Memory Usage</span>
              <span className={getStatusColor(stats.memory, { warn: 60, danger: 75 })}>
                {stats.memory.toFixed(1)}%
              </span>
            </div>
            <Progress value={stats.memory} className="h-2" />
          </div>
        </div>

        {/* Disk Usage */}
        <div className="flex items-center space-x-4">
          <HardDrive className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>Disk Usage</span>
              <span className={getStatusColor(stats.disk, { warn: 50, danger: 70 })}>
                {stats.disk.toFixed(1)}%
              </span>
            </div>
            <Progress value={stats.disk} className="h-2" />
          </div>
        </div>

        {/* Temperature */}
        <div className="flex items-center space-x-4">
          <Thermometer className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span>CPU Temperature</span>
              <span className={getStatusColor(stats.temperature, { warn: 55, danger: 65 })}>
                {stats.temperature.toFixed(1)}°C
              </span>
            </div>
            <Progress value={(stats.temperature - 30) * 2.86} className="h-2" />
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Network</div>
            <div className="text-terminal-foreground font-mono text-sm">
              <Wifi className="w-4 h-4 inline mr-1" />
              {stats.networkSpeed}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Processes</div>
            <div className="text-terminal-foreground font-mono text-sm">
              {stats.processes}
            </div>
          </div>
          <div className="text-center col-span-2">
            <div className="text-sm text-muted-foreground">Uptime</div>
            <div className="text-terminal-foreground font-mono text-sm">
              {stats.uptime}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};