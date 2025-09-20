export type HeroResponse = {
  response: string;
  'results-for': string;
  results: Hero[];
};

export type HeroByIdResponse = {
  response: string;
} & Hero;

export type Hero = {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    'full-name': string;
    'alter-egos': string;
    aliases: string[];
    'place-of-birth': string;
    'first-appearance': string;
    publisher: string;
    alignment: string;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    'eye-color': string;
    'hair-color': string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    'group-affiliation': string;
    relatives: string;
  };
  image: {
    url: string;
  };
};

export type Stats = {
  combat: string;
  durability: string;
  intelligence: string;
  power: string;
  speed: string;
  strength: string;
};

export type TeamHero = {
  id: string;
  name: string;
  image: { url: string };
  powerstats: Stats;
};

export type Team = TeamHero[];

type MatchResult = {
  heroA: string;
  heroB: string;
  score: { [heroName: string]: number };
  winner: string | 'draw';
  teamWinner: 'teamA' | 'teamB' | 'draw';
  result: {
    [stat: string]: {
      [heroName: string]: number;
    };
    // & {
    //   weight?: number;
    //   margin?: number;
    //   points?: number;
    // };
  }[];
  totalPoints?: { heroA: number; heroB: number };
};

export type TeamStats = {
  [K in keyof Stats]: {
    total: number;
    average: number;
    max: number;
  };
};

export type BattleResults = {
  allBattleResults: MatchResult[];
  score: {
    teamAScore: number;
    teamBScore: number;
  };
  teamStats?: {
    teamA: TeamStats;
    teamB: TeamStats;
  };
};
