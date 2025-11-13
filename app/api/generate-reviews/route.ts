import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { menuText, restaurantName, cuisine, isPositive, reviewCount } = await req.json();

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

    Return ONLY valid JSON in this exact shape (no extra keys, no explanations). Make sure!:
    {
    "reviews": [
        "review 1 text",
        "review 2 text"
    ]
    }
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

  let reviews: string[] = [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed.reviews)) {
      reviews = parsed.reviews;
    } else {
      reviews = [text];
    }
  } catch {
    // fallback if JSON parse fails
    reviews = [text];
  }

  return NextResponse.json({ reviews });
}
