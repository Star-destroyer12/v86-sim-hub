import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TerminalOutput } from "@/components/TerminalOutput";

const TINY_CORE_ISO_URL = "https://tinycorelinux.net/14.x/x86/release/Core-current.iso";
const V86_WASM_URL = "https://copy.sh/v86/build/v86.wasm";
const BIOS_URL = "https://copy.sh/v86/bios/seabios.bin";
const VGA_BIOS_URL = "https://copy.sh/v86/bios/vgabios.bin";

export default function App() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(true);
    // Start v86 emulator
    const emulatorDiv = document.getElementById("emulator");
    if (emulatorDiv && window.V86Starter) {
      // @ts-ignore
      const emulator = new window.V86Starter({
        wasm_path: V86_WASM_URL,
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        bios: { url: BIOS_URL },
        vga_bios: { url: VGA_BIOS_URL },
        cdrom: { url: TINY_CORE_ISO_URL },
        autostart: true,
        screen_container: emulatorDiv,
      });
      // Optionally store emulator in state if you want to stop/restart
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mt-8 mb-4">Tiny Core Linux Emulator</h1>
      <Card className="p-4">
        <Button
          onClick={handleStart}
          disabled={isRunning}
          className="mb-4"
        >
          Start Tiny Core Linux
        </Button>
        <div
          id="emulator"
          style={{ width: "800px", height: "600px", background: "#000", margin: "auto" }}
        />
      </Card>
      <TerminalOutput isRunning={isRunning} />
    </main>
  );
}
