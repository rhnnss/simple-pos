import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config })
    const { id } = params

    const order = await payload.findByID({
      collection: 'orders',
      id,
      populate: ['customer', 'items.product', 'tenant'],
    })

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payload = await getPayload({ config })
    const { id } = params
    const body = await request.json()

    const { status, paymentMethod, receiptSent, notes } = body

    const updateData: any = {}

    if (status) updateData.status = status
    if (paymentMethod) updateData.paymentMethod = paymentMethod
    if (notes !== undefined) updateData.notes = notes
    if (receiptSent !== undefined) {
      updateData.receiptSent = receiptSent
      if (receiptSent) {
        updateData.receiptSentAt = new Date()
      }
    }

    const order = await payload.update({
      collection: 'orders',
      id,
      data: updateData,
    })

    const populatedOrder = await payload.findByID({
      collection: 'orders',
      id: order.id,
      populate: ['customer', 'items.product'],
    })

    return NextResponse.json({
      success: true,
      data: populatedOrder,
      message: 'Order updated successfully',
    })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}