import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  console.log("Token:", token); // Log the token to see if it is retrieved correctly

  if (!token && pathname !== "/auth/inscription") {
    console.log("No token found, redirecting to /connexion");
    return NextResponse.redirect(new URL("/auth/connexion", request.url));
  }

  console.log("Token found, proceeding to next middleware");
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
