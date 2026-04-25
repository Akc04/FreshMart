import { Order } from '@/types';

// In-memory store (resets on server restart — fine for demo purposes)
const orders: Order[] = [];

export function getAllOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function createOrder(order: Order): Order {
  orders.push(order);
  return order;
}
