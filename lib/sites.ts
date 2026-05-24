import type { Category, Platform, WebsiteItem } from "@/lib/types";

const screenshot = (url: string) =>
  `https://image.thum.io/get/width/1400/crop/940/noanimate/${url}`;

export const categories: Category[] = [
  "Ecommerce",
  "SaaS",
  "Animated",
  "3D",
  "Webflow",
  "Framer",
  "Portfolio",
  "Agency",
  "AI",
  "Experimental",
];

export const platforms: Platform[] = [
  "Webflow",
  "Framer",
  "Shopify",
  "Custom Code",
  "WordPress",
];

export const styles = [
  "Minimal",
  "Editorial",
  "Brutalist",
  "Luxury",
  "Playful",
  "Dark",
  "Clean",
  "Motion-heavy",
];

export const interactions = [
  "Microinteractions",
  "Scroll Story",
  "Product Demo",
  "Hover Preview",
  "3D Scene",
  "Cursor Detail",
];

export const colors = ["Neutral", "Mono", "Warm", "Dark", "Colorful", "High Contrast"];

export const layouts = ["Grid", "Magazine", "Split", "Dashboard", "Showcase", "Narrative"];

export const websites: WebsiteItem[] = [
  {
    id: "linear",
    title: "Linear",
    url: "https://linear.app",
    screenshot: screenshot("https://linear.app"),
    categories: ["SaaS", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Dark", "Clean", "Motion-heavy"],
    interactions: ["Product Demo", "Microinteractions"],
    colors: ["Dark", "High Contrast"],
    layout: ["Dashboard", "Narrative"],
    industry: "Productivity",
    score: { taste: 9.7, motion: 9.2, originality: 8.8 },
    curatorNote: "A benchmark for software websites: restrained, fast, and obsessively sequenced.",
    breakdown:
      "Study how the page sells a complex product with controlled motion, precise contrast, and product UI that never feels decorative.",
    featuredAt: "2026-05-20",
  },
  {
    id: "stripe",
    title: "Stripe",
    url: "https://stripe.com",
    screenshot: screenshot("https://stripe.com"),
    categories: ["SaaS", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Clean", "Editorial"],
    interactions: ["Scroll Story", "Product Demo"],
    colors: ["Colorful", "Neutral"],
    layout: ["Narrative", "Grid"],
    industry: "Fintech",
    score: { taste: 9.4, motion: 8.9, originality: 8.7 },
    curatorNote: "Dense product storytelling without losing elegance or scan speed.",
    breakdown:
      "Useful for studying section rhythm, technical credibility, and how motion can clarify instead of distract.",
    featuredAt: "2026-05-18",
  },
  {
    id: "arc",
    title: "Arc",
    url: "https://arc.net",
    screenshot: screenshot("https://arc.net"),
    categories: ["Animated", "SaaS"],
    platforms: ["Custom Code"],
    styles: ["Playful", "Editorial", "Motion-heavy"],
    interactions: ["Scroll Story", "Cursor Detail"],
    colors: ["Warm", "Colorful"],
    layout: ["Narrative", "Showcase"],
    industry: "Browser",
    score: { taste: 9.2, motion: 9.3, originality: 9.0 },
    curatorNote: "A personality-rich software site that still protects the core product story.",
    breakdown:
      "Notice the balance between playful language, product framing, and immersive page transitions.",
    featuredAt: "2026-05-16",
  },
  {
    id: "raycast",
    title: "Raycast",
    url: "https://raycast.com",
    screenshot: screenshot("https://raycast.com"),
    categories: ["SaaS", "AI"],
    platforms: ["Custom Code"],
    styles: ["Dark", "Clean"],
    interactions: ["Product Demo", "Microinteractions"],
    colors: ["Dark", "High Contrast"],
    layout: ["Dashboard", "Grid"],
    industry: "Productivity",
    score: { taste: 9.1, motion: 8.2, originality: 8.4 },
    curatorNote: "Sharp product density with a strong command-line aesthetic.",
    breakdown:
      "A strong reference for showing workflows, integrations, and technical sophistication in a compact system.",
    featuredAt: "2026-05-14",
  },
  {
    id: "panic",
    title: "Panic",
    url: "https://panic.com",
    screenshot: screenshot("https://panic.com"),
    categories: ["Portfolio", "Ecommerce"],
    platforms: ["Custom Code"],
    styles: ["Playful", "Editorial"],
    interactions: ["Hover Preview", "Microinteractions"],
    colors: ["Colorful", "Warm"],
    layout: ["Grid", "Showcase"],
    industry: "Software Studio",
    score: { taste: 9.0, motion: 7.8, originality: 9.3 },
    curatorNote: "A studio site with character, clarity, and unmistakable taste.",
    breakdown:
      "Worth studying for expressive product cards, restrained copy, and personality that never becomes noise.",
  },
  {
    id: "apple-vision-pro",
    title: "Apple Vision Pro",
    url: "https://www.apple.com/apple-vision-pro/",
    screenshot: screenshot("https://www.apple.com/apple-vision-pro/"),
    categories: ["3D", "Animated", "Ecommerce"],
    platforms: ["Custom Code"],
    styles: ["Luxury", "Minimal", "Motion-heavy"],
    interactions: ["3D Scene", "Scroll Story"],
    colors: ["Neutral", "Mono"],
    layout: ["Narrative", "Showcase"],
    industry: "Hardware",
    score: { taste: 9.5, motion: 9.5, originality: 8.6 },
    curatorNote: "High-budget product storytelling with immaculate sequencing.",
    breakdown:
      "Use this to study product reveal timing, cinematic scroll pacing, and premium restraint.",
  },
  {
    id: "nothing",
    title: "Nothing",
    url: "https://nothing.tech",
    screenshot: screenshot("https://nothing.tech"),
    categories: ["Ecommerce", "Experimental"],
    platforms: ["Shopify"],
    styles: ["Brutalist", "Minimal", "High Contrast"],
    interactions: ["Hover Preview", "Microinteractions"],
    colors: ["Mono", "High Contrast"],
    layout: ["Grid", "Showcase"],
    industry: "Consumer Tech",
    score: { taste: 8.9, motion: 7.9, originality: 9.1 },
    curatorNote: "A commerce experience with a distinct visual rulebook.",
    breakdown:
      "Strong for studying how brand codes can make ordinary product grids feel collectible.",
  },
  {
    id: "copilot",
    title: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    screenshot: screenshot("https://github.com/features/copilot"),
    categories: ["AI", "SaaS"],
    platforms: ["Custom Code"],
    styles: ["Dark", "Clean"],
    interactions: ["Product Demo", "Scroll Story"],
    colors: ["Dark", "Colorful"],
    layout: ["Narrative", "Dashboard"],
    industry: "Developer Tools",
    score: { taste: 8.7, motion: 8.0, originality: 8.2 },
    curatorNote: "A clear AI product story with developer-native proof points.",
    breakdown:
      "Useful when designing AI tools that need trust, examples, and practical outcomes over vague magic.",
  },
  {
    id: "superlist",
    title: "Superlist",
    url: "https://www.superlist.com",
    screenshot: screenshot("https://www.superlist.com"),
    categories: ["SaaS", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Playful", "Clean", "Motion-heavy"],
    interactions: ["Microinteractions", "Product Demo"],
    colors: ["Colorful", "Neutral"],
    layout: ["Narrative", "Grid"],
    industry: "Productivity",
    score: { taste: 9.0, motion: 8.8, originality: 8.7 },
    curatorNote: "Bright without feeling cheap; friendly without feeling soft.",
    breakdown:
      "A good reference for making productivity software feel approachable while keeping visual hierarchy tight.",
  },
  {
    id: "ordinary-folk",
    title: "Ordinary Folk",
    url: "https://ordinaryfolk.co",
    screenshot: screenshot("https://ordinaryfolk.co"),
    categories: ["Agency", "Animated", "Portfolio"],
    platforms: ["Custom Code"],
    styles: ["Editorial", "Motion-heavy"],
    interactions: ["Scroll Story", "Hover Preview"],
    colors: ["Neutral", "Warm"],
    layout: ["Magazine", "Showcase"],
    industry: "Creative Studio",
    score: { taste: 9.6, motion: 9.6, originality: 9.0 },
    curatorNote: "Motion design taste translated into a web portfolio with discipline.",
    breakdown:
      "Study the timing, whitespace, and how project previews carry the brand more than decoration.",
  },
  {
    id: "resend",
    title: "Resend",
    url: "https://resend.com",
    screenshot: screenshot("https://resend.com"),
    categories: ["SaaS"],
    platforms: ["Custom Code"],
    styles: ["Minimal", "Clean"],
    interactions: ["Product Demo", "Microinteractions"],
    colors: ["Neutral", "Mono"],
    layout: ["Dashboard", "Narrative"],
    industry: "Developer Tools",
    score: { taste: 8.8, motion: 7.8, originality: 8.2 },
    curatorNote: "Developer marketing stripped to the essentials without becoming bland.",
    breakdown:
      "Strong for pricing clarity, code-led product explanation, and sparse interface rhythm.",
  },
  {
    id: "airbnb-design",
    title: "Airbnb Design",
    url: "https://airbnb.design",
    screenshot: screenshot("https://airbnb.design"),
    categories: ["Portfolio", "Agency"],
    platforms: ["WordPress"],
    styles: ["Editorial", "Clean"],
    interactions: ["Hover Preview"],
    colors: ["Neutral", "Warm"],
    layout: ["Magazine", "Grid"],
    industry: "Design Editorial",
    score: { taste: 8.7, motion: 7.1, originality: 8.3 },
    curatorNote: "Editorial structure for a design org with a high signal-to-noise ratio.",
    breakdown:
      "A useful model for content-heavy design sites that still need taste and authority.",
  },
  {
    id: "instrument",
    title: "Instrument",
    url: "https://www.instrument.com",
    screenshot: screenshot("https://www.instrument.com"),
    categories: ["Agency", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Editorial", "Brutalist", "Motion-heavy"],
    interactions: ["Scroll Story", "Hover Preview"],
    colors: ["Neutral", "High Contrast"],
    layout: ["Magazine", "Narrative"],
    industry: "Agency",
    score: { taste: 9.1, motion: 8.5, originality: 8.9 },
    curatorNote: "A confident agency system that lets work and pacing do the talking.",
    breakdown:
      "Good for studying editorial hierarchy, large-scale typography, and cinematic case study flow.",
  },
  {
    id: "gumroad",
    title: "Gumroad",
    url: "https://gumroad.com",
    screenshot: screenshot("https://gumroad.com"),
    categories: ["Ecommerce", "SaaS"],
    platforms: ["Custom Code"],
    styles: ["Brutalist", "Playful"],
    interactions: ["Microinteractions"],
    colors: ["Colorful", "High Contrast"],
    layout: ["Grid", "Showcase"],
    industry: "Creator Commerce",
    score: { taste: 8.5, motion: 7.0, originality: 9.0 },
    curatorNote: "A rare commerce platform with a visual voice people remember.",
    breakdown:
      "Worth studying for brand courage, sharp contrast, and how rough edges can become a product asset.",
  },
  {
    id: "height",
    title: "Height",
    url: "https://height.app",
    screenshot: screenshot("https://height.app"),
    categories: ["SaaS", "AI"],
    platforms: ["Custom Code"],
    styles: ["Clean", "Minimal"],
    interactions: ["Product Demo"],
    colors: ["Neutral", "Mono"],
    layout: ["Dashboard", "Narrative"],
    industry: "Project Management",
    score: { taste: 8.6, motion: 7.7, originality: 8.1 },
    curatorNote: "Clean AI-assisted workflow storytelling with product UI at the center.",
    breakdown:
      "A good reference for presenting automation features without losing the core job-to-be-done.",
  },
  {
    id: "contra",
    title: "Contra",
    url: "https://contra.com",
    screenshot: screenshot("https://contra.com"),
    categories: ["Portfolio", "SaaS"],
    platforms: ["Framer"],
    styles: ["Clean", "Playful"],
    interactions: ["Microinteractions", "Hover Preview"],
    colors: ["Neutral", "Colorful"],
    layout: ["Grid", "Showcase"],
    industry: "Creator Platform",
    score: { taste: 8.4, motion: 7.6, originality: 8.0 },
    curatorNote: "A creator platform with polished cards and a confident marketplace rhythm.",
    breakdown:
      "Study the way profiles, proof, and calls to action stay legible across a busy marketplace surface.",
  },
  {
    id: "mubasic",
    title: "Mubasic",
    url: "https://mubasic.com",
    screenshot: screenshot("https://mubasic.com"),
    categories: ["Animated", "Experimental"],
    platforms: ["Webflow"],
    styles: ["Playful", "Motion-heavy"],
    interactions: ["3D Scene", "Microinteractions"],
    colors: ["Colorful", "Warm"],
    layout: ["Showcase", "Narrative"],
    industry: "Music Education",
    score: { taste: 8.8, motion: 9.0, originality: 9.2 },
    curatorNote: "Playful web craft that feels memorable without losing usability.",
    breakdown:
      "Great for studying cheerful interaction design, rounded pacing, and visual storytelling for non-technical products.",
  },
  {
    id: "pitch",
    title: "Pitch",
    url: "https://pitch.com",
    screenshot: screenshot("https://pitch.com"),
    categories: ["SaaS", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Clean", "Editorial", "Motion-heavy"],
    interactions: ["Product Demo", "Scroll Story"],
    colors: ["Neutral", "Colorful"],
    layout: ["Dashboard", "Narrative"],
    industry: "Presentation Software",
    score: { taste: 8.9, motion: 8.6, originality: 8.4 },
    curatorNote: "A crisp SaaS site with a strong grasp of product scenes and page tempo.",
    breakdown:
      "Useful for studying how to keep a feature-rich product visual and concise across many sections.",
  },
  {
    id: "readymag",
    title: "Readymag",
    url: "https://readymag.com",
    screenshot: screenshot("https://readymag.com"),
    categories: ["Experimental", "Portfolio", "Animated"],
    platforms: ["Custom Code"],
    styles: ["Editorial", "Brutalist", "Motion-heavy"],
    interactions: ["Scroll Story", "Hover Preview"],
    colors: ["Colorful", "High Contrast"],
    layout: ["Magazine", "Narrative"],
    industry: "Design Tool",
    score: { taste: 9.0, motion: 8.7, originality: 9.2 },
    curatorNote: "An editorial design tool site that actually behaves like an editorial canvas.",
    breakdown:
      "Study it for layout courage, typographic contrast, and controlled weirdness.",
  },
];

export const siteOfTheDay = websites[0];

export const weeklyDrops = [
  {
    slug: "software-with-taste",
    title: "Software With Taste",
    description: "SaaS sites where product UI, motion, and copy feel designed as one system.",
    ids: ["linear", "stripe", "raycast", "resend", "pitch", "height"],
  },
  {
    slug: "motion-that-earns-its-place",
    title: "Motion That Earns Its Place",
    description: "Animated references where movement clarifies the idea instead of acting as noise.",
    ids: ["ordinary-folk", "arc", "apple-vision-pro", "mubasic", "readymag", "superlist"],
  },
  {
    slug: "commerce-with-a-point-of-view",
    title: "Commerce With a Point of View",
    description: "Commerce and product sites that feel distinctive before you read a single line.",
    ids: ["nothing", "panic", "gumroad", "apple-vision-pro", "contra"],
  },
];

export function getSiteById(id: string) {
  return websites.find((site) => site.id === id);
}

export function getRelatedSites(site: WebsiteItem, limit = 3) {
  return websites
    .filter((item) => item.id !== site.id)
    .map((item) => {
      const overlap =
        item.categories.filter((tag) => site.categories.includes(tag)).length * 3 +
        item.platforms.filter((tag) => site.platforms.includes(tag)).length * 2 +
        item.styles.filter((tag) => site.styles.includes(tag)).length;

      return { item, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || b.item.score.taste - a.item.score.taste)
    .slice(0, limit)
    .map(({ item }) => item);
}
