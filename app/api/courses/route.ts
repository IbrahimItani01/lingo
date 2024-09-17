import { NextResponse } from "next/server";
import { courses } from "@/db/schema";
import db from "@/db/drizzle";

export const GET = async ()=>{
    const data = await db.query.courses.findMany();
    return NextResponse.json(data);
}