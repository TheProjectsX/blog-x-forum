import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import { createItem, updateItem } from "@/app/PrismaClient/dbHandler/handler";

export async function POST(request: Request) {
  const { success, response, auth, postData }: Type_verifyRequest =
    await verifyRequest(request, "create");

  if (!success) {
    return response;
  }

  if (auth?.role !== "author") {
    return NextResponse.json(
      { success: false, error: "You need to be an Author to Post Blog" },
      { status: 401 }
    );
  }

  let postUrl = `/blog/${postData?.title?.replaceAll(" ", "-")}-`;

  const dataToAdd = {
    title: postData?.title,
    body: postData?.body,
    authorId: auth?.uid,
    url: Date.now().toString(),
  };

  const createdPost = await createItem(dataToAdd, "blogPosts");
  const status: any = {};
  if (createdPost.success) {
    postUrl += createdPost.data.id;
    updateItem({ id: createdPost.data.id }, { url: postUrl }, "blogPosts");
    createdPost["data"]["url"] = postUrl;
    status["status"] = 200;
  } else {
    status["status"] = 500;
  }

  return NextResponse.json(createdPost, status);
}
