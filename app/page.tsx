import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { getWebsites } from '@/lib/db';

export const metadata = {
  title: 'Inspiration Gallery',
  description: 'A curated collection of inspiring websites and design work.',
};

export default async function Home() {
  const websites = await getWebsites();

  return (
    <>
      <Header />
      <Hero />
      <Gallery websites={websites} />
    </>
  );
}
