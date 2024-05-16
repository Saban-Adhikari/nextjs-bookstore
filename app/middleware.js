// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { useSession } from "next-auth/react";

// export function middleware(request) {
//   const path = request.nextUrl.pathname;

//   const isPublicPath = path === "/api/login" || path === "/api/register";

//   // const token = request.cookies.get("token")?.value || "";
//   console.log("status: ", status);

//   if (isPublicPath && status == "authenticated") {
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   if (!isPublicPath && status == "unauthenticated") {
//     return NextResponse.redirect(new URL("/api/login", request.nextUrl));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/", "/api/login", "/register"],
// };

// // import { NextRequest, NextResponse } from "next/server";
// // export { default } from "next-auth/middleware";
// // import { getToken } from "next-auth/jwt";

// // export async function middleware(request) {
// //   const token = await getToken({
// //     req: request,
// //   });
// //   const url = request.nextUrl;

// //   if (
// //     (token && url.pathname.startsWith("/login")) ||
// //     url.pathname.startsWith("/register")
// //   ) {
// //     return NextResponse.redirect(new URL("/card", request.url));
// //   }

// //   return NextResponse.redirect(new URL("/", request.url));
// // }

// // export const config = {
// //   matcher: ["/card", "/", "/register", "/login"],
// // };

// // import { NextResponse } from "next/server";
// // import { getToken } from "next-auth/jwt";

// // export async function middleware(req) {
// //   const session = await getToken({
// //     req,
// //     secret: process.env.NEXTAUTH_SECRET,
// //   });

// //   const { pathname, origin } = req.nextUrl;
// //   console.log(session);
// //   if (session) {
// //     // If the user is authenticated, redirect to /card except when already on /card
// //     if (pathname === "/api/login") {
// //       return NextResponse.redirect(`${origin}/card`);
// //     }
// //     if (pathname !== "/card") {
// //       return NextResponse.redirect(`${origin}/card`);
// //     }
// //     return NextResponse.next();
// //   }

// //   // If the user is not authenticated, redirect to the login page
// //   //   if (pathname === "/card") {
// //   //     return NextResponse.redirect(`${origin}/api/login`);
// //   //   } else if (pathname === "/") {
// //   //     return NextResponse.redirect(`${origin}/api/login`);
// //   //   }

// //   // Otherwise, allow access to the login page
// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/", "/card"],
// // };
