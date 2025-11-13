import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { menuText, restaurantName, cuisine, isPositive } = await req.json();

  const tone = isPositive ? "positive" : "negative";

  const prompt = `
Using this menu:

${menuText}

Write a ${tone}, natural-sounding customer review for a restaurant.

Restaurant name: ${restaurantName}
Cuisine: ${cuisine}
`;

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  const text = response.output_text ?? "";

  return NextResponse.json({ review: text });
}
