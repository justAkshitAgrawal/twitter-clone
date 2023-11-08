import { isLoggedIn } from "@/lib/auth";
import prisma from "@/lib/db";
import { PostValidator } from "@/lib/validator/PostValidator";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { tweet, retweetedFrom } = PostValidator.parse(body);
    const session = await isLoggedIn();

    if (!session) {
      return NextResponse.json(
        {
          error: "You must be logged in to do that.",
        },
        {
          status: 401,
        }
      );
    }

    if (retweetedFrom) {
      await prisma.post.create({
        data: {
          content: tweet,
          // @ts-ignore
          authorId: session.user!.id,
          retweetedFrom: retweetedFrom,
        },
      });
    } else {
      await prisma.post.create({
        data: {
          content: tweet,
          // @ts-ignore
          authorId: session.user!.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: "OK",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
