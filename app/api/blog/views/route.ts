import { NextResponse } from "next/server";
import { getItem, updateItem } from "@/app/PrismaClient/dbHandler/handler";

export async function GET(request: Request) {
  const postId: String | null = new URL(request.url).searchParams.get("id");
  const postUrl: String | null = new URL(request.url).searchParams.get("url");

  if (!postId && !postUrl) {
    return NextResponse.json(
      { success: false, error: "Post ID or URL is Required" },
      { status: 400 }
    );
  }

  const searchParams: any = {};
  if (postId) {
    searchParams["id"] = postId;
  } else {
    searchParams["url"] = postUrl;
  }

  const currentPost = await getItem(
    searchParams,
    "blogPosts",
    {},
    { views: true }
  );

  if (!currentPost.success) {
    return NextResponse.json(
      { success: false, error: "Post not Found!" },
      { status: 404 }
    );
  }

  let views: number = currentPost["data"]["views"] + 1;

  const dataToUpdate = {
    views,
  };

  const createdPost = await updateItem(
    searchParams,
    dataToUpdate,
    "blogPosts",
    { views: true }
  );
  const status: any = {};
  if (createdPost.success) {
    status["status"] = 200;
  } else {
    status["status"] = 500;
  }

  return NextResponse.json(createdPost, status);
}
