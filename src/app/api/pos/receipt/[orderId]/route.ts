import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { generateReceiptText, generateWhatsAppMessage, generateEmailSubject, generateEmailBody } from '@/lib/receipt-generator'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const payload = await getPayload({ config })
    const { orderId } = params
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'text'

    const order = await payload.findByID({
      collection: 'orders',
      id: orderId,
      populate: ['customer', 'items.product', 'tenant'],
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    const receiptData = {
      orderNumber: order.orderNumber,
      date: order.createdAt,
      businessName: order.tenant.businessName,
      customer: {
        name: order.customer.name,
        whatsappNumber: order.customer.whatsappNumber,
      },
      items: order.items.map((item: any) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
        notes: item.notes,
      })),
      subtotal: order.subtotal,
      tax: order.tax || 0,
      discount: order.discount || 0,
      total: order.total,
      notes: order.notes,
    }

    let response: any = {
      success: true,
      data: {
        order: order,
        receipt: receiptData,
      },
    }

    switch (format) {
      case 'whatsapp':
        response.data.message = generateWhatsAppMessage(receiptData)
        response.data.whatsappUrl = `https://wa.me/${order.customer.whatsappNumber.replace('+', '')}?text=${encodeURIComponent(generateWhatsAppMessage(receiptData))}`
        break
      
      case 'email':
        response.data.subject = generateEmailSubject(receiptData)
        response.data.body = generateEmailBody(receiptData)
        response.data.mailtoUrl = `mailto:${order.customer.email || ''}?subject=${encodeURIComponent(generateEmailSubject(receiptData))}&body=${encodeURIComponent(generateEmailBody(receiptData))}`
        break
      
      case 'text':
      default:
        response.data.text = generateReceiptText(receiptData)
        break
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error generating receipt:', error)
    return NextResponse.json(
      { error: 'Failed to generate receipt' },
      { status: 500 }
    )
  }
}