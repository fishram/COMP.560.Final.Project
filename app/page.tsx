"use client"

import { useState } from "react";
import { InputForm } from "@/components/input-form";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  // states for reviews
  const [reviews, setReviews] = useState<string[]>([]);

  return (

    <div className="flex min-h-screen mx-86">
      {/* Left section - Input Form */}
      <div className="flex flex-1 items-center ">
        <InputForm onReviewsGenerated={setReviews}/>
      </div>

      {/* Vertical Separator */}
      <Separator orientation="vertical" className="mx-4" />

      {/* Right section - Review text boxes */}
      {/* The reviews look like shit */}

      <div className="flex flex-1 items-center p-8">
        <div className="w-full max-w-2xl space-y-6">
          {reviews.length === 0 ? (
            <div className="p-6 border rounded-lg bg-muted/50 min-h-[150px]">
              <h3 className="font-semibold mb-2">Review 1</h3>
              <p className="text-sm text-muted-foreground">
                Generated review will appear here...
              </p>
            </div>
          ) : (
            reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg bg-muted/50 min-h-[150px]"
              >
                <h3 className="font-semibold mb-2">Review {index + 1}</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {review}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
