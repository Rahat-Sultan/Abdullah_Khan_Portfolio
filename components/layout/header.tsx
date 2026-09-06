/**
 * Server Component wrapper — fetches brand name from Supabase then renders
 * the interactive HeaderClient (which needs usePathname / useState).
 */
import { getBrandName } from "@/lib/data";
import { HeaderClient } from "@/components/layout/header-client";

export async function Header() {
  const brandName = await getBrandName();
  return <HeaderClient brandName={brandName} />;
}
