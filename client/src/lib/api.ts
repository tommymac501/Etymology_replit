import { EtymologyResponse } from "@shared/schema";
import { apiRequest } from "./queryClient";

export async function getEtymology(word: string): Promise<EtymologyResponse> {
  try {
    const response = await apiRequest("POST", "/api/etymology", { word });
    const data = await response.json();
    return data as EtymologyResponse;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch etymology");
  }
}
