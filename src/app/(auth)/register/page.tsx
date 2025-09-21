import React from "react";
import { Metadata } from "next";
import { RegisterForm } from "@/sections/autentikasi/RegisterForm";

export const metadata: Metadata = {
  title: "Daftar Seller - Simple PoS",
  description: "Daftarkan bisnis Anda dan mulai menggunakan Simple PoS untuk mengelola penjualan dengan mudah.",
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
}
