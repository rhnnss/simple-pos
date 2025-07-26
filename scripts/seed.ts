import dotenv from "dotenv";
import { getPayload } from "payload";
import config from "../src/payload.config";

// Load environment variables
dotenv.config();

const seed = async (): Promise<void> => {
  const payload = await getPayload({ config });

  try {
    // Create Super Admin dengan context yang bypass validasi
    const superAdmin = await payload.create({
      collection: "users",
      data: {
        email: "admin@simplepos.com",
        password: "f0TpZunCIR996gr",
        role: "super-admin",
      },
      context: {
        skipValidation: true,
      },
      overrideAccess: true,
      disableVerificationEmail: true,
    });

    console.log("✅ Super Admin created:", superAdmin.email);

    // Create Bouquet Shop Tenant
    const bouquetTenant = await payload.create({
      collection: "users",
      data: {
        email: "bouquet@example.com",
        password: "bouquet123",
        role: "tenant",
        businessName: "Bella Bouquet Shop",
        businessType: "bouquet",
        whatsappNumber: "+6281234567890",
        address: "Jl. Mawar No. 123, Jakarta Selatan",
        isActive: true,
      },
      context: {
        skipValidation: true,
      },
      overrideAccess: true,
      disableVerificationEmail: true,
    });

    console.log("✅ Bouquet Tenant created:", bouquetTenant.email);

    // Create Tenant record
    await payload.create({
      collection: "tenants",
      data: {
        user: bouquetTenant.id,
        businessName: "Bella Bouquet Shop",
        businessType: "bouquet",
        subscriptionPlan: "basic",
        monthlyTransactionLimit: 100,
        currentMonthTransactions: 0,
        isActive: true,
        registrationDate: new Date().toISOString(),
      },
    });

    // Create Categories for Bouquet Shop
    const categories = [
      {
        name: "Bouquet Bunga",
        slug: "bouquet-bunga",
        description: "Rangkaian bunga segar untuk berbagai acara",
        color: "#FF6B9D",
      },
      {
        name: "Bunga Papan",
        slug: "bunga-papan",
        description: "Bunga papan untuk ucapan dan duka cita",
        color: "#4ECDC4",
      },
      {
        name: "Bunga Meja",
        slug: "bunga-meja",
        description: "Arrangement bunga untuk dekorasi meja",
        color: "#45B7D1",
      },
      {
        name: "Aksesoris",
        slug: "aksesoris",
        description: "Aksesoris pendukung bouquet dan arrangement",
        color: "#96CEB4",
      },
    ];

    const createdCategories = [];
    for (const category of categories) {
      const created = await payload.create({
        collection: "categories",
        data: {
          ...category,
          tenant: bouquetTenant.id,
          isActive: true,
        },
      });
      createdCategories.push(created);
      console.log(`✅ Category created: ${created.name}`);
    }

    // Create Products for Bouquet Shop
    const products = [
      {
        name: "Bouquet Mawar Merah",
        slug: "bouquet-mawar-merah",
        description: "Bouquet mawar merah segar dengan 12 tangkai",
        price: 150000,
        category: createdCategories[0].id, // Bouquet Bunga
        sku: "BMM-001",
        stock: 20,
        trackStock: true,
        tags: [
          { tag: "romantis" },
          { tag: "valentine" },
          { tag: "anniversary" },
        ],
      },
      {
        name: "Bouquet Mawar Putih",
        slug: "bouquet-mawar-putih",
        description: "Bouquet mawar putih elegan dengan 12 tangkai",
        price: 140000,
        category: createdCategories[0].id,
        sku: "BMP-001",
        stock: 15,
        trackStock: true,
        tags: [{ tag: "wedding" }, { tag: "elegant" }, { tag: "pure" }],
      },
      {
        name: "Bouquet Mixed Flowers",
        slug: "bouquet-mixed-flowers",
        description: "Bouquet campuran bunga segar berbagai warna",
        price: 120000,
        category: createdCategories[0].id,
        sku: "BMF-001",
        stock: 25,
        trackStock: true,
        tags: [
          { tag: "colorful" },
          { tag: "birthday" },
          { tag: "celebration" },
        ],
      },
      {
        name: "Bunga Papan Congratulations",
        slug: "bunga-papan-congratulations",
        description: "Bunga papan untuk ucapan selamat",
        price: 350000,
        category: createdCategories[1].id, // Bunga Papan
        sku: "BPC-001",
        stock: 5,
        trackStock: true,
        tags: [
          { tag: "congratulations" },
          { tag: "opening" },
          { tag: "achievement" },
        ],
      },
      {
        name: "Bunga Papan Duka Cita",
        slug: "bunga-papan-duka-cita",
        description: "Bunga papan untuk belasungkawa",
        price: 400000,
        category: createdCategories[1].id,
        sku: "BPD-001",
        stock: 3,
        trackStock: true,
        tags: [{ tag: "condolence" }, { tag: "sympathy" }, { tag: "funeral" }],
      },
      {
        name: "Table Arrangement Roses",
        slug: "table-arrangement-roses",
        description: "Arrangement mawar untuk dekorasi meja",
        price: 85000,
        category: createdCategories[2].id, // Bunga Meja
        sku: "TAR-001",
        stock: 12,
        trackStock: true,
        tags: [{ tag: "decoration" }, { tag: "table" }, { tag: "roses" }],
      },
      {
        name: "Mini Bouquet",
        slug: "mini-bouquet",
        description: "Bouquet mini untuk hadiah kecil",
        price: 45000,
        category: createdCategories[0].id,
        sku: "MB-001",
        stock: 30,
        trackStock: true,
        tags: [{ tag: "mini" }, { tag: "gift" }, { tag: "affordable" }],
      },
      {
        name: "Ribbon Premium",
        slug: "ribbon-premium",
        description: "Pita premium untuk bouquet",
        price: 15000,
        category: createdCategories[3].id, // Aksesoris
        sku: "RP-001",
        stock: 50,
        trackStock: true,
        tags: [{ tag: "ribbon" }, { tag: "accessory" }, { tag: "premium" }],
      },
      {
        name: "Wrapping Paper Elegant",
        slug: "wrapping-paper-elegant",
        description: "Kertas pembungkus elegan",
        price: 8000,
        category: createdCategories[3].id,
        sku: "WPE-001",
        stock: 100,
        trackStock: true,
        tags: [{ tag: "wrapping" }, { tag: "paper" }, { tag: "elegant" }],
      },
      {
        name: "Bouquet Sunflower",
        slug: "bouquet-sunflower",
        description: "Bouquet bunga matahari ceria",
        price: 95000,
        category: createdCategories[0].id,
        sku: "BS-001",
        stock: 18,
        trackStock: true,
        tags: [{ tag: "sunflower" }, { tag: "cheerful" }, { tag: "bright" }],
      },
    ];

    for (const product of products) {
      const created = await payload.create({
        collection: "products",
        data: {
          ...product,
          tenant: bouquetTenant.id,
          isActive: true,
        },
      });
      console.log(`✅ Product created: ${created.name}`);
    }

    // Create Payment Methods
    const paymentMethods = [
      {
        name: "Transfer BCA",
        type: "bank-transfer" as const,
        accountNumber: "1234567890",
        accountName: "Bella Bouquet Shop",
        bankName: "Bank Central Asia",
        instructions: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Transfer ke rekening BCA:",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 1,
                    mode: "normal",
                    style: "",
                    text: "No. Rek: 1234567890",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 1,
                    mode: "normal",
                    style: "",
                    text: "A.n: Bella Bouquet Shop",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        isActive: true,
      },
      {
        name: "Transfer Mandiri",
        type: "bank-transfer" as const,
        accountNumber: "9876543210",
        accountName: "Bella Bouquet Shop",
        bankName: "Bank Mandiri",
        instructions: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Transfer ke rekening Mandiri:",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 1,
                    mode: "normal",
                    style: "",
                    text: "No. Rek: 9876543210",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 1,
                    mode: "normal",
                    style: "",
                    text: "A.n: Bella Bouquet Shop",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        isActive: true,
      },
      {
        name: "QRIS",
        type: "qris" as const,
        accountNumber: "QRIS-BELLA-001",
        accountName: "Bella Bouquet Shop",
        instructions: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Scan QR Code di bawah ini untuk pembayaran:",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        isActive: true,
      },
      {
        name: "Cash",
        type: "cash" as const,
        instructions: {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: "normal",
                    style: "",
                    text: "Pembayaran tunai saat pengambilan atau pengiriman.",
                    type: "text",
                    version: 1,
                  },
                ],
                direction: "ltr",
                format: "",
                indent: 0,
                type: "paragraph",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "root",
            version: 1,
          },
        },
        isActive: true,
      },
    ];

    for (const paymentMethod of paymentMethods) {
      const created = await payload.create({
        collection: "payment-methods",
        // @ts-ignore - Ignore type mismatch for payment method data
        data: {
          ...paymentMethod,
          tenant: bouquetTenant.id,
        },
      });
      console.log(`✅ Payment Method created: ${created.name}`);
    }

    // Create Sample Customers
    const customers = [
      {
        whatsappNumber: "+6281234567891",
        name: "Sari Dewi",
        email: "sari.dewi@email.com",
        address: "Jl. Melati No. 45, Jakarta Pusat",
        notes: "Customer setia, suka bouquet mawar",
      },
      {
        whatsappNumber: "+6281234567892",
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        address: "Jl. Anggrek No. 78, Jakarta Barat",
        notes: "Sering pesan untuk acara kantor",
      },
      {
        whatsappNumber: "+6281234567893",
        name: "Maya Putri",
        email: "maya.putri@email.com",
        address: "Jl. Dahlia No. 12, Jakarta Timur",
        notes: "Prefer bouquet warna pastel",
      },
    ];

    for (const customer of customers) {
      const created = await payload.create({
        collection: "customers",
        data: {
          ...customer,
          tenant: bouquetTenant.id,
        },
      });
      console.log(`✅ Customer created: ${created.name}`);
    }

    console.log("🎉 Seeding completed successfully!");
    console.log("\n📋 Login Credentials:");
    console.log("Super Admin:");
    console.log("  Email: admin@simplepos.com");
    console.log("  Password: f0TpZunCIR996gr");
    console.log("\nBouquet Shop Tenant:");
    console.log("  Email: bouquet@example.com");
    console.log("  Password: bouquet123");
    console.log("\n🌐 Admin Panel: http://localhost:2607/admin");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
};

seed();
