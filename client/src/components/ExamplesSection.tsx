interface ExamplesSectionProps {
  onExampleClick: (example: string) => void;
}

export default function ExamplesSection({ onExampleClick }: ExamplesSectionProps) {
  const exampleWords = [
    "serendipity",
    "nostalgia",
    "quarantine",
    "silhouette",
    "panic"
  ];
  
  return (
    <div className="mt-12">
      <h3 className="text-xl font-semibold mb-4 text-text">Try these fascinating words:</h3>
      <div className="flex flex-wrap gap-2">
        {exampleWords.map((word) => (
          <button
            key={word}
            onClick={() => onExampleClick(word)}
            className="example-word px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
