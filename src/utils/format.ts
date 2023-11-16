export const priceFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL',
})

export const dateFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  minimumIntegerDigits: 2,
})
