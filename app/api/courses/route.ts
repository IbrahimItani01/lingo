import { NextResponse } from "next/server";
import { courses } from "@/db/schema";
import db from "@/db/drizzle";
import { isAdmin } from "@/lib/auth";

export const GET = async ()=>{
    if(!isAdmin()){
        return new NextResponse("Unauthorized",{status:401});
    }
    const data = await db.query.courses.findMany();
    return NextResponse.json(data);
}