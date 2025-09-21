"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Checkbox,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiEye,
  FiEyeOff,
  FiShoppingBag,
  FiCheck,
} from "react-icons/fi";
import { registerSchema, type RegisterFormData } from "@/schemas/auth";

const businessTypeOptions = [
  { value: "bouquet", label: "Bouquet Shop" },
  { value: "fnb", label: "Food & Beverage" },
  { value: "retail", label: "Retail" },
  { value: "service", label: "Service" },
];

export function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      businessType: "bouquet",
      terms: false,
    },
  });

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          role: "tenant",
          businessName: data.businessName,
          businessType: data.businessType,
          whatsappNumber: data.whatsappNumber,
          address: data.address,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registrasi gagal");
      }

      // toast.success("Registrasi berhasil! Silakan login untuk melanjutkan.");

      // Redirect to login page
      window.location.href = "/login";
    } catch (error) {
      // toast.error(
      //   error instanceof Error
      //     ? error.message
      //     : "Terjadi kesalahan saat registrasi",
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
          <h1 className="text-2xl font-bold">Daftar Seller</h1>
          <p className="text-default-500 mt-1 text-sm">
            Mulai bisnis Anda dengan Simple PoS
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

          {/* Confirm Password */}
          <Input
            {...register("confirmPassword")}
            label="Konfirmasi Password"
            placeholder="Ulangi password"
            startContent={<FiLock className="text-default-400" />}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleConfirmVisibility}
              >
                {isConfirmVisible ? (
                  <FiEyeOff className="text-default-400" />
                ) : (
                  <FiEye className="text-default-400" />
                )}
              </button>
            }
            type={isConfirmVisible ? "text" : "password"}
            isInvalid={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
            variant="bordered"
          />

          <Divider className="my-4" />

          {/* Business Name */}
          <Input
            {...register("businessName")}
            label="Nama Bisnis"
            placeholder="Masukkan nama bisnis Anda"
            startContent={<FiUser className="text-default-400" />}
            isInvalid={!!errors.businessName}
            errorMessage={errors.businessName?.message}
            variant="bordered"
          />

          {/* Business Type */}
          <Select
            label="Jenis Bisnis"
            placeholder="Pilih jenis bisnis"
            selectedKeys={watch("businessType") ? [watch("businessType")] : []}
            onSelectionChange={(keys) => {
              const selectedKey = Array.from(keys)[0] as string;
              setValue("businessType", selectedKey as any);
            }}
            isInvalid={!!errors.businessType}
            errorMessage={errors.businessType?.message}
            variant="bordered"
          >
            {businessTypeOptions.map((option) => (
              <SelectItem key={option.value}>{option.label}</SelectItem>
            ))}
          </Select>

          {/* WhatsApp Number */}
          <Input
            {...register("whatsappNumber")}
            label="Nomor WhatsApp Bisnis"
            placeholder="Contoh: +62812345678"
            startContent={<FiPhone className="text-default-400" />}
            isInvalid={!!errors.whatsappNumber}
            errorMessage={errors.whatsappNumber?.message}
            variant="bordered"
            description="Nomor ini akan digunakan untuk mengirim receipt ke customer"
          />

          {/* Address */}
          <Textarea
            {...register("address")}
            label="Alamat Bisnis"
            placeholder="Masukkan alamat lengkap bisnis Anda"
            startContent={<FiMapPin className="text-default-400" />}
            isInvalid={!!errors.address}
            errorMessage={errors.address?.message}
            variant="bordered"
            minRows={3}
          />

          {/* Terms and Conditions */}
          <Checkbox
            {...register("terms")}
            isSelected={watch("terms")}
            onValueChange={(checked) => setValue("terms", checked)}
            isInvalid={!!errors.terms}
            color="primary"
          >
            <span className="text-sm">
              Saya menyetujui{" "}
              <a href="/terms" className="text-primary hover:underline">
                Syarat dan Ketentuan
              </a>{" "}
              serta{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Kebijakan Privasi
              </a>
            </span>
          </Checkbox>
          {errors.terms && (
            <p className="text-danger mt-1 text-sm">{errors.terms.message}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full font-semibold"
            isLoading={isLoading}
            startContent={!isLoading && <FiCheck />}
          >
            {isLoading ? "Mendaftarkan..." : "Daftar Sekarang"}
          </Button>

          {/* Login Link */}
          <div className="text-default-500 text-center text-sm">
            Sudah punya akun?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline"
            >
              Masuk di sini
            </a>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
