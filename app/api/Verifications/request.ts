import { NextResponse } from "next/server";
import { Type_VerifyJWT, VerifyJWT } from "./authentication";

export type Type_verifyRequest = {
  success: Boolean;
  response?: NextResponse<any>;
  auth?: Type_VerifyJWT;
  postData?: { id?: String; title?: String; body?: String };
};

export const verifyRequest = async (
  request: Request,
  action: String
): Promise<Type_verifyRequest> => {
  const accessToken: String | null = request.headers.get("accessToken");
  const verification: Type_VerifyJWT = await VerifyJWT(accessToken);

  if (!verification.verified) {
    return {
      success: false,
      response: NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      ),
    };
  }

  //   If the action is to Delete post
  if (action === "delete") {
    const id: String | null = new URL(request.url).searchParams.get("id");
    if (id) {
      return { success: true, auth: verification, postData: { id } };
    } else {
      return {
        success: false,
        response: NextResponse.json(
          { success: false, message: "Post ID is Required" },
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

  const postId: String | null = requestBody["id"];
  const postTitle: String | null = requestBody["title"];
  const postBody: String | null = requestBody["body"];

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
