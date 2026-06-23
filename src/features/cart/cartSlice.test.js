import { describe, it, expect, beforeEach } from 'vitest';
import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from './cartSlice';

describe('cartSlice reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
    };
  });

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart with new item', () => {
    const product = { id: 1, title: 'Test Product', price: 100 };
    const actual = cartReducer(initialState, addToCart(product));
    expect(actual.items.length).toBe(1);
    expect(actual.items[0].quantity).toBe(1);
    expect(actual.totalItems).toBe(1);
    expect(actual.totalPrice).toBe(100);
  });

  it('should handle addToCart with existing item', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, quantity: 1 }],
      totalItems: 1,
      totalPrice: 100,
    };
    const product = { id: 1, title: 'Test Product', price: 100 };
    const actual = cartReducer(stateWithItem, addToCart(product));
    expect(actual.items.length).toBe(1);
    expect(actual.items[0].quantity).toBe(2);
    expect(actual.totalItems).toBe(2);
    expect(actual.totalPrice).toBe(200);
  });

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, quantity: 2 }],
      totalItems: 2,
      totalPrice: 200,
    };
    const actual = cartReducer(stateWithItem, removeFromCart(1));
    expect(actual.items.length).toBe(0);
    expect(actual.totalItems).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });

  it('should handle updateQuantity', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, quantity: 1 }],
      totalItems: 1,
      totalPrice: 100,
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 3 }));
    expect(actual.items[0].quantity).toBe(3);
    expect(actual.totalItems).toBe(3);
    expect(actual.totalPrice).toBe(300);
  });

  it('should remove item on updateQuantity to 0', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, quantity: 1 }],
      totalItems: 1,
      totalPrice: 100,
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 0 }));
    expect(actual.items.length).toBe(0);
    expect(actual.totalItems).toBe(0);
    expect(actual.totalPrice).toBe(0);
  });

  it('should handle clearCart', () => {
    const stateWithItem = {
      items: [{ id: 1, title: 'Test Product', price: 100, quantity: 2 }],
      totalItems: 2,
      totalPrice: 200,
    };
    const actual = cartReducer(stateWithItem, clearCart());
    expect(actual).toEqual(initialState);
  });
});
