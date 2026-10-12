"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import type { Dish } from "@/lib/data";

type DishResponse = { items: Dish[]; page: number; pageSize: number; total: number; totalPages: number; query: string };

function useDebouncedValue(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = window.setTimeout(() => setDebounced(value.trim()), delay);
    return () => window.clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

export default function MenuExplorer() {
  const searchParams = useSearchParams();
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 300);
  const searchKey = debouncedSearch ? `/api/dishes?q=${encodeURIComponent(debouncedSearch)}&page=1` : null;
  const pageKey = useMemo(() => `/api/dishes?page=${page}`, [page]);

  // Empty search deliberately uses a null SWR key; pagination owns the default list.
  const { data: searchData, error: searchError, isLoading: searchLoading, isValidating: searchValidating } = useSWR<DishResponse>(searchKey, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 1000
  });
  const { data: pageData, error: pageError, isLoading: pageLoading, isValidating: pageValidating } = useSWR<DishResponse>(debouncedSearch ? null : pageKey, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    dedupingInterval: 1000
  });
  const result = debouncedSearch ? searchData : pageData;
  const error = debouncedSearch ? searchError : pageError;
  const loading = debouncedSearch ? searchLoading : pageLoading;
  const validating = debouncedSearch ? searchValidating : pageValidating;
  const list = result?.items ?? [];
  const activePage = debouncedSearch ? 1 : (result?.page ?? page);
  const totalPages = result?.totalPages ?? 1;

  return <section className="panel menu-panel" aria-labelledby="menu-title">
    <div className="section-head"><div><p className="eyebrow">MADE FRESH</p><h2 id="menu-title">Explore the menu</h2></div><span className="count-label">{result ? `${result.total} dishes` : "Our favorites"}</span></div>
    <label className="search-label" htmlFor="dish-search">Search dishes</label>
    <div className="search-wrap"><span aria-hidden="true">⌕</span><input id="dish-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try ‘tibs’ or ‘vegetarian’" autoComplete="off" /><kbd>⌘ K</kbd></div>
    <p className="helper-text" aria-live="polite">{search ? `Searching for “${search}”${debouncedSearch !== search.trim() ? "…" : ""}` : "Search by dish name, category, or ingredient."}{validating && debouncedSearch ? " Updating results…" : ""}</p>
    {error && <p className="error-message" role="alert">Could not load dishes: {error.message}</p>}
    {loading && !result ? <div className="dish-grid" aria-label="Loading dishes">{Array.from({ length: 6 }, (_, i) => <div className="dish-skeleton" key={i} />)}</div> : list.length === 0 ? <div className="empty-state"><span>🍽️</span><strong>No dishes found</strong><p>Try another search term.</p></div> : <div className="dish-grid" aria-busy={validating}>
      {list.map((dish) => <article className="dish-card" key={dish.id}><div className="dish-emoji" aria-hidden="true">{dish.emoji}</div><div className="dish-copy"><span className="dish-category">{dish.category}</span><h3>{dish.name}</h3><p>{dish.description}</p><div className="dish-bottom"><strong>{dish.price.toLocaleString("en-ET")} <small>ETB</small></strong><button className="add-button" type="button" aria-label={`Add ${dish.name} to order`} onClick={() => window.alert(`${dish.name} added to your demo order.`)}>+</button></div></div></article>)}
    </div>}
    {!debouncedSearch && <nav className="pagination" aria-label="Menu pages"><span>Page {activePage} of {totalPages}</span><div className="pagination-actions"><Link aria-disabled={page <= 1} className={`page-link ${page <= 1 ? "disabled" : ""}`} href={`/?page=${Math.max(1, page - 1)}#menu-title`} tabIndex={page <= 1 ? -1 : undefined}>← Previous</Link><Link aria-disabled={page >= totalPages} className={`page-link primary-page ${page >= totalPages ? "disabled" : ""}`} href={`/?page=${Math.min(totalPages, page + 1)}#menu-title`} tabIndex={page >= totalPages ? -1 : undefined}>Next →</Link></div></nav>}
  </section>;
}
