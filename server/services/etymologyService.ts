import OpenAI from "openai";
import { EtymologyResponse } from "@shared/schema";

// Using X.ai (Grok) API which follows similar patterns to OpenAI
const openai = new OpenAI({ 
  baseURL: "https://api.x.ai/v1",
  apiKey: process.env.XAI_API_KEY || "xai-SHmM413r6kZPZEUeFSSrIDZ7aXoFY1pzrIQ7ZyrlgjS2Q8YWWqm1sAdhbLlxPjfW0Ps7yp4t5w8EGPER" 
});

interface EtymologyData {
  word: string;
  origin: string;
  meaning: string;
}

export class EtymologyServiceError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.status = status;
    this.name = "EtymologyServiceError";
  }
}

// Function to fetch etymology data for a word
async function fetchEtymologyData(word: string): Promise<EtymologyData> {
  try {
    // This would typically be an actual API call to an etymology service
    // For now, we'll use OpenAI to generate this information
    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: "You are an etymologist with expertise in historical linguistics who makes word histories accessible and accurate. Provide well-researched etymology information for the given word while including relevant cultural or historical context that makes the information engaging."
        },
        {
          role: "user",
          content: `Provide accurate and interesting etymology information for the word "${word}" in JSON format with the following fields: 
          - word: the queried term
          - origin: the source language with relevant historical context (including time period if known)
          - meaning: explanation of original meaning and semantic development, including noteworthy cultural or historical factors where relevant
          
          Balance scholarly accuracy with accessibility. Include precise linguistic details but also interesting contextual information when available.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content || "";
    const result = JSON.parse(content);
    
    if (!result.word || !result.origin || !result.meaning) {
      throw new EtymologyServiceError("Could not find etymology information for this word.", 404);
    }

    return {
      word: result.word,
      origin: result.origin,
      meaning: result.meaning
    };
  } catch (error: any) {
    console.error("Etymology data fetch error:", error);
    if (error instanceof EtymologyServiceError) {
      throw error;
    }
    throw new EtymologyServiceError(
      error.message || "Failed to fetch etymology data",
      error.status || 500
    );
  }
}

// Function to generate a narrative story from etymology data
async function createEtymologyStory(etymologyData: EtymologyData): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "grok-2-1212",
      messages: [
        {
          role: "system",
          content: "You are a professional etymologist with a talent for making word histories accessible and engaging. Present etymology information in a professional manner that balances academic accuracy with readability and interest for a general educated audience."
        },
        {
          role: "user",
          content: `Compose an informative yet engaging 1-2 paragraph explanation of the etymology of the word "${etymologyData.word}". 
          Include these facts in your analysis: 
          - Origin: ${etymologyData.origin}
          - Meaning: ${etymologyData.meaning}
          
          Present the information in a professional but accessible manner. Use clear, precise language but also include interesting historical or cultural context where relevant. Balance scholarly accuracy with readability. Format your response with HTML paragraph tags.`
        }
      ]
    });

    let story = response.choices[0].message.content || "";
    
    // Ensure the story is formatted with HTML paragraph tags
    if (!story.includes("<p>")) {
      const paragraphs = story.split("\n\n").filter(p => p.trim().length > 0);
      story = paragraphs.map(p => `<p>${p}</p>`).join("");
    }
    
    return story;
  } catch (error: any) {
    console.error("Story generation error:", error);
    throw new EtymologyServiceError(
      error.message || "Failed to generate etymology story",
      error.status || 500
    );
  }
}

// Main function to generate etymology story for a word
export async function generateEtymologyStory(word: string): Promise<EtymologyResponse> {
  try {
    // Fetch etymology data
    const etymologyData = await fetchEtymologyData(word);
    
    // Generate narrative story
    const story = await createEtymologyStory(etymologyData);
    
    return {
      word: etymologyData.word,
      etymology: story
    };
  } catch (error: any) {
    throw error;
  }
}
