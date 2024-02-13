import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import { createItem } from "@/app/PrismaClient/dbHandler/handler";

export async function POST(request: Request) {
  const { success, response, auth, postData }: Type_verifyRequest =
    await verifyRequest(request, "create");

  if (!success) {
    return response;
  }

  const dataToAdd = {
    title: postData?.title,
    body: postData?.body,
    authorId: auth?.uid,
  };

  const createdPost = await createItem(dataToAdd, "forumPosts");
  const status: any = {};
  if (createdPost.success) {
    status["status"] = 200;
  } else {
    status["status"] = 500;
  }

  return NextResponse.json(createdPost, status);
}
