import "dotenv/config" ;
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";
import * as schema from "../db/schema";

const sql = neon (process.env.DATABASE_URL!)
const db = drizzle(sql,{schema});
const main = async ()=>{
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
 
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/es.png"
            },
            {
                id: 2,
                title: "German",
                imageSrc: "/de.png"
            },
            {
                id: 3,
                title: "English",
                imageSrc: "/en.png"
            },
            {
                id: 4,
                title: "French",
                imageSrc: "/fr.png"
            },
            {
                id: 5,
                title: "Italian",
                imageSrc: "/it.png"
            },

        ])
        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn Basics of Spanish",
                order:1,
            },
        ])
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order:1,
                title: "Nouns",
            },
            {
                id: 2,
                unitId: 1,
                order:2,
                title: "Verbs",
            }
        ]);
        
        console.log("Seeding Finished");
    }
    catch (error){
        console.error(error);
        throw new Error("Failed to see the database");
    }
}   
main();