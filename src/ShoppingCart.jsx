import React, { useState } from 'react';

/**
 * Updates item quantity by delta.
 *
 * NOTE (ODIN Screen-Recording Task):
 * Target Bug: Allows quantity to become zero or negative when decrementing.
 * Fix should ensure quantity cannot be reduced below 1.
 *
 * @param {number} currentQuantity
 * @param {number} delta
 * @returns {number}
 */
export function updateQuantity(currentQuantity, delta) {
  // BUG: Intentionally allows quantity to drop below 1 (0, -1, -2, etc.)
  return currentQuantity + delta;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 'prod-1',
    name: 'Wireless Headphones',
    price: 25.0,
    description: 'High-fidelity audio with noise cancellation',
  };

  const handleIncrement = () => {
    setQuantity((prev) => updateQuantity(prev, 1));
  };

  const handleDecrement = () => {
    setQuantity((prev) => updateQuantity(prev, -1));
  };

  const subtotal = quantity * product.price;

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h1>Shopping Cart</h1>
      </header>

      <div className="cart-item">
        <div className="item-details">
          <h2 className="item-name" data-testid="product-name">
            {product.name}
          </h2>
          <p className="item-description">{product.description}</p>
          <p className="item-price" data-testid="product-price">
            Unit Price: {formatCurrency(product.price)}
          </p>
        </div>

        <div className="quantity-controls">
          <button
            type="button"
            className="quantity-btn"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
            data-testid="decrement-btn"
          >
            -
          </button>
          <span className="quantity-value" data-testid="quantity-value">
            {quantity}
          </span>
          <button
            type="button"
            className="quantity-btn"
            onClick={handleIncrement}
            aria-label="Increase quantity"
            data-testid="increment-btn"
          >
            +
          </button>
        </div>

        <div className="item-subtotal">
          <span className="subtotal-label">Subtotal:</span>
          <span className="subtotal-value" data-testid="subtotal-value">
            {formatCurrency(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
