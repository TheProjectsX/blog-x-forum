import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import { updateItem } from "@/app/PrismaClient/dbHandler/handler";

export async function PUT(request: Request) {
  const { success, response, auth, postData }: Type_verifyRequest =
    await verifyRequest(request, "update");

  if (!success) {
    return response;
  }

  if (auth?.role !== "author") {
    return NextResponse.json(
      { success: false, error: "Unauthorized Request" },
      { status: 401 }
    );
  }

  const authorId = auth?.uid ?? "";
  const id = postData?.id ?? "";

  const postUrl = `/blog/${postData?.title?.replaceAll(" ", "-")}-${id}`;

  const dataToUpdate = {
    title: postData?.title,
    body: postData?.body,
    url: postUrl,
  };

  const updatedPost = await updateItem(
    { id, authorId },
    dataToUpdate,
    "blogPosts"
  );

  const status: any = {};
  if (updatedPost.success) {
    status["status"] = 200;
  } else {
    updatedPost["error"] = "Post Not Found!";
    status["status"] = 404;
  }

  return NextResponse.json(updatedPost, status);
}
