import { Sparkles, Compass, Eye, Heart } from "lucide-react";

export const metadata = {
  title: "Our Philosophy | About",
  description: "Learn about the mission, curating standards, and criteria for studying modern web craft.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      
      {/* Hero Header */}
      <div className="flex flex-col gap-4 text-center mb-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">Our Manifesto</span>
        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
          The Web is an Art Form.
        </h1>
        <p className="text-md text-muted max-w-xl mx-auto leading-relaxed mt-2">
          We believe software shouldn&apos;t just be functional — it should be delightful, tactile, and designed with unmistakable taste.
        </p>
      </div>

      {/* Main content editorial style */}
      <div className="flex flex-col gap-12 text-white/80 leading-relaxed text-sm">
        
        <section className="flex flex-col gap-4">
          <p>
            The modern web has converged on boring layouts, generic templates, and predictable templates. In the search for optimal conversion, we lost surprise. We lost the micro-interactions, the custom cursors, the bold editorial layout spacing, and the cinematic transitions that make browsing feel like visiting a physical gallery.
          </p>
          <p>
            <strong>No More Boring Websites</strong> is a response to this drift. It is an extremely curated museum of design elements, interactions, and visual grids designed specifically for frontend engineers and creative designers who refuse to compromise on craft.
          </p>
        </section>

        {/* Curation Standards Grid */}
        <section className="border-t border-white/10 pt-12">
          <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider text-center sm:text-left">
            Curation Benchmarks
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4 items-start p-4 rounded-2xl border border-white/5 bg-[#111318]/30">
              <Eye className="size-8 text-pink-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white text-sm">Typographic Taste</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  We look for editorial hierarchy, font pairings, line heights, and layout pacing that command readability and confidence.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-2xl border border-white/5 bg-[#111318]/30">
              <Compass className="size-8 text-violet-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white text-sm">Functional Motion</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Animation must clarify. We study scroll stories, dynamic reveals, and micro-interactions that make a product intuitive, not noisy.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-2xl border border-white/5 bg-[#111318]/30">
              <Sparkles className="size-8 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white text-sm">Originality & Craft</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  We highlight creators breaking conventions: WebGL environments, 3D staging, interactive demos, and bold brutalism.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start p-4 rounded-2xl border border-white/5 bg-[#111318]/30">
              <Heart className="size-8 text-blue-400 shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white text-sm">Studied Blueprint</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  Every curation contains a curator note and an engineering breakdown, explaining how designers can recreate the effects in Webflow, Framer, or Custom Code.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Quote */}
        <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-8 text-center mt-6">
          <p className="text-sm font-medium text-white italic">
            &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
          </p>
          <span className="text-[10px] text-muted block uppercase tracking-widest mt-3">— Steve Jobs</span>
        </div>
      </div>
    </main>
  );
}
