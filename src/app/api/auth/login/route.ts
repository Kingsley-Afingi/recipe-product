
// import { createClient } from "@/lib/supabase/server";
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, } = await req.json();
  const supabase = await createClient();
  console.log(email, password);
  try {
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    let { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "An error occurred",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User login successfully",
      data,
    });
  } catch (error) {
    NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
}
