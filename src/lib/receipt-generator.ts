export interface ReceiptData {
  orderNumber: string
  date: string
  businessName: string
  customer: {
    name?: string
    whatsappNumber: string
  }
  items: Array<{
    name: string
    quantity: number
    price: number
    subtotal: number
    notes?: string
  }>
  subtotal: number
  tax: number
  discount: number
  total: number
  notes?: string
}

export function generateReceiptText(data: ReceiptData): string {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  let receipt = `RECEIPT - ${data.businessName}\n`
  receipt += `Order ID: ${data.orderNumber}\n`
  receipt += `Date: ${formatDate(data.date)}\n`
  
  if (data.customer.name) {
    receipt += `Customer: ${data.customer.name}\n`
  }
  receipt += `WhatsApp: ${data.customer.whatsappNumber}\n\n`

  receipt += `ITEMS:\n`
  data.items.forEach((item) => {
    receipt += `• ${item.name}\n`
    receipt += `  ${item.quantity} × ${formatCurrency(item.price)} = ${formatCurrency(item.subtotal)}\n`
    if (item.notes) {
      receipt += `  Note: ${item.notes}\n`
    }
  })

  receipt += `\n`
  receipt += `Subtotal: ${formatCurrency(data.subtotal)}\n`
  
  if (data.tax > 0) {
    receipt += `Tax: ${formatCurrency(data.tax)}\n`
  }
  
  if (data.discount > 0) {
    receipt += `Discount: -${formatCurrency(data.discount)}\n`
  }
  
  receipt += `TOTAL: ${formatCurrency(data.total)}\n\n`
  
  if (data.notes) {
    receipt += `Notes: ${data.notes}\n\n`
  }
  
  receipt += `Thank you for your business!\n`
  receipt += `${data.businessName}`

  return receipt
}

export function generateWhatsAppMessage(data: ReceiptData): string {
  return generateReceiptText(data)
}

export function generateEmailSubject(data: ReceiptData): string {
  return `Receipt ${data.orderNumber} - ${data.businessName}`
}

export function generateEmailBody(data: ReceiptData): string {
  const receiptText = generateReceiptText(data)
  
  return `
Dear ${data.customer.name || 'Customer'},

Thank you for your order! Please find your receipt below:

${receiptText}

If you have any questions about your order, please don't hesitate to contact us.

Best regards,
${data.businessName}
  `.trim()
}