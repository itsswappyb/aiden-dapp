'use client';

export function LoadingScreen() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[#011829] via-[#030f1c] to-black">
      <div className="animate-pulse">Loading...</div>
    </div>
  );
}
