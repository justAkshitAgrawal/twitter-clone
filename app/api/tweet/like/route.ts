import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { postId, action } = body;

    const session = await isLoggedIn();

    if (!session) {
      return NextResponse.json(
        {
          error: "You must be logged in to like a post",
        },
        {
          status: 401,
        }
      );
    }

    if (action === "like") {
      const existingLike = await prisma.like.findFirst({
        where: {
          postId,
          //   @ts-ignore
          userId: session.user!.id,
        },
      });

      if (existingLike) {
        return NextResponse.json(
          {
            error: "You already liked this post",
          },
          {
            status: 400,
          }
        );
      }

      const like = await prisma.like.create({
        data: {
          postId: postId,
          //   @ts-ignore
          userId: session.user!.id,
        },
      });

      return NextResponse.json({
        message: "Liked",
      });
    } else if (action === "unlike") {
      const unlike = await prisma.like.deleteMany({
        where: {
          postId,
          //   @ts-ignore
          userId: session.user!.id,
        },
      });

      return NextResponse.json({
        message: "Unliked",
      });
    } else {
      return NextResponse.json(
        {
          error: "Invalid action",
        },
        {
          status: 400,
        }
      );
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
