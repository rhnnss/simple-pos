import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Product Management',
  },
  access: {
    // Tenant hanya bisa melihat kategori mereka sendiri
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
      label: 'Nama Kategori',
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
      label: 'Deskripsi',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Warna (Hex)',
      admin: {
        description: 'Warna untuk chip kategori, contoh: #FF5733',
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
