import type { CollectionConfig } from 'payload'

export const PaymentMethods: CollectionConfig = {
  slug: 'payment-methods',
  admin: {
    useAsTitle: 'name',
    group: 'Settings',
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nama Metode Pembayaran',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      enumName: 'enum_payment_methods_type',
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
          label: 'E-Wallet',
          value: 'e-wallet',
        },
        {
          label: 'Cash',
          value: 'cash',
        },
      ],
    },
    {
      name: 'accountNumber',
      type: 'text',
      label: 'Nomor Rekening/Akun',
      admin: {
        condition: (data) => data.type !== 'cash',
      },
    },
    {
      name: 'accountName',
      type: 'text',
      label: 'Nama Pemilik Rekening',
      admin: {
        condition: (data) => data.type !== 'cash',
      },
    },
    {
      name: 'bankName',
      type: 'text',
      label: 'Nama Bank',
      admin: {
        condition: (data) => data.type === 'bank-transfer',
      },
    },
    {
      name: 'qrCode',
      type: 'upload',
      relationTo: 'media',
      label: 'QR Code',
      admin: {
        condition: (data) => data.type === 'qris',
      },
    },
    {
      name: 'instructions',
      type: 'richText',
      label: 'Instruksi Pembayaran',
      admin: {
        description: 'Instruksi detail untuk customer',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Status Aktif',
    },
  ],
}