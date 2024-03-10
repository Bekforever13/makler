export const formatPrice = (price) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const formatPhone = (phone) => phone.replace(/^(\+\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1$2 $3 $4 $5')
