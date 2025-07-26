import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    group: "User Management",
  },
  auth: true,
  access: {
    // Hanya super admin yang bisa mengakses admin panel
    admin: ({ req: { user } }) => {
      return user?.role === "super-admin";
    },
    create: ({ req: { user } }) => {
      return user?.role === "super-admin";
    },
    read: ({ req: { user } }) => {
      if (user?.role === "super-admin") return true;
      // Tenant hanya bisa melihat data mereka sendiri
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    update: ({ req: { user } }) => {
      if (user?.role === "super-admin") return true;
      // Tenant hanya bisa update data mereka sendiri
      return {
        id: {
          equals: user?.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      return user?.role === "super-admin";
    },
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "tenant",
      enumName: "enum_users_role",
      options: [
        {
          label: "Super Admin",
          value: "super-admin",
        },
        {
          label: "Tenant",
          value: "tenant",
        },
      ],
      admin: {
        description:
          "Super Admin memiliki akses penuh ke admin panel, Tenant hanya bisa menggunakan aplikasi POS",
      },
    },
    {
      name: "businessName",
      type: "text",
      required: true,
      label: "Nama Bisnis",
      admin: {
        condition: (data) => data.role === "tenant",
      },
    },
    {
      name: "businessType",
      type: "select",
      label: "Jenis Bisnis",
      defaultValue: "bouquet",
      enumName: "enum_users_business_type",
      options: [
        {
          label: "Bouquet Shop",
          value: "bouquet",
        },
        {
          label: "Food & Beverage",
          value: "fnb",
        },
        {
          label: "Retail",
          value: "retail",
        },
        {
          label: "Service",
          value: "service",
        },
      ],
      admin: {
        condition: (data) => data.role === "tenant",
      },
    },
    {
      name: "whatsappNumber",
      type: "text",
      label: "Nomor WhatsApp Bisnis",
      admin: {
        condition: (data) => data.role === "tenant",
        description: "Nomor WhatsApp untuk mengirim receipt ke customer",
      },
    },
    {
      name: "address",
      type: "textarea",
      label: "Alamat Bisnis",
      admin: {
        condition: (data) => data.role === "tenant",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Status Aktif",
      admin: {
        description: "Nonaktifkan untuk menangguhkan akses tenant",
      },
    },
    // Email added by default by auth: true
  ],
};
