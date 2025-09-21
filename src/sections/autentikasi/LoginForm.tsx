"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
} from "@heroui/react";
// import { toast } from "sonner";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLogIn,
  FiShoppingBag,
} from "react-icons/fi";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login gagal");
      }

      // toast.success("Login berhasil! Selamat datang kembali.");

      // Redirect to homepage
      window.location.href = "/";
    } catch (error) {
      // toast.error(
      //   error instanceof Error ? error.message : "Terjadi kesalahan saat login",
      // );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col gap-3 pb-6">
        <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <FiShoppingBag className="text-primary h-8 w-8" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Masuk ke Simple PoS</h1>
          <p className="text-default-500 mt-1 text-sm">
            Kelola bisnis Anda dengan mudah
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <Input
            {...register("email")}
            type="email"
            label="Email"
            placeholder="Masukkan email Anda"
            startContent={<FiMail className="text-default-400" />}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            variant="bordered"
          />

          {/* Password */}
          <Input
            {...register("password")}
            label="Password"
            placeholder="Masukkan password"
            startContent={<FiLock className="text-default-400" />}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <FiEyeOff className="text-default-400" />
                ) : (
                  <FiEye className="text-default-400" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            variant="bordered"
          />

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link href="/forgot-password" size="sm" className="text-primary">
              Lupa password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isLoading}
            startContent={!isLoading && <FiLogIn />}
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </Button>

          {/* Register Link */}
          <div className="text-default-500 text-center text-sm">
            Belum punya akun?{" "}
            <Link href="/register" className="text-primary font-medium">
              Daftar di sini
            </Link>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
