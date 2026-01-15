import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  getLayoutRecommendationPrompt,
  LayoutRecommendationResponse,
  StandardRecommendation,
  CustomRecommendation
} from "@/app/api/ai/layout-recommendation/gemini/prompts";

const API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!API_KEY) {
  console.warn("Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

// Validation functions
function validateStandardRecommendation(rec: any): rec is StandardRecommendation {
  return (
    typeof rec.rank === 'number' &&
    typeof rec.name === 'string' &&
    typeof rec.description === 'string' &&
    rec.isCustom === false &&
    Array.isArray(rec.sections) &&
    rec.sections.length >= 1 &&
    rec.navbar?.animation &&
    rec.footer?.animation &&
    rec.background?.type
  );
}

function validateCustomRecommendation(rec: any): rec is CustomRecommendation {
  return (
    typeof rec.rank === 'number' &&
    typeof rec.name === 'string' &&
    typeof rec.description === 'string' &&
    rec.isCustom === true &&
    typeof rec.customLayoutId === 'string' &&
    Array.isArray(rec.sections) &&
    rec.sections.length >= 1 &&
    rec.navbar?.animation &&
    rec.footer?.animation &&
    rec.background?.type &&
    typeof rec.designConcept === 'string' &&
    typeof rec.targetAudience === 'string' &&
    Array.isArray(rec.uniqueFeatures)
  );
}

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "userInput is required" },
        { status: 400 }
      );
    }

    if (userInput.length > 500) {
      return NextResponse.json(
        { error: "userInput is too long (max 500 characters)" },
        { status: 400 }
      );
    }

    // Generate prompt
    const prompt = getLayoutRecommendationPrompt(userInput);

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse JSON response
    let parsedResponse: LayoutRecommendationResponse;
    try {
      // Clean up response - remove markdown code blocks if present
      let cleanedResponse = responseText.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();

      parsedResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    // Validate recommendations
    const { recommendations, customRecommendations } = parsedResponse;

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      return NextResponse.json(
        { error: "Invalid recommendations format - missing standard recommendations" },
        { status: 500 }
      );
    }

    if (!Array.isArray(customRecommendations) || customRecommendations.length === 0) {
      return NextResponse.json(
        { error: "Invalid recommendations format - missing custom recommendations" },
        { status: 500 }
      );
    }

    // Validate each standard recommendation
    const validStandardRecs = recommendations.filter(validateStandardRecommendation);
    if (validStandardRecs.length < 5) {
      console.warn(`Only ${validStandardRecs.length} valid standard recommendations`);
    }

    // Validate each custom recommendation
    const validCustomRecs = customRecommendations.filter(validateCustomRecommendation);
    if (validCustomRecs.length < 3) {
      console.warn(`Only ${validCustomRecs.length} valid custom recommendations`);
    }

    return NextResponse.json({
      recommendations: validStandardRecs,
      customRecommendations: validCustomRecs,
      userInput,
      meta: {
        standardCount: validStandardRecs.length,
        customCount: validCustomRecs.length,
        totalCount: validStandardRecs.length + validCustomRecs.length
      }
    });
  } catch (error: any) {
    console.error("Layout recommendation error:", error);

    // Check for rate limit error (429)
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('Too Many Requests')) {
      return NextResponse.json(
        { error: "RATE_LIMIT_EXCEEDED", message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Check for quota exceeded
    if (error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      return NextResponse.json(
        { error: "QUOTA_EXCEEDED", message: "API quota exceeded. Please try again tomorrow." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
