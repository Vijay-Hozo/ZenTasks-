import { NextResponse } from "next/server";

export async function GET(){
    //This end point is to retrieve specific task from supabase
    return NextResponse.json({
        message : "success"
    })
}

export async function PUT(){
    //This end point is to update specific task in supabase
    return NextResponse.json({
        message : "success"
    })
}

export async function DELETE(){
    //This end point is to delete specific task from supabase
    return NextResponse.json({
        message : "success"
    })
}