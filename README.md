# Addis Eats — Client-side Data Patterns

A responsive Next.js App Router sample demonstrating the three client-side data problems: server-rendered order status with polling, debounced menu search, and URL-backed pagination without blank flashes.

## Requirements

- Node.js 20.9+ recommended
- npm

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

## Production build

```powershell
npm run lint
npm run build
npm run start
```

## API routes

| Route | Method | Purpose |
|---|---|---|
| `/` | GET | Server renders initial order status, then client polls every five seconds |
| `/api/orders/[id]` | GET | Returns current demo status for an order ID |
| `/api/dishes?q=&page=` | GET | Returns filtered, paginated dish results |

## Data decisions

See [`DATA.md`](./DATA.md) for every SWR key, refresh/revalidation rule, and the reasoning behind each choice.

## Notes

- `lib/fetcher.ts` is the shared fetcher and throws on every non-OK response.
- The order status component uses server data as `fallbackData`, so the first paint is useful before the first client request.
- Search is debounced by 300 ms. Its SWR key is `null` for an empty term and `keepPreviousData` is enabled.
- The page number is read from the `page` query parameter, and page navigation uses links.
- This is a demo. API data is generated in code and is not persisted to a database.
