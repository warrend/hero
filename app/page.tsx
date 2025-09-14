import { searchSuperhero } from '@/lib/fetch';
import SearchBar from './_ui/search-bar';
import HeroList from './_ui/hero-list';
import { Suspense } from 'react';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <main>
      <SearchBar />
      <Suspense
        key={query}
        fallback={<div className="text-center">Loading...</div>}
      >
        <HeroList query={query} />
      </Suspense>
    </main>
  );
}
