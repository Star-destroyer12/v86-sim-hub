import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Power, Settings } from "lucide-react";

interface EmulatorControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export const EmulatorControls = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onStop,
  disabled = false
}: EmulatorControlsProps) => {
  return (
    <Card className="p-4 bg-gradient-card border-2 border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className={`w-3 h-3 rounded-full ${
              isRunning ? 'bg-terminal-foreground shadow-glow' : 'bg-muted-foreground'
            }`} />
            <span className="text-sm text-muted-foreground">
              {isRunning ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={isRunning ? onPause : onStart}
            disabled={disabled}
            className="hover:shadow-glow"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={disabled}
            className="hover:shadow-glow"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={onStop}
            disabled={disabled}
            className="hover:shadow-glow"
          >
            <Power className="w-4 h-4 mr-2" />
            Stop
          </Button>
        </div>
      </div>
    </Card>
  );
};