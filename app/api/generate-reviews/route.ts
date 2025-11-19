import OpenAI from "openai";
import { NextResponse } from "next/server";
import { getRandomName } from "@/lib/names";
import type { Review } from "@/lib/types";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { menuText, restaurantName, cuisine, isPositive, reviewCount } =
    await req.json();

  const tone = isPositive ? "positive" : "negative";
  // clamp count to reviewCount
  const count = Math.min(Math.max(reviewCount ?? 1, 1), 10);

  // Determine length style for each review based on distribution
  const getLengthStyle = (index: number, total: number): string => {
    const position = index / total;
    if (position < 0.3)
      return "VERY SHORT - Just 1-5 words or a single brief sentence (e.g., 'so good!!', 'meh', 'Never again lol')";
    if (position < 0.6) return "SHORT - 1-2 sentences, quick thoughts";
    if (position < 0.9) return "MEDIUM - 3-4 sentences with some detail";
    return "LONG - 5+ sentences, storytelling or detailed breakdown";
  };

  // Generate reviews in parallel (1 call per review)
  const reviewPromises = Array.from({ length: count }).map(async (_, index) => {
    const lengthStyle = getLengthStyle(index, count);

    const prompt = `
      Using this menu:

      ${menuText}

      Write exactly 1 ${tone}, natural-sounding customer review for this restaurant:

      Name: ${restaurantName}
      Cuisine: ${cuisine}

      LENGTH: ${lengthStyle}

      Return ONLY the review text itself - no quotes, no JSON, no labels.

      CRITICAL: Make this sound like a REAL person wrote it, not a robot. Follow these rules:

      WRITING STYLE:
      - Vary sentence structure - some short fragments, some run-ons connected with "and"
      - Mix in minor typos or grammar quirks (missing commas, lowercase "i", extra spaces, but keep readable)
      - Use informal punctuation (ellipses..., multiple exclamation marks!!, emoji-like expressions)
      - Don't be overly descriptive or poetic - be direct and straightforward
      - Use contractions naturally (can't, won't, it's, we're)
      - 50% chance: mention a specific menu item
      - 50% chance: mention other aspects (service, ambiance, etc.)
      - Avoid corporate/marketing language like "highly recommend", "great spot for", "tied everything together"
      - Sound like you're texting a friend, not writing a formal review
    `;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
    });

    return response.output_text?.trim() ?? "";
  });

  const reviewTexts = await Promise.all(reviewPromises);

  // Assign random names to each review
  const reviews: Review[] = reviewTexts.map((text) => {
    const { firstName, lastName } = getRandomName();
    return {
      firstName,
      lastName,
      text,
    };
  });

  return NextResponse.json({ reviews });
}
