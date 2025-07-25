import type { CollectionConfig } from 'payload'

export const SeoConfig: CollectionConfig = {
  slug: 'seo-config',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    group: 'Settings',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Judul Situs',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Deskripsi Situs',
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Keywords',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Open Graph Image',
      admin: {
        description: 'Gambar yang akan ditampilkan saat konten dibagikan di media sosial (1200x630px)',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter Handle',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram Handle',
        },
      ],
    },
    {
      name: 'googleAnalyticsID',
      type: 'text',
      label: 'Google Analytics ID',
    },
    {
      name: 'metaRobots',
      type: 'select',
      label: 'Meta Robots',
      defaultValue: 'index, follow',
      options: [
        {
          label: 'Index, Follow',
          value: 'index, follow',
        },
        {
          label: 'Index, No Follow',
          value: 'index, nofollow',
        },
        {
          label: 'No Index, Follow',
          value: 'noindex, follow',
        },
        {
          label: 'No Index, No Follow',
          value: 'noindex, nofollow',
        },
      ],
    },
  ],
  timestamps: true,
}