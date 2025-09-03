import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, HardDrive, Cpu } from "lucide-react";

interface OSOption {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  diskUrl?: string;
  icon: React.ReactNode;
}

const osOptions: OSOption[] = [
  {
    id: "linux-mint",
    name: "Linux Mint",
    description: "User-friendly Linux distribution",
    icon: <Monitor className="w-8 h-8" />,
  },
  {
    id: "windows-10",
    name: "Windows 10",
    description: "Microsoft Windows operating system",
    icon: <HardDrive className="w-8 h-8" />,
  },
  {
    id: "ubuntu",
    name: "Ubuntu",
    description: "Popular Linux distribution",
    icon: <Cpu className="w-8 h-8" />,
  },
];

interface OSSelectorProps {
  onOSSelect: (os: OSOption) => void;
  selectedOS?: string;
}

export const OSSelector = ({ onOSSelect, selectedOS }: OSSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {osOptions.map((os) => (
        <Card
          key={os.id}
          className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-glow border-2 ${
            selectedOS === os.id
              ? "border-primary shadow-electric bg-gradient-card"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onOSSelect(os)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-full bg-gradient-primary ${
              selectedOS === os.id ? "shadow-glow" : ""
            }`}>
              {os.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {os.name}
              </h3>
              <p className="text-muted-foreground mt-2">
                {os.description}
              </p>
            </div>
            <Button
              variant={selectedOS === os.id ? "default" : "outline"}
              className="w-full"
            >
              {selectedOS === os.id ? "Selected" : "Select"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};