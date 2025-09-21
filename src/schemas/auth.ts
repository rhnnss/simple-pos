import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email wajib diisi")
      .email("Format email tidak valid"),
    password: z
      .string()
      .min(8, "Password minimal 8 karakter")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password harus mengandung huruf besar, huruf kecil, dan angka",
      ),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
    businessName: z
      .string()
      .min(2, "Nama bisnis minimal 2 karakter")
      .max(100, "Nama bisnis maksimal 100 karakter"),
    businessType: z.enum(["bouquet", "fnb", "retail", "service"], {
      error: "Jenis bisnis wajib dipilih",
    }),
    whatsappNumber: z
      .string()
      .min(10, "Nomor WhatsApp minimal 10 digit")
      .max(15, "Nomor WhatsApp maksimal 15 digit")
      .regex(/^[0-9+\-\s()]+$/, "Format nomor WhatsApp tidak valid"),
    address: z
      .string()
      .min(10, "Alamat minimal 10 karakter")
      .max(500, "Alamat maksimal 500 karakter"),
    terms: z.boolean().refine((val) => val === true, {
      message: "Anda harus menyetujui syarat dan ketentuan",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak sesuai",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
