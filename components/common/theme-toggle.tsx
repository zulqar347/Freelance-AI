"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <Button
      aria-label="Toggle theme"
      className="h-10 w-10 px-0"
      variant="secondary"
      onClick={() => setLight((value) => !value)}
    >
      {light ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
}
