import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const supabase = await createClient();
  console.log(email, password, name);
  try {
    if (!email || !password || !name) {
      return NextResponse.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error || !data.user) {
      console.error("Supabase signup error:", error);  // 👈 add this
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
      message: "User registered successfully",
      data,
    });
  } catch (error) {
   return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    });
  }
}
