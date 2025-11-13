"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupText,
} from "@/components/ui/input-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CounterButton } from "@/components/counter-button";
import { Button } from "@/components/ui/button";

export function InputForm() {
  const [isPositive, setIsPositive] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    // Add your submit logic here
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent">
        Yelpy
        <span className="text-xl align-super text-gray-400">™</span>
      </h1>
      <p className="text-center text-sm text-gray-500 -mt-6 mb-4 italic">
        100% Real* Reviews, Generated Instantly
      </p>

      {/* Large Textarea Input */}
      <InputGroup>
        <InputGroupTextarea
          placeholder="Paste the restaurant's menu here..."
          className="min-h-[150px]"
        />
        <InputGroupAddon align="block-end"></InputGroupAddon>
      </InputGroup>

      {/* Normal Input 1 */}
      <InputGroup>
        <InputGroupInput placeholder="Enter restaurant name" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Name</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      {/* Normal Input 2 */}
      <InputGroup>
        <InputGroupInput type="email" placeholder="Enter restaurant cuisine" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Cuisine</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      {/* Review Type Switch */}
      <div className="flex items-center space-x-3">
        <Switch
          id="review-type"
          checked={isPositive}
          onCheckedChange={setIsPositive}
          className={`cursor-pointer ${
            isPositive
              ? "data-[state=checked]:bg-green-500"
              : "data-[state=unchecked]:bg-red-500"
          }`}
        />
        <Label
          htmlFor="review-type"
          className="text-sm font-medium cursor-pointer"
        >
          {isPositive ? "Positive Review" : "Negative Review"}
        </Label>
      </div>

      {/* Review Count Button */}
      <CounterButton />

      {/* Submit Button */}
      <Button
        className="w-full cursor-pointer"
        onClick={handleSubmit}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            Processing
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : (
          "Submit"
        )}
      </Button>
    </div>
  );
}
