import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import { createItem } from "@/app/PrismaClient/dbHandler/handler";

export async function POST(request: Request) {
  const { success, response, auth, commentData }: Type_verifyRequest =
    await verifyRequest(request, "comment-create");

  if (!success) {
    return response;
  }

  const dataToAdd = {
    comment: commentData?.comment,
    postId: commentData?.id,
    authorId: auth?.uid,
  };

  console.log(dataToAdd);
  const createdComment = await createItem(dataToAdd, "forumComments");
  const status: any = {};
  if (createdComment.success) {
    status["status"] = 200;
  } else {
    status["status"] = 500;
  }

  return NextResponse.json(createdComment, status);
}