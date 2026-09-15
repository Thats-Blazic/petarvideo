/** Flat rate: every project is billed purely by the length of the final animation. */
export const PRICE_PER_SECOND = 7

/** Total price, in euros, for a given animation length. */
export function priceForSeconds(seconds: number) {
  return Math.round(seconds * PRICE_PER_SECOND)
}

/** Formats the price for a given duration as a euro string, e.g. "€105". */
export function formatPrice(seconds: number) {
  return `€${priceForSeconds(seconds)}`
}
