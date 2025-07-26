import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const tenantId = searchParams.get('tenantId')
    const whatsappNumber = searchParams.get('whatsappNumber')
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    let where: any = {
      tenant: {
        equals: tenantId,
      },
    }

    if (whatsappNumber) {
      where.whatsappNumber = {
        equals: whatsappNumber,
      }
    }

    const customers = await payload.find({
      collection: 'customers',
      where,
      limit: whatsappNumber ? 1 : 50,
      sort: '-lastOrderDate',
    })

    return NextResponse.json({
      success: true,
      data: customers.docs,
      total: customers.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()
    
    const { tenantId, whatsappNumber, name, email, address, notes } = body
    
    if (!tenantId || !whatsappNumber) {
      return NextResponse.json(
        { error: 'Tenant ID and WhatsApp number are required' },
        { status: 400 }
      )
    }

    // Check if customer already exists
    const existingCustomer = await payload.find({
      collection: 'customers',
      where: {
        tenant: {
          equals: tenantId,
        },
        whatsappNumber: {
          equals: whatsappNumber,
        },
      },
      limit: 1,
    })

    if (existingCustomer.docs.length > 0) {
      return NextResponse.json({
        success: true,
        data: existingCustomer.docs[0],
        message: 'Customer already exists',
      })
    }

    const customer = await payload.create({
      collection: 'customers',
      data: {
        tenant: tenantId,
        whatsappNumber,
        name,
        email,
        address,
        notes,
      },
    })

    return NextResponse.json({
      success: true,
      data: customer,
      message: 'Customer created successfully',
    })
  } catch (error) {
    console.error('Error creating customer:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}