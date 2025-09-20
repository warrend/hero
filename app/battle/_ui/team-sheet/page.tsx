import { ImageFallback } from '@/components/image-fallback';
import PowerStats from '@/components/power-stats';
import { HeroByIdResponse, Stats } from '@/lib/types';

export function TeamSheet({
  team,
  stats,
}: {
  team: HeroByIdResponse[];
  stats: Stats;
}) {
  return (
    <div className="space-y-2 bg-slate-50 p-5 rounded-sm">
      <div className="mb-6">
        <PowerStats stats={stats} title="Team Stats" />
      </div>
      <div className="text-sm mb-4 text-slate-500 font-medium">Players</div>
      {team.map(({ id, name, image }) => (
        <div key={id}>
          <div className="flex items-center font-semibold border-b border-gray-300 pb-2 mb-2">
            <ImageFallback
              className="mr-2 rounded-full object-cover w-8 h-8 flex-shrink-0"
              src={image.url}
              width={35}
              height={35}
              alt={`picture of ${name}`}
              name={name}
            />
            {name}
          </div>
        </div>
      ))}
    </div>
  );
}
