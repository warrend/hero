import SearchBar from './_ui/search-bar';
import HeroList from './_ui/hero-list';
import { Suspense } from 'react';
import TeamList from './_ui/team-list';

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <main className="grid grid-cols-[400px_1fr]">
      <div>
        <TeamList />
      </div>
      <div className="max-w-[600px]">
        <SearchBar />
        <Suspense
          key={query}
          fallback={<div className="text-center">Loading...</div>}
        >
          <HeroList query={query} />
        </Suspense>
      </div>
    </main>
  );
}
