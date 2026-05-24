import { getWebsites } from "@/lib/db";
import { AdminCRMClient } from "./admin-crm-client";

export const metadata = {
  title: "CRM Administration Dashboard",
  description: "Create, update, and delete curation entries in the gallery database.",
};

export default function AdminPage() {
  const websitesList = getWebsites();
  return <AdminCRMClient initialSites={websitesList} />;
}
