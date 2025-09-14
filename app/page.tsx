import { searchSuperhero } from '@/lib/fetch';
import SearchBar from './_ui/SearchBar';
import HeroList from './_ui/HeroList';

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
      <HeroList query={query} />
    </main>
  );
}
