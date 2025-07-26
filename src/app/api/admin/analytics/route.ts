import { getPayload } from 'payload'
import config from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    
    // Verify user is super admin
    const { user } = await payload.auth({ headers: request.headers })
    if (!user || user.role !== 'super-admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all data needed for analytics
    const [tenants, users, orders, customers] = await Promise.all([
      payload.find({
        collection: 'tenants',
        limit: 1000,
      }),
      payload.find({
        collection: 'users',
        limit: 1000,
      }),
      payload.find({
        collection: 'orders',
        limit: 1000,
        sort: '-createdAt',
      }),
      payload.find({
        collection: 'customers',
        limit: 1000,
      }),
    ])

    // Calculate analytics
    const totalRevenue = orders.docs.reduce((sum, order) => sum + (order.total || 0), 0)
    
    // Monthly revenue (current month)
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const monthlyRevenue = orders.docs
      .filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
      })
      .reduce((sum, order) => sum + (order.total || 0), 0)

    // Revenue by tenant
    const tenantRevenue: { [key: string]: number } = {}
    orders.docs.forEach(order => {
      if (order.customer?.tenant) {
        const tenantId = typeof order.customer.tenant === 'object' 
          ? order.customer.tenant.id 
          : order.customer.tenant
        tenantRevenue[tenantId] = (tenantRevenue[tenantId] || 0) + (order.total || 0)
      }
    })

    const topTenants = Object.entries(tenantRevenue)
      .map(([tenantId, revenue]) => {
        const tenant = tenants.docs.find(t => t.id === tenantId)
        return {
          id: tenantId,
          businessName: tenant?.businessName || 'Unknown',
          revenue,
          orderCount: orders.docs.filter(order => {
            const orderTenantId = typeof order.customer?.tenant === 'object' 
              ? order.customer.tenant.id 
              : order.customer?.tenant
            return orderTenantId === tenantId
          }).length
        }
      })
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    // Recent orders
    const recentOrders = orders.docs.slice(0, 20).map(order => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.customer,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt,
      tenant: order.customer?.tenant
    }))

    // Monthly growth
    const lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    const lastMonthRevenue = orders.docs
      .filter(order => {
        const orderDate = new Date(order.createdAt)
        return orderDate.getMonth() === lastMonth.getMonth() && 
               orderDate.getFullYear() === lastMonth.getFullYear()
      })
      .reduce((sum, order) => sum + (order.total || 0), 0)

    const revenueGrowth = lastMonthRevenue > 0 
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : 0

    const analytics = {
      overview: {
        totalTenants: tenants.totalDocs,
        totalUsers: users.totalDocs,
        totalOrders: orders.totalDocs,
        totalCustomers: customers.totalDocs,
        totalRevenue,
        monthlyRevenue,
        revenueGrowth,
        activeUsers: users.docs.filter(user => user.role === 'tenant').length,
      },
      topTenants,
      recentOrders,
      monthlyStats: {
        currentMonth: monthlyRevenue,
        lastMonth: lastMonthRevenue,
        growth: revenueGrowth,
      }
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' }, 
      { status: 500 }
    )
  }
}