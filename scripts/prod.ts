import "dotenv/config";
import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

import * as schema from  "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle (sql,{schema});

const main  = async ()=>{
    try{
        console.log("Seeding the db");

        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengeOptions),
            db.delete(schema.userSubscription),
        ]);

        // insert courses
        const courses = await db
        .insert(schema.courses)
        .values([
            {title:"Spanish",imageSrc:"/es.png"},
            {title:"French",imageSrc:"/fr.png"},
            {title:"German",imageSrc:"/de.png"},
            {title:"English",imageSrc:"/en.png"},
            {title:"Italian",imageSrc:"/it.png"},
        ]).returning();

        // for each course, insert units
        for(const course of courses){
            const units = await db
            .insert(schema.units)
            .values([
                {
                    courseId: course.id,
                    title: "Unit 1",
                    description: `Learn the basics of ${course.title}`,
                    order: 1,
                },
                {
                    courseId: course.id,
                    title: "Unit 2",
                    description: `Learn intermediate ${course.title}`,
                    order: 2,
                },
            ]).returning();
            // for each unit, insert lessons
            for(const unit of units){
                const lessons = await db
                .insert(schema.lessons)
                .values([
                    {unitId: unit.id, title:"Nouns",order:1},
                    {unitId: unit.id, title:"Verbs",order:2},
                    {unitId: unit.id, title:"Adjectives",order:3},
                    {unitId: unit.id, title:"Phrases",order:4},
                    {unitId: unit.id, title:"Sentences",order:5},
                ]).returning();
                // for each lesson insert challenges
                for(const lesson of lessons){
                    const challenges = await db
                    .insert(schema.challenges)
                    .values([
                        {
                          lessonId: lesson.id,
                          type:"SELECT",
                          question:'Which one of these is "the man"?',
                          order:1,
                        },
                        {
                            lessonId: lesson.id,
                            type:"SELECT",
                            question:'Which one of these is "the woman"?',
                            order:2,
                        },
                        {
                            lessonId: lesson.id,
                            type:"SELECT",
                            question:'Which one of these is "the boy"?',
                            order:3,
                        },
                        {
                            lessonId: lesson.id,
                            type:"ASSIST",
                            question:'"the boy"',
                            order:4,
                        },
                        {
                            lessonId: lesson.id,
                            type:"SELECT",
                            question:'Which one of these is "the robot"?',
                            order:5,
                        },
                    ]).returning();
                    // for each challenge, insert challenge options
                    for (const challenge of challenges){
                        if(challenge.order === 1){
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el hombre",
                                    imageSrc: "/man.png",
                                    audioSrc:"/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    imageSrc: "/woman.png",
                                    audioSrc:"/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el zombie",
                                    imageSrc: "/zombie.png",
                                    audioSrc:"/es_zombie.mp3",
                                },
                            ]);
                        }
                        if(challenge.order === 2){
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "la mujer",
                                    imageSrc: "/woman.png",
                                    audioSrc:"/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/man.png",
                                    audioSrc:"/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el zombie",
                                    imageSrc: "/zombie.png",
                                    audioSrc:"/es_zombie.mp3",
                                },
                            ]);
                        }
                        if(challenge.order === 3){
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el chico",
                                    imageSrc: "/boy.png",
                                    audioSrc:"/es_boy.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    imageSrc: "/woman.png",
                                    audioSrc:"/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/man.png",
                                    audioSrc:"/es_man.mp3",
                                },
                            ]);
                        }
                        if(challenge.order === 4){
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    audioSrc:"/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    audioSrc:"/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el chico",
                                    audioSrc:"/es_boy.mp3",
                                },
                            ]);
                        }
                        if(challenge.order === 5){
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el zombie",
                                    imageSrc: "/zombie.png",
                                    audioSrc:"/es_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/man.png",
                                    audioSrc:"/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el robot",
                                    imageSrc: "/robot.png",
                                    audioSrc:"/es_robot.mp3",
                                },
                            ]);
                        }
                    }
                }
            }
        }
        console.log("seeding completed");;
       
    }
    catch{
        throw new Error("Error seeding production data");
    }
};
void main();
