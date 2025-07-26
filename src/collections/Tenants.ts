import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  admin: {
    useAsTitle: "businessName",
    group: "User Management",
  },
  access: {
    // Hanya super admin yang bisa mengakses
    admin: ({ req: { user } }) => user?.role === "super-admin",
    create: ({ req: { user } }) => user?.role === "super-admin",
    read: ({ req: { user } }) => user?.role === "super-admin",
    update: ({ req: { user } }) => user?.role === "super-admin",
    delete: ({ req: { user } }) => user?.role === "super-admin",
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      label: "User Account",
      admin: {
        description: "Link ke user account tenant",
      },
    },
    {
      name: "businessName",
      type: "text",
      required: true,
      label: "Nama Bisnis",
    },
    {
      name: "businessType",
      type: "select",
      required: true,
      defaultValue: "bouquet",
      enumName: "enum_tenants_business_type",
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
    },
    {
      name: "subscriptionPlan",
      type: "select",
      defaultValue: "basic",
      enumName: "enum_tenants_subscription_plan",
      options: [
        {
          label: "Basic",
          value: "basic",
        },
        {
          label: "Premium",
          value: "premium",
        },
        {
          label: "Enterprise",
          value: "enterprise",
        },
      ],
    },
    {
      name: "monthlyTransactionLimit",
      type: "number",
      defaultValue: 100,
      label: "Batas Transaksi Bulanan",
    },
    {
      name: "currentMonthTransactions",
      type: "number",
      defaultValue: 0,
      label: "Transaksi Bulan Ini",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Status Aktif",
    },
    {
      name: "registrationDate",
      type: "date",
      defaultValue: () => new Date(),
      label: "Tanggal Registrasi",
      admin: {
        readOnly: true,
      },
    },
  ],
};
