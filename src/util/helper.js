export const $ = num => '$' + parseFloat(Math.round(num * 100) / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
