
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const supabase = await createClient();
  
  // this is the starting of the search params
  const {searchParams}= new URL(req.url);
  const q= searchParams.get("q");
  //worked on this .order("created_at")
  let query = supabase.from("recipes").select("*").order("created_at", {
    ascending: false
  })
  if (q){
    query= query.ilike("name",`%${q}%`)
  }

  const {data:recipes,error} = await query 
  // this is the ending of the serachParams 


  // const { data: recipes, error } = await supabase.from("recipes").select("*");
  if (error || !recipes) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

console.log(recipes)
  return NextResponse.json({
    success: true,
    message: "recipe fetched successfully",
    data: recipes,
    
  });     
                    
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  try {
    const recipeData = await request.json();
    console.log(recipeData);
             
    const { data, error } = await supabase
      .from("recipes")
      .insert([recipeData])
      .select("*")
      .single();

    
    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "recipe created successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}