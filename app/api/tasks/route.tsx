import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/client'


export async function GET(req: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status'); 

  try {
    let query = supabase.from('tasks').select('*');

    if (status) {
      query = query.eq('status', status); 
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ data, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
    //This end point is to create task in supabase
    const supabase = createClient()
    const { title, description, status = 'pending', created_at } = await req.json()
  
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
  
    try {
      const { data, error } = await supabase
        .from('tasks') 
        .insert([{ title, description, status, created_at }])
  
      if (error) {
        throw error
      }
  
      return NextResponse.json({
        message: 'Task created successfully',
        data,
        status : 200
      })
    } catch (error:any) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  }