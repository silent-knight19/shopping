import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
  it('increases the quantity', async () => {
    const user = userEvent.setup();
    render(<ShoppingCart />);

    const quantityDisplay = screen.getByTestId('quantity-value');
    const incrementBtn = screen.getByTestId('increment-btn');

    expect(quantityDisplay).toHaveTextContent('1');
    await user.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('2');
  });

  it('decreases the quantity normally', async () => {
    const user = userEvent.setup();
    render(<ShoppingCart />);

    const quantityDisplay = screen.getByTestId('quantity-value');
    const incrementBtn = screen.getByTestId('increment-btn');
    const decrementBtn = screen.getByTestId('decrement-btn');

    // Increase from 1 to 2 first
    await user.click(incrementBtn);
    expect(quantityDisplay).toHaveTextContent('2');

    // Decrease from 2 back to 1
    await user.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('prevents the quantity from going below 1 after the fix', async () => {
    const user = userEvent.setup();
    render(<ShoppingCart />);

    const quantityDisplay = screen.getByTestId('quantity-value');
    const decrementBtn = screen.getByTestId('decrement-btn');

    expect(quantityDisplay).toHaveTextContent('1');

    // In the buggy starting state, clicking decrement at quantity 1 decreases it to 0.
    // After fixing updateQuantity (or the decrement handler), it will stay at 1.
    await user.click(decrementBtn);
    expect(quantityDisplay).toHaveTextContent('1');
  });

  it('calculates the subtotal correctly', async () => {
    const user = userEvent.setup();
    render(<ShoppingCart />);

    const subtotalDisplay = screen.getByTestId('subtotal-value');
    const incrementBtn = screen.getByTestId('increment-btn');

    // Initial subtotal: 1 * $25.00 = $25.00
    expect(subtotalDisplay).toHaveTextContent('$25.00');

    // Increment to 3 items
    await user.click(incrementBtn);
    await user.click(incrementBtn);

    // Expected subtotal: 3 * $25.00 = $75.00
    expect(subtotalDisplay).toHaveTextContent('$75.00');
  });
});
