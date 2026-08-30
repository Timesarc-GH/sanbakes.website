import { chatGPTSignOutPath, requireChatGPTUser } from "../chatgpt-auth";
import { AdminInventoryClient } from "../components/AdminInventoryClient";
import { isSanBakesAdmin } from "../lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await requireChatGPTUser("/admin");

  if (!await isSanBakesAdmin(user)) {
    return <main className="adminDenied"><div><p className="eyebrow dark">OWNER ACCESS REQUIRED</p><h1>This account cannot manage San Bakes inventory.</h1><p>Sign in with the Site-owner account to open the inventory console.</p><div><a className="button buttonCacao" href="/">Return to website</a><a className="button buttonOutline" href={chatGPTSignOutPath("/admin")}>Use another account</a></div></div></main>;
  }

  return <AdminInventoryClient adminName={user.displayName} signOutPath={chatGPTSignOutPath("/")} />;
}
