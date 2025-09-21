import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });

    // Authenticate user
    const result = await payload.login({
      collection: "users",
      data: {
        email,
        password,
      },
    });

    if (!result.user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 },
      );
    }

    // Check if user is active
    if (!result.user.isActive) {
      return NextResponse.json(
        { message: "Akun Anda telah dinonaktifkan. Silakan hubungi admin." },
        { status: 403 },
      );
    }

    // Set cookie
    const response = NextResponse.json(
      {
        message: "Login berhasil",
        user: {
          id: result.user.id,
          email: result.user.email,
          role: result.user.role,
          businessName: result.user.businessName,
        },
      },
      { status: 200 },
    );

    // Set the auth cookie
    if (result.token) {
      response.cookies.set("payload-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan internal server",
      },
      { status: 500 },
    );
  }
}
