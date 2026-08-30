import { headers } from "next/headers";

const upiIdPattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+$/;

export async function GET() {
  const requestHeaders = await headers();
  const upiId = requestHeaders.get("x-san-bakes-upi-id")?.trim() ?? "";
  const payeeName = requestHeaders.get("x-san-bakes-upi-name")?.trim() || "San Bakes";
  const enabled = upiIdPattern.test(upiId);

  return Response.json(
    enabled ? { enabled: true, upiId, payeeName } : { enabled: false, payeeName },
    { headers: { "Cache-Control": "no-store" } },
  );
}
