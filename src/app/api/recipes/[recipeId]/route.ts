// Get Single Product
import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: Promise<{ recipeId: string }>;
}

export async function GET(req: NextRequest, { params }: Params) {
  const supabase = await createClient();
  const { recipeId } = await params;

  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", recipeId)
    .single();

  if (error || !recipe) {
    return NextResponse.json({ error: error?.message }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    message: "Product fetched successfully",
    data: recipe,
    
  });
}

// Update recipe
export async function PATCH(req: NextRequest, { params }: Params) {
  const supabase = await createClient();
  const { recipeId } = await params;

  try {
    const recipeData = await req.json();

    const { data, error } = await supabase
      .from("recipes")
      .update(recipeData)
      .eq("id", recipeId)
      .select("*")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "recipe updated successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// i will do for put
export async function PUT(req: NextRequest, { params }: Params) {
  const supabase = await createClient();
  const { recipeId } = await params;

  try {
    const recipeData = await req.json();

    const { data, error } = await supabase
      .from("recipes")
      .update(recipeData)
      .eq("id", recipeId)
      .select("*")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: error?.message }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "All recipes updated successfully",
      data: data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 



// Delete Product
type params={
  params:{
    recipeId:string;
  }
}
export async function DELETE(req: NextRequest, { params }: Params) {
  const supabase = await createClient();
  const { recipeId } = await params;

  try {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", recipeId);

    if (error) {
      return NextResponse.json({ error: error?.message }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "recipe deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
