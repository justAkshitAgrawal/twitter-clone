import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    if (!params.username) {
      return NextResponse.json(
        {
          error: "You must provide a username.",
        },
        { status: 400 }
      );
    }

    if (params.username.length < 1 || params.username.length > 25) {
      return NextResponse.json(
        {
          error: "Your username must be between 1 and 25 characters.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      return NextResponse.json({
        available: true,
      });
    } else {
      return NextResponse.json({
        available: false,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
