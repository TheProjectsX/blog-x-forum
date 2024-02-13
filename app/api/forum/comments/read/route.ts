import { NextResponse } from "next/server";
import { getItem } from "@/app/PrismaClient/dbHandler/handler";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";

export async function GET(request: Request) {
  const { success, response, commentData }: Type_verifyRequest =
    await verifyRequest(request, "comment-read");

  if (!success) {
    return response;
  }

  const parsedData = await getItem(
    { authorId: commentData?.id },
    "forumComments"
  );

  const status: any = {};
  if (parsedData.success) {
    status["status"] = 200;
  } else {
    console.log(parsedData["error"]);
    parsedData["error"] = "Post Not Found!";
    status["status"] = 404;
  }

  return NextResponse.json(parsedData, status);
}
