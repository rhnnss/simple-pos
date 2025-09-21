import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { registerSchema } from "@/schemas/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const validationResult = registerSchema.safeParse({
      ...body,
      terms: true, // API assumes terms are accepted if request is made
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Data tidak valid",
          errors: validationResult.error.errors,
        },
        { status: 400 },
      );
    }

    const payload = await getPayload({ config });

    // Check if user already exists
    const existingUser = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: body.email,
        },
      },
    });

    if (existingUser.docs.length > 0) {
      return NextResponse.json(
        { message: "Email sudah terdaftar" },
        { status: 409 },
      );
    }

    // Create new user
    const newUser = await payload.create({
      collection: "users",
      data: {
        email: body.email,
        password: body.password,
        role: "tenant",
        businessName: body.businessName,
        businessType: body.businessType,
        whatsappNumber: body.whatsappNumber,
        address: body.address,
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: {
          id: newUser.id,
          email: newUser.email,
          businessName: newUser.businessName,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan internal server",
      },
      { status: 500 },
    );
  }
}
