import db from "@/db/drizzle"
import { challengeOptions } from "@/db/schema"
import { isAdmin } from "@/lib/auth";
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

export const GET = async (req: Request,{params}:{params:{challengeId:number}})=>{
    
    if(!isAdmin()){
        return new NextResponse("Unauthorized",{status: 403})
    }
    
    const data = await db.query.challengeOptions.findFirst({
        where: eq(challengeOptions.id,params.challengeId),
    });
    return NextResponse.json(data);
}
export const PUT = async (req: Request,{params}:{params:{challengeId:number}})=>{
    
    if(!isAdmin()){
        return new NextResponse("Unauthorized",{status: 403})
    }
    const body = await req.json();
     // If the body contains a new id, handle it separately
     if (body.id) {
        // Update all fields except the ID first
        const { id, ...updatedBody } = body;

        // Update the other fields first
        const data = await db.update(challengeOptions)
            .set({ ...updatedBody })
            .where(eq(challengeOptions.id, params.challengeId))
            .returning();

        // Now update the id, if needed
        await db.update(challengeOptions)
            .set({ id: body.id })
            .where(eq(challengeOptions.id, params.challengeId));

        return NextResponse.json({ ...data[0], id: body.id });
    } 
    // Normal update if id is not part of the update
    const data = await db.update(challengeOptions)
        .set({ ...body })
        .where(eq(challengeOptions.id, params.challengeId))
        .returning();

    return NextResponse.json(data[0]);
 
}
export const DELETE = async (req: Request,{params}:{params:{challengeId:number}})=>{
    
    if(!isAdmin()){
        return new NextResponse("Unauthorized",{status: 403})
    }
    const data = await db.delete(challengeOptions).where(eq(challengeOptions.id,params.challengeId)).returning();
    return NextResponse.json(data[0]);
}