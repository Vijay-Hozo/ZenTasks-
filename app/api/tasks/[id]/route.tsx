import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

export async function GET(
    //This end point is to retrieve task from supabase
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq('id', params.id)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "success", data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req:NextRequest,{params}:{params:{id:string}}){
    //This end point is to update task in supabase
    const supabase = createClient();
    const {title,description,status} = await req.json();
    try{
        const { data,error } = await supabase
        .from('tasks')
        .update({title,description,status})
        .eq('id',params.id)
        if(error){
            throw error
        }
        return NextResponse.json({message:"Task updated successfully"},{status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }
}

export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
    //This end point is to delete task from supabase
    const supabase = createClient();
    try{
        const { data,error } = await supabase
        .from('tasks')
        .delete()
        .eq('id',params.id)
        if(error){
            throw error
        }
        return NextResponse.json({message:"Task deleted successfully"},{status:200})
    }
    catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }
}
