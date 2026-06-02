'use client';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Animated badge */}
        <div className="inline-block">
          <span className="text-sm text-text-secondary uppercase tracking-widest animate-float">
            ✨ Curated Inspiration
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary leading-tight">
          <span className="bg-gradient-to-r from-white via-text-secondary to-text-tertiary bg-clip-text text-transparent">
            Discover Exceptional Design
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          A carefully curated collection of inspiring websites and design work. Find your next creative spark.
        </p>

        {/* CTA Button */}
        <div className="pt-8">
          <a
            href="#gallery"
            className="inline-block px-8 py-4 bg-bg-secondary hover:bg-bg-hover text-text-primary rounded-lg font-medium transition-all duration-300 border border-bg-hover hover:border-text-secondary"
          >
            Explore Gallery
          </a>
        </div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
}
