import { NextResponse } from "next/server";

const BE = process.env.BACKEND_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const shouldRedirect = url.searchParams.get("redirect") === "1";
    const res = await fetch(`${BE}/api/auth/google/auth-url`, {
      headers: {
        Accept: "application/json",
        Cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));

    if (shouldRedirect && data?.auth_url) {
      // Redirect browser straight to Google auth url
      const redirect = NextResponse.redirect(data.auth_url, 302);
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) redirect.headers.set("set-cookie", setCookie);
      return redirect;
    }

    const response = NextResponse.json(data, { status: res.status });
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      response.headers.set("set-cookie", setCookie);
    }
    return response;
  } catch (err) {
    return NextResponse.json({ error: "proxy_error", detail: String(err) }, { status: 502 });
  }
}
