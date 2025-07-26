import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const tenantId = searchParams.get('tenantId')
    
    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 })
    }

    let where: any = {
      tenant: {
        equals: tenantId,
      },
      isActive: {
        equals: true,
      },
    }

    if (category && category !== 'all') {
      where.category = {
        equals: category,
      }
    }

    if (search) {
      where.or = [
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          'tags.tag': {
            contains: search,
          },
        },
      ]
    }

    const products = await payload.find({
      collection: 'products',
      where,
      populate: ['category'],
      limit: 50,
      sort: 'name',
    })

    return NextResponse.json({
      success: true,
      data: products.docs,
      total: products.totalDocs,
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}