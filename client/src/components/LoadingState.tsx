export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 border-4 border-light-gray border-t-primary rounded-full animate-spin mb-4"></div>
      <p className="text-dark-gray">Researching word origins...</p>
    </div>
  );
}
