export type OrderStatus = {
  id: string;
  customer: string;
  dish: string;
  status: "Preparing" | "On the way" | "Delivered";
  etaMinutes: number;
  updatedAt: string;
};

export type Dish = { id: number; name: string; category: string; description: string; price: number; emoji: string };

export const dishes: Dish[] = [
  { id: 1, name: "Doro Wot", category: "Ethiopian", description: "Slow-cooked chicken stew with berbere and egg.", price: 420, emoji: "🍗" },
  { id: 2, name: "Beyaynetu", category: "Vegetarian", description: "A colorful platter of seasonal fasting dishes.", price: 310, emoji: "🥗" },
  { id: 3, name: "Tibs", category: "Ethiopian", description: "Sizzling beef with onions, rosemary and peppers.", price: 390, emoji: "🥘" },
  { id: 4, name: "Shiro", category: "Vegetarian", description: "Comforting chickpea stew served with injera.", price: 220, emoji: "🍲" },
  { id: 5, name: "Kitfo", category: "Ethiopian", description: "Seasoned minced beef with ayib and greens.", price: 450, emoji: "🥩" },
  { id: 6, name: "Fir-Fir", category: "Breakfast", description: "Torn injera tossed in a tangy berbere sauce.", price: 240, emoji: "🍳" },
  { id: 7, name: "Chechebsa", category: "Breakfast", description: "Warm flatbread pieces with spiced butter.", price: 190, emoji: "🫓" },
  { id: 8, name: "Lentil Sambusa", category: "Snacks", description: "Crispy pastry filled with seasoned lentils.", price: 90, emoji: "🥟" },
  { id: 9, name: "Fresh Avocado Juice", category: "Drinks", description: "Creamy avocado blended fresh to order.", price: 130, emoji: "🥑" },
  { id: 10, name: "Macchiato", category: "Drinks", description: "A classic Ethiopian espresso with steamed milk.", price: 75, emoji: "☕" },
  { id: 11, name: "Dulet", category: "Ethiopian", description: "Traditional finely chopped meat with spices.", price: 360, emoji: "🍛" },
  { id: 12, name: "Pasta Sugo", category: "Pasta", description: "Pasta with a bright tomato and herb sauce.", price: 280, emoji: "🍝" }
];

export function getOrder(id: string): OrderStatus {
  const stage = Math.floor(Date.now() / 30000) % 3;
  const statuses: OrderStatus["status"][] = ["Preparing", "On the way", "Delivered"];
  return {
    id,
    customer: "Mekdes",
    dish: "Doro Wot + Injera",
    status: statuses[stage],
    etaMinutes: stage === 0 ? 25 : stage === 1 ? 8 : 0,
    updatedAt: new Date().toISOString()
  };
}
