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
          error: "You must be logged in to delete a tweet",
        },
        {
          status: 401,
        }
      );
    }

    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        {
          error: "You must provide a postId",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({
      success: true,
    });
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
