import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Alt Text",
      admin: {
        description: "Deskripsi gambar untuk aksesibilitas dan SEO",
      },
    },
    {
      name: "caption",
      type: "text",
      label: "Caption",
      admin: {
        description: "Caption opsional untuk gambar",
      },
    },
    {
      name: "seoTitle",
      type: "text",
      label: "SEO Title",
      admin: {
        description: "Judul khusus untuk SEO (opsional)",
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      label: "SEO Description",
      admin: {
        description: "Deskripsi khusus untuk SEO (opsional)",
      },
    },
  ],
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*", "application/pdf"],
  },
  admin: {
    useAsTitle: "alt",
    group: "Content",
  },
};
