import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { ProfileValidator } from "@/lib/validator/ProfileValidator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await isLoggedIn();

    if (!session) {
      return NextResponse.json(
        {
          error: "You must be logged in to update your profile.",
        },
        { status: 401 }
      );
    }

    const { username, bio } = ProfileValidator.parse(body);

    await prisma.user.update({
      where: {
        email: session.user?.email!,
      },
      data: {
        username,
        bio,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
