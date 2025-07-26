import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'whatsappNumber',
    group: 'Customer Management',
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
      name: 'whatsappNumber',
      type: 'text',
      required: true,
      label: 'Nomor WhatsApp',
      // Hapus unique: true karena akan membuat constraint global
      // unique: true,
      admin: {
        description: 'Nomor WhatsApp customer (dengan kode negara, contoh: +6281234567890)',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Nama Customer',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Alamat',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Catatan',
      admin: {
        description: 'Catatan khusus tentang customer',
      },
    },
    {
      name: 'totalOrders',
      type: 'number',
      defaultValue: 0,
      label: 'Total Pesanan',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'totalSpent',
      type: 'number',
      defaultValue: 0,
      label: 'Total Belanja',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'lastOrderDate',
      type: 'date',
      label: 'Tanggal Pesanan Terakhir',
      admin: {
        readOnly: true,
      },
    },
  ],
}
