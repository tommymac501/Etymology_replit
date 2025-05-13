import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { EtymologyResponse } from "@shared/schema";

import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import ResultCard from "@/components/ResultCard";
import ExamplesSection from "@/components/ExamplesSection";
import Footer from "@/components/Footer";

export default function EtymologyPage() {
  const [currentWord, setCurrentWord] = useState<string>("");
  const [etymologyData, setEtymologyData] = useState<EtymologyResponse | null>(null);

  const etymologyMutation = useMutation({
    mutationFn: async (word: string) => {
      const response = await apiRequest("POST", "/api/etymology", { word });
      return response.json();
    },
    onSuccess: (data: EtymologyResponse) => {
      setEtymologyData(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch etymology information",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (word: string) => {
    if (!word || word.trim().length === 0) return;
    
    setCurrentWord(word.trim());
    etymologyMutation.mutate(word.trim());
  };

  const handleSearchNew = () => {
    setEtymologyData(null);
  };

  const handleExampleClick = (example: string) => {
    handleSearch(example);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header />
        
        <SearchForm 
          onSubmit={handleSearch} 
          currentWord={currentWord}
          isLoading={etymologyMutation.isPending}
        />
        
        {etymologyMutation.isPending && <LoadingState />}
        
        {!etymologyMutation.isPending && etymologyMutation.isError && (
          <ErrorState 
            message={etymologyMutation.error?.message || "Word Origin Not Found"}
          />
        )}
        
        {!etymologyMutation.isPending && etymologyMutation.isSuccess && etymologyData && (
          <ResultCard 
            word={etymologyData.word} 
            etymology={etymologyData.etymology}
            onSearchNew={handleSearchNew}
          />
        )}
        
        {(!etymologyMutation.isPending || !etymologyData) && (
          <ExamplesSection onExampleClick={handleExampleClick} />
        )}
        
        <Footer />
      </div>
    </div>
  );
}
