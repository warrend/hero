import { HeroByIdResponse, HeroResponse } from './types';

const BASE_URL = `https://superheroapi.com/api/${process.env.NEXT_PUBLIC_SUPERHERO_API_KEY}`;

export async function get<T = any>(endpoint: string): Promise<T> {
  const result = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error(`Failed to get ${endpoint}: ${result.status}`);
  }

  return result.json();
}

export async function searchSuperhero(
  superhero: string
): Promise<HeroResponse> {
  if (!superhero || superhero.trim() === '') {
    return {
      response: 'success',
      'results-for': '',
      results: [],
    };
  }

  return await get<HeroResponse>(`/search/${superhero}`);
}

export async function getHeroById(id: string): Promise<HeroByIdResponse> {
  return await get<HeroByIdResponse>(`/${id}`);
}

export async function getHeroesByIds(
  ids: number[]
): Promise<HeroByIdResponse[]> {
  return Promise.all(ids.map((id) => getHeroById(String(id))));
}
