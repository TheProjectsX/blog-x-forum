import { NextResponse } from "next/server";
import { getAllItems, getItem } from "@/app/PrismaClient/dbHandler/handler";

export async function GET(request: Request) {
  const postId: String | null = new URL(request.url).searchParams.get("id");
  const postUrl: String | null = new URL(request.url).searchParams.get("url");

  let parsedData;
  if (postId) {
    parsedData = await getItem({ id: postId }, "blogPosts", {
      author: true,
      comments: { include: { author: true } },
    });
  } else if (postUrl) {
    parsedData = await getItem({ url: postUrl }, "blogPosts", {
      author: true,
      comments: { include: { author: true } },
    });
  } else {
    parsedData = await getAllItems(
      {},
      "blogPosts",
      {
        author: true,
        comments: true,
      },
      (elm: any) => (elm["comments"] = elm["comments"].length)
    );
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
