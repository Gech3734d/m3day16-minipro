# Data fetching contract

Every SWR request uses `lib/fetcher.ts`. The fetcher checks `response.ok` and throws on non-2xx responses so SWR can expose a real error state instead of treating an HTTP failure as data.

| Query | Key | Refresh / revalidation rule | Why |
|---|---|---|---|
| Order status | `/api/orders/${orderId}` | Poll every 5,000 ms; revalidate on focus and reconnect; server data supplied as `fallbackData`; keep previous data | Order status is time-sensitive. Server data paints immediately, and a five-second interval gives timely updates without a spinner on first paint. |
| Menu search | `/api/dishes?q=${encodedTerm}&page=1` when the debounced term is non-empty; `null` when empty | Debounce input by 300 ms; `keepPreviousData: true`; focus revalidation off; 1,000 ms dedupe | Avoids a request per keystroke, avoids fetching a search for an empty term, and retains the previous results while a new search resolves. |
| Paged dish list | `/api/dishes?page=${page}` when the debounced search term is empty; `null` while searching | `keepPreviousData: true`; focus revalidation off; 1,000 ms dedupe; page is read from `?page=` in the URL | The URL makes each page bookmarkable and shareable. Keeping previous data avoids a blank flash while changing pages. |

## Key rules

- The order ID is part of the order query key, so different orders cannot share cached data.
- Search terms are trimmed after debounce and URL-encoded before being placed in the key.
- Empty search uses a literal `null` SWR key; the paged list query owns the default menu.
- Pagination page number lives in the query string, and page links preserve the current route and anchor.
- The search and paged list queries are mutually exclusive to avoid duplicate menu requests.
- All API routes currently use deterministic demo data. Replace `lib/data.ts` with database access for production; do not treat this in-memory demo as a live ordering backend.
