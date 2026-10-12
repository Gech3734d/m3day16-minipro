import { Suspense } from "react";
import OrderStatus from "@/components/OrderStatus";
import MenuExplorer from "@/components/MenuExplorer";
import { getOrder } from "@/lib/data";

export const dynamic = "force-dynamic";

function MenuFallback() {
  return <section className="panel"><h2>Explore the menu</h2><p className="muted">Preparing the menu…</p></section>;
}

export default async function HomePage() {
  // Order is resolved on the server so first paint contains useful status, not a spinner.
  const initialOrder = getOrder("AE-2048");
  return <main className="page-shell">
    <header className="site-header"><a href="#home" className="brand" aria-label="Addis Eats home"><span className="brand-mark">A</span><span>Addis<span className="brand-accent">Eats</span></span></a><nav className="top-nav" aria-label="Main navigation"><a href="#order">Track order</a><a href="#menu-title">Explore menu</a><a className="cart-link" href="#menu-title">Your order <span>2</span></a></nav></header>
    <section className="hero" id="home"><div className="hero-content"><span className="hero-tag"><span className="live-dot" /> YOUR CITY, YOUR FLAVORS</span><h1>Good food.<br /><em>Good mood.</em></h1><p>From Addis kitchens to your doorstep. Discover the tastes you love, made fresh and delivered with care.</p><a className="hero-cta" href="#menu-title">Find your next favorite <span>↘</span></a><div className="hero-social-proof"><div className="avatar-stack"><span>👩🏽</span><span>👨🏾</span><span>👩🏾</span></div><p><strong>2,400+</strong> happy food lovers</p><span className="rating">★★★★★ <small>4.9/5</small></span></div></div><div className="hero-art" aria-label="Illustration of Ethiopian food"><div className="sun-shape"/><div className="plate"><div className="plate-injera"><div className="stew stew-one"/><div className="stew stew-two"/><div className="stew stew-three"/><div className="greens"/></div></div><span className="floating-note note-one">Freshly made ✨</span><span className="floating-note note-two">100% local ❤️</span><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✦</span></div></section>
    <div className="feature-strip"><div><span className="feature-icon">♧</span><span><strong>Fresh, always</strong><small>Made when you order</small></span></div><div><span className="feature-icon">⌁</span><span><strong>Fast delivery</strong><small>At your door, on time</small></span></div><div><span className="feature-icon">♡</span><span><strong>Local favorites</strong><small>From kitchens near you</small></span></div></div>
    <div className="content-grid"><div id="order"><OrderStatus initialOrder={initialOrder} /></div><Suspense fallback={<MenuFallback />}><MenuExplorer /></Suspense></div>
    <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">A</span><span>Addis<span className="brand-accent">Eats</span></span></a><p>Made with care in Addis Ababa. © 2026 Addis Eats.</p><a href="#home">Back to top ↑</a></footer>
  </main>;
}
