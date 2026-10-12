import ConverterCard from "@/app/components/BinaryConverter";
import { converters } from "@/app/components/BinaryConverter/config";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 text-black sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-4 border-b border-neutral-200 pb-8">
          <p className="text-xs font-medium tracking-widest text-neutral-500">
            DEVELOPER TOOLS
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Binary Converter
            <span className="text-neutral-400">.</span>
          </h1>

          <p className="max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Convert numbers, binary digits, and text in one place.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {converters.map((config) => (
            <ConverterCard key={config.id} config={config} />
          ))}
        </div>

        <footer className="border-t border-neutral-200 pt-5 text-center text-xs text-neutral-500">
          Binary Converter · Built for developers
        </footer>
      </div>
    </main>
  );
}
