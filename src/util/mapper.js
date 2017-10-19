export const mapOrderToProduct = (order, products) => {
  if (!order.lineItems) return order
  order.lineItems.forEach(line => {
    if (!line.product) line.product = products.find(el => el.id === line.productId)
  })
  return order
}
