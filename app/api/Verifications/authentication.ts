export type Type_VerifyJWT = {
  verified: boolean;
  uid?: String;
  role?: String;
};

export const VerifyJWT = async (
  token: String | null
): Promise<Type_VerifyJWT> => {
  return {
    verified: true,
    uid: token ?? "",
    role: "author",
  };
};
