import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url('/images/mobile-bg.jpg')" }}
      />
      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat md:block"
        style={{ backgroundImage: "url('/images/Desktop-bg.png')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            SmartRoute
          </h1>
          <p className="mt-6 text-lg md:text-2xl font-medium">
            Vineyard Journey
          </p>
          <p className="mt-4 text-base md:text-lg opacity-90">
            Curated by Larry Davis,
            25 years planning Food
            & Wine experiences
          </p>
          <Link
            href="/what-you-get"
            className="mt-10 inline-flex w-full max-w-xs justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition hover:bg-gray-200 md:w-auto md:max-w-none"
          >
            get started
          </Link>
        </div>
      </div>
    </div>
  );
}
