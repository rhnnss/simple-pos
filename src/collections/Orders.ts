import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
    group: 'Order Management',
    defaultColumns: ['orderNumber', 'customer', 'total', 'status', 'createdAt'],
  },
  access: {
    create: ({ req: { user } }) => !!user,
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.id,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      label: 'Tenant',
      admin: {
        condition: (data, siblingData, { user }) => user?.role === 'super-admin',
      },
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      label: 'Nomor Pesanan',
      unique: true,
      admin: {
        description: 'Nomor unik pesanan, contoh: #903433',
      },
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'customers',
      required: true,
      label: 'Customer',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Item Pesanan',
      minRows: 1,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
          label: 'Produk',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          label: 'Jumlah',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Harga Satuan',
          admin: {
            description: 'Harga pada saat pemesanan',
          },
        },
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          label: 'Subtotal',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Catatan Item',
          admin: {
            description: 'Catatan khusus untuk item ini',
          },
        },
      ],
    },
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      label: 'Subtotal',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'tax',
      type: 'number',
      defaultValue: 0,
      label: 'Pajak',
    },
    {
      name: 'discount',
      type: 'number',
      defaultValue: 0,
      label: 'Diskon',
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      label: 'Total',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      enumName: 'enum_orders_status',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Sent',
          value: 'sent',
        },
        {
          label: 'Pending Payment',
          value: 'pending-payment',
        },
        {
          label: 'Paid',
          value: 'paid',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Metode Pembayaran',
      enumName: 'enum_orders_payment_method',
      options: [
        {
          label: 'Transfer Bank',
          value: 'bank-transfer',
        },
        {
          label: 'QRIS',
          value: 'qris',
        },
        {
          label: 'Cash',
          value: 'cash',
        },
        {
          label: 'E-Wallet',
          value: 'e-wallet',
        },
      ],
    },
    {
      name: 'receiptSent',
      type: 'checkbox',
      defaultValue: false,
      label: 'Receipt Terkirim',
    },
    {
      name: 'receiptSentAt',
      type: 'date',
      label: 'Waktu Receipt Terkirim',
      admin: {
        condition: (data) => data.receiptSent,
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Catatan Pesanan',
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Calculate subtotal from items
        if (data.items) {
          data.subtotal = data.items.reduce((sum: number, item: any) => {
            item.subtotal = item.quantity * item.price
            return sum + item.subtotal
          }, 0)
        }

        // Calculate total
        data.total = (data.subtotal || 0) + (data.tax || 0) - (data.discount || 0)

        // Generate order number if not exists
        if (!data.orderNumber) {
          data.orderNumber = `#${Math.floor(Math.random() * 1000000)}`
        }

        return data
      },
    ],
  },
}
