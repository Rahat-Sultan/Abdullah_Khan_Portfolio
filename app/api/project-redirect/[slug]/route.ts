/**
 * GET /api/project-redirect/[slug]
 *
 * Fetches the destination_url for a project server-side and issues a redirect.
 * The raw URL is never rendered in HTML — the client only ever calls this endpoint.
 * Authenticated admin queries are NOT used here; the anon key can read
 * destination_url because the admin enters it. If you want to restrict it
 * further, add a separate RLS policy for destination_url or use a DB function.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!slug) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Only attempt DB lookup when Supabase is configured
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("destination_url, published")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!error && data?.destination_url) {
      try {
        const url = new URL(data.destination_url);
        if (url.protocol === "https:" || url.protocol === "http:") {
          return NextResponse.redirect(url.toString(), { status: 302 });
        }
      } catch {
        // Malformed URL stored by admin — fall through to 404
      }
    }
  }

  return new NextResponse("No destination configured for this project.", {
    status: 404,
  });
}
