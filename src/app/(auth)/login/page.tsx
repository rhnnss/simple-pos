import React from "react";
import { Metadata } from "next";
import { LoginForm } from "@/sections/autentikasi/LoginForm";

export const metadata: Metadata = {
  title: "Masuk - Simple PoS",
  description: "Masuk ke akun Simple PoS Anda untuk mengelola bisnis dan penjualan.",
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}