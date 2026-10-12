"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import type { OrderStatus as Order } from "@/lib/data";

export default function OrderStatus({ initialOrder }: { initialOrder: Order }) {
  const { data, error, isValidating } = useSWR<Order>(`/api/orders/${encodeURIComponent(initialOrder.id)}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    keepPreviousData: true
  });
  const order = data ?? initialOrder;
  const stages = ["Preparing", "On the way", "Delivered"];
  const stageIndex = stages.indexOf(order.status);
  return <section className="panel order-panel" aria-labelledby="order-title">
    <div className="section-head"><div><p className="eyebrow">LIVE ORDER</p><h2 id="order-title">Order #{order.id}</h2></div><span className={`status-pill stage-${stageIndex}`}>{order.status}</span></div>
    <p className="muted">Your server-rendered order appears immediately. It refreshes every five seconds.</p>
    <div className="timeline" aria-label={`Order status: ${order.status}`}>
      {stages.map((stage, index) => <div className={`timeline-step ${index <= stageIndex ? "complete" : ""}`} key={stage}><span className="timeline-dot">{index < stageIndex ? "✓" : index + 1}</span><span>{stage}</span></div>)}
    </div>
    <div className="order-details"><div><span className="detail-label">Customer</span><strong>{order.customer}</strong></div><div><span className="detail-label">Your meal</span><strong>{order.dish}</strong></div><div><span className="detail-label">Estimated arrival</span><strong>{order.etaMinutes === 0 ? "Arrived" : `${order.etaMinutes} min`}</strong></div></div>
    <div className="refresh-row"><span className="live-dot" aria-hidden="true" />{error ? "Refresh failed — showing last known status." : isValidating ? "Checking for updates…" : "Live updates enabled · refreshes every 5 seconds"}</div>
  </section>;
}
