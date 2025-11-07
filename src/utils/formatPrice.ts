/**
 * Format ETH price for display
 * Uses appropriate decimal places based on the value size
 */
export function formatEthPrice(price: number): string {
  // For very small amounts (< 0.001), show up to 6 decimal places
  if (price < 0.001) {
    return price.toFixed(6);
  }

  // For small amounts (< 1), show up to 5 decimal places
  if (price < 1) {
    return price.toFixed(5);
  }

  // For larger amounts, show 2 decimal places
  return price.toFixed(2);
}

/**
 * Format price with ETH suffix
 */
export function formatEthPriceWithSuffix(price: number): string {
  return `${formatEthPrice(price)} ETH`;
}
