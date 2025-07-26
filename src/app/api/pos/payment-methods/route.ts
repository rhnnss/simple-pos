import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const tenantId = searchParams.get('tenantId')
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    const paymentMethods = await payload.find({
      collection: 'payment-methods',
      where: {
        tenant: {
          equals: tenantId,
        },
        isActive: {
          equals: true,
        },
      },
      populate: ['qrCode'],
      sort: 'name',
    })

    return NextResponse.json({
      success: true,
      data: paymentMethods.docs,
      total: paymentMethods.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching payment methods:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment methods' },
      { status: 500 }
    )
  }
}