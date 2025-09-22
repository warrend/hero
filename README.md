# Hero Battle App

3x3 Superhero battle app.

## Getting started

Add `NEXT_PUBLIC_SUPERHERO_API_KEY=your-api-key` into `.env.local` file.

Run `pnpm dev` or `npm run dev` to start the project.

## Project Structure

```
/app
├── page.tsx              // Main page - team selection interface
├── layout.tsx
├── _ui/
│   ├── hero-list/
│   ├── search-bar/
│   ├── search-modal/
│   ├── team-list/
│   └── team-select/
└── battle/
    ├── page.tsx          // Battle setup and results
    └── _ui/
        ├── battle-engine/
        ├── battle-results/
        └── team-sheet/

/components              // Reusable UI components
├── button/
├── input/
├── modal/
├── power-stats/
└── stats/

/lib                     // Utilities, types, and provider
├── fetch.ts
├── types.ts
└── team-provider.tsx

/state                   // Application state management
├── battleReducer.ts
└── teamReducer.ts
```

## Reasoning

The search component captures the user's input and creates a query param. The server component uses the query param to search and display the hero list.

Team members are tracked/added/removed using the teamReducer. Once the team is set, the Preview Battle button adds the team IDs as query params and navigates to the battle screen. The query params are then used to fetch all of the heroes for the battle (to avoid the page from breaking on refresh and create a sharable link).

When the battle starts, the teams play round robin. Each player match is added to the battleReducer and the winner is tracked as well as the overall winner. The statWeights are factored into each match.

The stats for the matches are shown as well as the individual match results.

Items to focus on during next iteration:

- Building out more reusable components, like inputs, buttons, etc.
- Add a UI to adjust weights.
- Persisting previous teams
- Adding some more animated/transitions to modals, pages, buttons, etc.
