import { Header } from "@/shared/components/header";

export default function Home() {
  return (
    <main className="bg-[var(--paper)] text-[var(--ink)] px-6 pt-3">
      <Header />
      <Hero />
    </main>
  );
}


export function Hero() {
  return (
    <main>
      <h1 className="mb-[12px] mt-[13px] whitespace-nowrap text-[clamp(17px,4.9vw,20px)] font-bold leading-[1.18] tracking-[-0.55px] text-[var(--ink)]">
        Good morning, Adaeze
      </h1>
      <Dashboard />
    </main>
  )
}

export function Dashboard() {
  return (
    <main>This is my dashboard</main>
  )
} 
