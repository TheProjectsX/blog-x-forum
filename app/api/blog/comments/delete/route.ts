import { NextResponse } from "next/server";
import { deleteItem } from "@/app/PrismaClient/dbHandler/handler";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";

export async function DELETE(request: Request) {
  const { success, response, auth, commentData }: Type_verifyRequest =
    await verifyRequest(request, "comment-delete");

  if (!success) {
    return response;
  }

  const authorId = auth?.uid ?? "";
  const id = commentData?.id ?? "";

  const deletedComment = await deleteItem({ id, authorId }, "blogComments");

  const status: any = {};
  if (deletedComment.success) {
    status["status"] = 200;
  } else {
    deletedComment["error"] = "Comment Not Found!";
    status["status"] = 404;
  }

  return NextResponse.json(deletedComment, status);
}
