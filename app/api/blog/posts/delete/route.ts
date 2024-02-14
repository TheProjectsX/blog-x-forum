import { NextResponse } from "next/server";
import { deleteItem } from "@/app/PrismaClient/dbHandler/handler";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";

export async function DELETE(request: Request) {
  const { success, response, auth, postData }: Type_verifyRequest =
    await verifyRequest(request, "delete");

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

  const deletedPost = await deleteItem({ id, authorId }, "blogPosts");

  const status: any = {};
  if (deletedPost.success) {
    status["status"] = 200;
  } else {
    deletedPost["error"] = "Post Not Found!";
    status["status"] = 404;
  }

  return NextResponse.json(deletedPost, status);
}
