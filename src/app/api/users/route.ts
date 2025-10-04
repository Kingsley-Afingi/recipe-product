
// import { createClient } from "@/authlib/client";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const supabase = createClient();

//   const { data, error } = await supabase.auth.admin.listUsers();
//   if (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ success: true, users: data.users });
// }


import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ use service role key
  );

  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ users: data.users });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
