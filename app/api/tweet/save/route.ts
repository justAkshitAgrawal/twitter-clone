import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const session = await isLoggedIn();

    if (!session) {
      return NextResponse.json(
        {
          error: "You must be logged in to do that",
        },
        {
          status: 401,
        }
      );
    }

    const { postId, action } = body;

    if (!postId || !action) {
      return NextResponse.json(
        {
          error: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

    if (action === "save") {
      await prisma.savedPost.create({
        data: {
          postId,
          //   @ts-ignore
          userId: session.user.id!,
        },
      });

      return NextResponse.json({
        message: "Saved",
      });
    } else if (action === "unsave") {
      await prisma.savedPost.deleteMany({
        where: {
          postId,
          //   @ts-ignore
          userId: session.user.id!,
        },
      });

      return NextResponse.json({
        message: "Unsaved",
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
