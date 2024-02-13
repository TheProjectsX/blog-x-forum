import { NextResponse } from "next/server";
import { getAllItems, getItem } from "@/app/PrismaClient/dbHandler/handler";

export async function GET(request: Request) {
  const postId: String | null = new URL(request.url).searchParams.get("id");

  let parsedData;
  if (postId) {
    parsedData = await getItem(postId, "forumPosts");
  } else {
    parsedData = await getAllItems("forumPosts");
  }

  const status: any = {};
  if (parsedData.success) {
    status["status"] = 200;
  } else {
    if (postId) {
      parsedData["error"] = "Post Not Found!";
      status["status"] = 404;
    } else {
      status["status"] = 500;
    }
  }

  return NextResponse.json(parsedData, status);
}
