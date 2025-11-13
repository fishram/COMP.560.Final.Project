"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

type CounterButtonProps = {
  value: number;
  onChange: (next: number) => void;
};

export function CounterButton({value, onChange}: CounterButtonProps) {

  const handleIncrement = () => {
    if (value < 10) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > 1) {
      onChange(value - 1);
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
          {value}
        </Button>
        <div className="flex flex-col gap-1">
          <Button
            onClick={handleIncrement}
            disabled={value >= 10}
            variant="outline"
            size="icon-sm"
            className="h-7 w-7 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDecrement}
            disabled={value <= 1}
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
