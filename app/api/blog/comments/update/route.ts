import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import { updateItem } from "@/app/PrismaClient/dbHandler/handler";

export async function PUT(request: Request) {
  const { success, response, auth, commentData }: Type_verifyRequest =
    await verifyRequest(request, "comment-update");

  if (!success) {
    return response;
  }

  const authorId = auth?.uid ?? "";
  const id = commentData?.id ?? "";

  const dataToUpdate = {
    comment: commentData?.comment,
  };

  const updatedComment = await updateItem(
    { id, authorId },
    dataToUpdate,
    "blogComments"
  );

  const status: any = {};
  if (updatedComment.success) {
    status["status"] = 200;
  } else {
    updatedComment["error"] = "Comment Not Found!";
    status["status"] = 404;
  }

  return NextResponse.json(updatedComment, status);
}
