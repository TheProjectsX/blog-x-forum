import { NextResponse } from "next/server";
import { Type_verifyRequest, verifyRequest } from "../../Verifications/request";
import { updateItem } from "@/app/PrismaClient/dbHandler/handler";

export async function PUT(request: Request) {
  const { success, response, auth, postData }: Type_verifyRequest =
    await verifyRequest(request, "update");

  if (!success) {
    return response;
  }

  const authorId = auth?.uid ?? "";
  const id = postData?.id ?? "";

  const dataToUpdate = {
    title: postData?.title,
    body: postData?.body,
  };

  const updatedPost = await updateItem(
    { id, authorId },
    dataToUpdate,
    "forumPosts"
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
