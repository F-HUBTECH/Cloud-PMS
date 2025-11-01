import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProtectedLayout from "@/components/protected-layout";
import { MarketSettings } from "@/components/features/settings/MarketSettings";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }
  return (
    <ProtectedLayout pageTitle="Market Segments">
      <MarketSettings />
    </ProtectedLayout>
  );
}
