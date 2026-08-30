import { headers } from "next/headers";
import type { ChatGPTUser } from "../chatgpt-auth";

const ADMIN_AUTHORIZATION_HEADER = "x-san-bakes-admin-authorized";

export async function isSanBakesAdmin(user: ChatGPTUser) {
  const requestHeaders = await headers();
  return Boolean(user.userId && requestHeaders.get(ADMIN_AUTHORIZATION_HEADER) === "1");
}
