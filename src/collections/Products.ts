import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    group: 'Product Management',
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
      label: 'Nama Produk',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly version of the name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Produk',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Harga',
      min: 0,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Kategori',
    },
    {
      name: 'sku',
      type: 'text',
      label: 'SKU',
      admin: {
        description: 'Stock Keeping Unit - kode unik produk',
      },
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Stok',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'trackStock',
      type: 'checkbox',
      defaultValue: false,
      label: 'Lacak Stok',
      admin: {
        description: 'Aktifkan untuk melacak stok produk',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Status Aktif',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
