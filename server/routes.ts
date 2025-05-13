import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateEtymologyStory } from "./services/etymologyService";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to fetch etymology and generate a story
  app.post("/api/etymology", async (req, res) => {
    try {
      const { word } = req.body;
      
      if (!word || typeof word !== "string" || word.trim().length < 2) {
        return res.status(400).json({ 
          message: "Please provide a valid word with at least 2 characters" 
        });
      }

      // Generate etymology story
      const etymologyStory = await generateEtymologyStory(word.trim());
      
      // Log the request
      const timestamp = new Date().toISOString();
      await storage.createEtymologyRequest({
        word: word.trim(),
        story: etymologyStory.etymology,
        timestamp
      });
      
      return res.status(200).json(etymologyStory);
    } catch (error: any) {
      console.error("Etymology request failed:", error);
      return res.status(error.status || 500).json({ 
        message: error.message || "Failed to retrieve etymology information" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
