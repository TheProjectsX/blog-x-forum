import { NextResponse } from "next/server";
import {
  Type_verifyRequest,
  verifyRequest,
} from "@/app/api/Verifications/request";
import {
  createItem,
  getItem,
  updateItem,
} from "@/app/PrismaClient/dbHandler/handler";

export async function POST(request: Request) {
  const { success, response, auth, reactionData }: Type_verifyRequest =
    await verifyRequest(request, "reaction");

  if (!success) {
    return response;
  }

  const currentPost = await getItem(
    { id: reactionData?.id },
    "forumPosts",
    {},
    { likes: true, dislikes: true }
  );
  if (!currentPost.success) {
    return NextResponse.json(
      { success: false, error: "Post not Found!" },
      { status: 404 }
    );
  }

  let pastLikes: String[] = JSON.parse(currentPost["data"]["likes"]);
  let pastDisLikes: String[] = JSON.parse(currentPost["data"]["dislikes"]);

  const userId = auth?.uid ?? "";
  const likeType = reactionData?.reaction;
  const postId = reactionData?.id;

  if (likeType === "0") {
    if (pastDisLikes.includes(userId)) {
      pastDisLikes = pastDisLikes.filter((val) => val !== userId);
      pastLikes.push(userId);
    } else if (pastLikes.includes(userId)) {
      pastLikes = pastLikes.filter((val) => val !== userId);
    } else {
      pastLikes.push(userId);
    }
  } else if (likeType === "1") {
    if (pastLikes.includes(userId)) {
      pastLikes = pastLikes.filter((val) => val !== userId);
      pastDisLikes.push(userId);
    } else if (pastDisLikes.includes(userId)) {
      pastDisLikes = pastDisLikes.filter((val) => val !== userId);
    } else {
      pastDisLikes.push(userId);
    }
  }

  const dataToUpdate = {
    likes: JSON.stringify(pastLikes),
    dislikes: JSON.stringify(pastDisLikes),
  };

  const createdPost = await updateItem(
    { id: postId },
    dataToUpdate,
    "forumPosts"
  );
  const status: any = {};
  if (createdPost.success) {
    status["status"] = 200;
  } else {
    status["status"] = 500;
  }

  return NextResponse.json(createdPost, status);
}
