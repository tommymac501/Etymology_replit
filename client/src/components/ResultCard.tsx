import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultCardProps {
  word: string;
  etymology: string;
  onSearchNew: () => void;
}

export default function ResultCard({ word, etymology, onSearchNew }: ResultCardProps) {
  return (
    <Card className="bg-white border border-light-gray rounded-lg overflow-hidden shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-mono text-text tracking-tight">
            {word}
          </h2>
          <Badge className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Etymology
          </Badge>
        </div>
        
        <div className="prose prose-slate max-w-none">
          <div 
            className="leading-relaxed text-text"
            dangerouslySetInnerHTML={{ __html: etymology }}
          />
        </div>
      </CardContent>
      
      <CardFooter className="bg-background px-6 py-4 border-t border-light-gray">
        <Button 
          variant="link" 
          className="text-primary hover:text-primary/80 font-medium transition-colors p-0"
          onClick={onSearchNew}
        >
          Search another word
        </Button>
      </CardFooter>
    </Card>
  );
}
