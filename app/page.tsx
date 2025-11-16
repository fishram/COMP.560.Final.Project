"use client";

import { useState } from "react";
import { InputForm } from "@/components/input-form";
import { Separator } from "@/components/ui/separator";
import type { Review } from "@/lib/types";

export default function Page() {
  // states for reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState(3);

  // className constants
  const sectionClassName = "w-full max-w-xl space-y-6";
  const reviewCardClassName = "p-6 border rounded-lg bg-muted/50 min-h-[150px]";

  return (
    <div className="flex h-screen min-w-screen justify-center items-center gap-10 p-10">
      {/* Left section - Input Form */}
      <div className={sectionClassName}>
        <InputForm
          onReviewsGenerated={setReviews}
          onReviewCountChange={setReviewCount}
        />
      </div>

      {/* Right section - Review text boxes */}

      <div className={`${sectionClassName} max-h-full overflow-y-auto pr-2`}>
        {reviews.length === 0
          ? Array.from({ length: reviewCount }).map((_, index) => (
              <div key={index} className={reviewCardClassName}>
                <h3 className="font-semibold mb-2">Review {index + 1}</h3>
                <p className="text-sm text-muted-foreground">
                  Generated review will appear here...
                </p>
              </div>
            ))
          : reviews.map((review, index) => (
              <div key={index} className={reviewCardClassName}>
                <h3 className="font-semibold mb-2 text-xl">
                  {review.firstName} {review.lastName}
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {review.text}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}
