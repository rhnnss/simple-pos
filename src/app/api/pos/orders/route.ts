import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const tenantId = searchParams.get('tenantId')
    const status = searchParams.get('status')
    const customerId = searchParams.get('customerId')
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    let where: any = {
      tenant: {
        equals: tenantId,
      },
    }

    if (status) {
      where.status = {
        equals: status,
      }
    }

    if (customerId) {
      where.customer = {
        equals: customerId,
      }
    }

    const orders = await payload.find({
      collection: 'orders',
      where,
      populate: ['customer', 'items.product'],
      limit: 50,
      sort: '-createdAt',
    })

    return NextResponse.json({
      success: true,
      data: orders.docs,
      total: orders.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    
    const { tenantId, customerId, items, notes, tax = 0, discount = 0 } = body
    
    if (!tenantId || !customerId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Tenant ID, customer ID, and items are required' },
        { status: 400 }
      )
    }

    // Validate and get product details
    const validatedItems = []
    let subtotal = 0

    for (const item of items) {
      const product = await payload.findByID({
        collection: 'products',
        id: item.productId,
      })

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${item.productId} not found` },
          { status: 400 }
        )
      }

      const itemSubtotal = item.quantity * product.price
      subtotal += itemSubtotal

      validatedItems.push({
        product: product.id,
        quantity: item.quantity,
        price: product.price,
        subtotal: itemSubtotal,
        notes: item.notes || '',
      })

      // Update stock if tracking is enabled
      if (product.trackStock) {
        await payload.update({
          collection: 'products',
          id: product.id,
          data: {
            stock: product.stock - item.quantity,
          },
        })
      }
    }

    const total = subtotal + tax - discount

    // Generate order number
    const orderNumber = `#${Date.now().toString().slice(-6)}`

    const order = await payload.create({
      collection: 'orders',
      data: {
        tenant: tenantId,
        orderNumber,
        customer: customerId,
        items: validatedItems,
        subtotal,
        tax,
        discount,
        total,
        status: 'pending',
        notes,
      },
    })

    // Update customer stats
    const customer = await payload.findByID({
      collection: 'customers',
      id: customerId,
    })

    await payload.update({
      collection: 'customers',
      id: customerId,
      data: {
        totalOrders: (customer.totalOrders || 0) + 1,
        totalSpent: (customer.totalSpent || 0) + total,
        lastOrderDate: new Date(),
      },
    })

    // Populate the order with related data
    const populatedOrder = await payload.findByID({
      collection: 'orders',
      id: order.id,
      populate: ['customer', 'items.product'],
    })

    return NextResponse.json({
      success: true,
      data: populatedOrder,
      message: 'Order created successfully',
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}