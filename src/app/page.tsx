import MemoryGame from "../components/MemoryGame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-pink-200">
      <MemoryGame />
    </main>
  );
}
