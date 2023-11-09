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

    await prisma.like.deleteMany({
      where: {
        postId,
      },
    });

    await prisma.savedPost.deleteMany({
      where: {
        postId,
      },
    });

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
