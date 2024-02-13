import { NextResponse } from "next/server";
import { Type_VerifyJWT, VerifyJWT } from "./authentication";

export type Type_verifyRequest = {
  success: Boolean;
  response?: NextResponse<any>;
  auth?: Type_VerifyJWT;
  postData?: { id?: String; title?: String; body?: String };
  commentData?: { id?: String; comment?: String };
};

// Action Type
type Type_action =
  | "create"
  | "update"
  | "delete"
  | "comment-create"
  | "comment-read"
  | "comment-update"
  | "comment-delete";

export const verifyRequest = async (
  request: Request,
  action: Type_action
): Promise<Type_verifyRequest> => {
  const accessToken: String | null = request.headers.get("accessToken");
  const verification: Type_VerifyJWT = await VerifyJWT(accessToken);

  if (!verification.verified && action !== "comment-read") {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      ),
    };
  }

  //   If the action is to Delete post or to Delete Comment - This requires searchParams, not Body
  if (
    action === "delete" ||
    action === "comment-delete" ||
    action === "comment-read"
  ) {
    const id: String | null = new URL(request.url).searchParams.get("id");
    if (id) {
      if (action === "delete") {
        return { success: true, auth: verification, postData: { id } };
      } else {
        return { success: true, auth: verification, commentData: { id } };
      }
    } else {
      return {
        success: false,
        response: NextResponse.json(
          { success: false, message: "ID is Required" },
          { status: 400 }
        ),
      };
    }
  }

  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    requestBody = false;
  }

  if (!requestBody) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: "Request Body is Required" },
        { status: 400 }
      ),
    };
  }

  // postId will be used for both "PostID" and "CommentID" -- will be checked by Backend
  const postId: String | null = requestBody["id"];
  const postTitle: String | null = requestBody["title"];
  const postBody: String | null = requestBody["body"];
  const comment: String | null = requestBody["comment"];

  if (action === "comment-create" || action === "comment-update") {
    if (!comment || !postId) {
      return {
        success: false,
        response: NextResponse.json(
          { success: false, message: "Comment and ID is Required" },
          { status: 400 }
        ),
      };
    } else {
      return {
        success: true,
        auth: verification,
        commentData: { id: postId, comment: comment },
      };
    }
  }

  if (!postTitle || !postBody) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: "Post Title and Body is Required" },
        { status: 400 }
      ),
    };
  }

  if (action === "update") {
    if (!postId) {
      return {
        success: false,
        response: NextResponse.json(
          { success: false, message: "Post ID is Required" },
          { status: 400 }
        ),
      };
    }

    return {
      success: true,
      auth: verification,
      postData: { id: postId, title: postTitle, body: postBody },
    };
  }

  return {
    success: true,
    auth: verification,
    postData: { title: postTitle, body: postBody },
  };
};
