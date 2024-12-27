import { NextResponse } from "next/server";


export async function GET(){
    //This end point is to retrieve task from supabase
    return NextResponse.json({
        message : "success"
    })
}

export async function POST(){
    //This end point is to create task in supabase
    return NextResponse.json({
        message : "success"
    })
}