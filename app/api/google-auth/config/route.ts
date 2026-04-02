import { NextResponse } from "next/server";

type GoogleClientConfigStatus =
  | "ready"
  | "missing_client_id"
  | "invalid_client"
  | "redirect_uri_mismatch"
  | "unknown_error";

type GoogleClientConfigResponse = {
  clientId?: string;
  status: GoogleClientConfigStatus;
};

function decodeAuthErrorPayload(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = (4 - (normalized.length % 4)) % 4;

  try {
    return Buffer.from(`${normalized}${"=".repeat(padding)}`, "base64").toString("utf8");
  } catch {
    return "";
  }
}

function getStatusFromLocation(location: string): GoogleClientConfigStatus {
  if (!location) {
    return "unknown_error";
  }

  const parsedUrl = new URL(location);
  const authError = parsedUrl.searchParams.get("authError");
  const decodedError = authError ? decodeAuthErrorPayload(authError) : "";

  if (decodedError.includes("invalid_client") || decodedError.includes("OAuth client was not found")) {
    return "invalid_client";
  }

  return "ready";
}

async function validateGoogleClientId(clientId: string): Promise<GoogleClientConfigStatus> {
  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", "https://example.com/oauth/callback");
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");

  const response = await fetch(googleUrl, {
    method: "GET",
    cache: "no-store",
    redirect: "manual",
  });

  return getStatusFromLocation(response.headers.get("location") ?? "");
}

export async function GET() {
  const clientId =
    process.env.GOOGLE_CLIENT_ID?.trim() ??
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ??
    "";

  if (!clientId) {
    return NextResponse.json<GoogleClientConfigResponse>(
      { status: "missing_client_id" },
      { status: 503 },
    );
  }

  try {
    const status = await validateGoogleClientId(clientId);
    const statusCode = status === "ready" ? 200 : 503;

    return NextResponse.json<GoogleClientConfigResponse>({ clientId, status }, { status: statusCode });
  } catch {
    return NextResponse.json<GoogleClientConfigResponse>(
      { clientId, status: "unknown_error" },
      { status: 503 },
    );
  }
}
