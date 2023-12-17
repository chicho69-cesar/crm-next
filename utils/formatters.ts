export const priceFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: 'currency'
})
