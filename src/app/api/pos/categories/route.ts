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

    const categories = await payload.find({
      collection: 'categories',
      where: {
        tenant: {
          equals: tenantId,
        },
        isActive: {
          equals: true,
        },
      },
      sort: 'name',
    })

    return NextResponse.json({
      success: true,
      data: categories.docs,
      total: categories.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}