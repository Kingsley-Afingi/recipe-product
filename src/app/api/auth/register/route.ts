// import { createClient } from "@/supabase/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { email, password, name } = await req.json();
//   const supabase = await createClient();
//   console.log(email, password, name);
//   try {
//     if (!email || !password || !name) {
//       return NextResponse.json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }

//     let { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           name,
//         },
//       },
//     });

//     if (error || !data.user) {
//       console.error("Supabase signup error:", error);  // 👈 add this
//       return NextResponse.json(
//         {
//           success: false,
//           message: error?.message || "An error occurred",
//         },
//         {
//           status: 400,
//         }
//       );
//     }
//     // const supabase = createClient();
//     // const {data, error}= await supabase
//     // .from("profiles")
//     // ,

//     return NextResponse.json({
//       success: true,
//       message: "User registered successfully",
//       data,
//     });
//   } catch (error) {
//    return NextResponse.json({
//       success: false,
//       message: error instanceof Error ? error.message : "An error occurred",
//     });
//   }
// }


import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  const supabase = await createClient();

  try {
    if (!email || !password || !name) {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Step 1: Sign up user with Supabase Auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !signUpData.user) {
      console.error("Signup error:", signUpError);
      return NextResponse.json(
        {
          success: false,
          message: signUpError?.message || "Signup failed",
        },
        { status: 400 }
      );
    }

    const userId = signUpData.user.id;

    // ✅ Step 2: Insert into 'profiles' table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id: userId, // correct field
          name,
          email,
          image_url: "",
          created_at: new Date(),
        },
      ]);

    if (profileError) {
      console.error("Profile insert error:", profileError);
      return NextResponse.json(
        {
          success: false,
          message: "User created but failed to save profile.",
        },
        { status: 500 }
      );
    }

    // ✅ Step 3: Respond success
    return NextResponse.json({
      success: true,
      message: "User registered successfully",
      user: {
        id: userId,
        email,
        name,
      },
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
