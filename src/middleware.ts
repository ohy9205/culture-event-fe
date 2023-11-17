import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("request", request.cookies.get("sessionId"));

  const session = request.cookies.get("sessionId");
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/signIn");
  }
  const fetchData = await fetch("http://localhost:3030/auth/check", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `${session.name}=${session.value}`,
    },

    mode: "cors",
  });
  const data = await fetchData.json();

  console.log("fetch result", data);
  if (data.code !== 200) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/event",
};
