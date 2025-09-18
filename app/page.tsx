import SearchBar from './_ui/search-bar';
import HeroList from './_ui/hero-list';
import { Suspense } from 'react';
import TeamList from './_ui/team-list';
import SearchModal from './_ui/search-modal';

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';

  return (
    <main className="">
      <div className="mb-4">
        <SearchModal query={query}>
          <Suspense
            key={query}
            fallback={<div className="text-center">Loading...</div>}
          >
            <HeroList query={query} />
          </Suspense>
        </SearchModal>
      </div>
      <div>
        <TeamList />
      </div>
    </main>
  );
}
