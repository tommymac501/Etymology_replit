import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="bg-error/10 border border-error/30 rounded-lg p-6 text-center">
      <div className="mb-4 text-error text-xl">
        <AlertCircle className="h-8 w-8 mx-auto" />
      </div>
      <h3 className="font-medium text-xl mb-2">Word Origin Not Found</h3>
      <p className="text-dark-gray">
        {message || "We couldn't find etymology information for this word. Please try another word or check your spelling."}
      </p>
    </div>
  );
}
