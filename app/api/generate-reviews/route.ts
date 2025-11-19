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

  const prompt = `
    Using this menu:

    ${menuText}

    Write ${count} distinct, ${tone}, natural-sounding customer reviews
    for this restaurant:

    Name: ${restaurantName}
    Cuisine: ${cuisine}

    Return ONLY valid JSON in this exact shape (no extra keys, no explanations). Make sure for example if there are two reviews!:
    {
    "reviews": [
        "review 1 text",
        "review 2 text"
    ]
    }

    CRITICAL: Make these sound like REAL people wrote them, not a robot. Follow these rules:

    LENGTH VARIATION (MOST IMPORTANT):
    - 30% of reviews: VERY SHORT - Just 1-5 words or a single brief sentence ("so good!!", "meh", "Never again lol", "best burger ever ngl")
    - 30% of reviews: SHORT - 1-2 sentences, quick thoughts
    - 30% of reviews: MEDIUM - 3-4 sentences with some detail
    - 10% of reviews: LONG - 5+ sentences, storytelling or detailed breakdown of experience

    WRITING STYLE:
    - Vary sentence structure - some short fragments, some run-ons connected with "and"
    - Include personal context occasionally (e.g., "came here with my bf", "stopped by after work", "my kid loved it")
    - Mix in minor typos or grammar quirks (missing commas, lowercase "i", extra spaces, but keep readable)
    - Use informal punctuation (ellipses..., multiple exclamation marks!!, emoji-like expressions)
    - Don't be overly descriptive or poetic - be direct and straightforward
    - Vary the level of detail - some reviews focus on one item, others mention several
    - Use contractions naturally (can't, won't, it's, we're)
    - 50% of reviews: mention a menu item
    - 50% of reviews: mention other aspects besides the menu items
    - Avoid corporate/marketing language like "highly recommend", "great spot for", "tied everything together"
    - Sound like you're texting a friend, not writing a formal review
    `;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
    text: {
      format: {
        type: "json_object",
      },
    },
  });

  const text = response.output_text ?? "";

  let reviewTexts: string[] = [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed.reviews)) {
      reviewTexts = parsed.reviews;
    } else {
      reviewTexts = [text];
    }
  } catch {
    // fallback if JSON parse fails
    reviewTexts = [text];
  }

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
