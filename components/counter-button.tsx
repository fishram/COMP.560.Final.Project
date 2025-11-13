"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export function CounterButton() {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Review Count</h3>
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          className="h-16 text-2xl font-semibold min-w-16"
        >
          {count}
        </Button>
        <div className="flex flex-col gap-1">
          <Button
            onClick={handleIncrement}
            disabled={count >= 10}
            variant="outline"
            size="icon-sm"
            className="h-7 w-7 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDecrement}
            disabled={count <= 1}
            variant="outline"
            size="icon-sm"
            className="h-7 w-7 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
