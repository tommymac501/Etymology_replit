import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSubmit: (word: string) => void;
  currentWord: string;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, currentWord, isLoading }: SearchFormProps) {
  const [inputValue, setInputValue] = useState(currentWord);
  const [errorMessage, setErrorMessage] = useState("");
  
  const validateInput = (word: string): boolean => {
    if (!word || word.trim().length === 0) {
      setErrorMessage("Please enter a word");
      return false;
    }
    
    if (word.trim().length < 2) {
      setErrorMessage("Word must be at least 2 characters");
      return false;
    }
    
    if (!/^[a-zA-Z\s-]+$/.test(word)) {
      setErrorMessage("Please enter a valid word (letters only)");
      return false;
    }
    
    setErrorMessage("");
    return true;
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateInput(inputValue)) {
      onSubmit(inputValue);
    }
  };
  
  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a word (e.g., democracy, alphabet, enthusiasm)"
            className="w-full px-4 py-3 rounded-lg border border-light-gray focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            disabled={isLoading}
          />
          {errorMessage && (
            <div className="absolute -bottom-6 left-0 text-sm text-error">
              {errorMessage}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex-shrink-0 flex items-center justify-center"
          disabled={isLoading}
        >
          <span>Discover Origins</span>
        </Button>
      </form>
    </div>
  );
}
