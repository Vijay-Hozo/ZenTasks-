import Link from "next/link";
import { Cover } from "./ui/cover";

export default function Header() {
  return (
    <section className="flex flex-col items-center justify-center w-full">
      <div className="text-center relative ">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 text-white/60 text-xs font-light">
          <span className="bg-white/10 rounded-full font-light px-2 py-[4px] border-[1px] border-amber-500">
            No 1. Task Manager Platform
          </span>
        </div>

        <h1 className="text-6xl font-semibold max-w-7xl mx-auto mt-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 ">
          Complete your tasks <br /> at <Cover>Zen Mode</Cover>
        </h1>

        <p className="mt-4 text-lg text-foreground max-w-2xl mx-auto">
          Stay on top of your goals with ease! Plan, track, and complete your tasks effortlessly—your productivity, reimagined.
        </p>

        <Link
          href="/sign-in"
          className="mt-10 inline-block bg-amber-500 text-white px-6 py-3 text-sm font-medium rounded "
        >
          Go to Dashboard <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
