import { getHeroById } from '@/lib/fetch';
import React from 'react';

export default async function Superhero({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const hero = await getHeroById(id);
  console.log({ hero });
  return <div>{hero.name}</div>;
}
