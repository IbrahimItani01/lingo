import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { userProgress, courses, units, challengeOptions, challengeProgress, lessons } from "./schema";
import {eq} from "drizzle-orm";
export const getUserProgress = cache(async ()=>{
    const {userId} = await auth();
    if(!userId) 
        {
            return null;
        }
    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId,userId),
        with: {
            activeCourse: true,
        },
    });
    return data;
    
})
export const getUnits = cache(async ()=>{
    const {userId} = await auth();
    const userProgress = await getUserProgress();
    if(!userId || !userProgress?.activeCourseId){
        return [];
    }
    // TODO: Confirm wether order is needed
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with:{
                    challenges: {
                        with: {
                            challengeProgress:{
                                where: eq(challengeProgress.userId, userId,)
                            },
                        },
                    }
                }
            }

        },
    });
    const normalizedData = data.map((unit)=>{
        const lessonsWithCompletedStatus = unit.lessons.map((lesson)=>{
            const allCompletedChallenges = lesson.challenges.every((challenge)=>{
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress)=> progress.completed);
            })
            return{...lesson,completed:allCompletedChallenges}
        });
        return {...unit, lessons: lessonsWithCompletedStatus}
    });
    return normalizedData
})
export const getCourses = cache(async ()=>{
    const data = await db.query.courses.findMany();
    return data;
})

export const getCourseById = cache(async (courseID: number)=>{
    const data = await db.query.courses.findFirst({
        where: eq(courses.id,courseID),
        // TODO: Populate units and lessons
    })
    return data;
})

export const getCourseProgress = cache(async ()=>{
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId)
    {
        return null;
    }
    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units,{asc})=> [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons:{
                orderBy:(lessons,{asc}) => [asc(lessons.order)],
                with:{
                    unit: true,
                    challenges:{
                        with:{
                            challengeProgress:{
                                where: eq(challengeProgress.userId,userId),
                            }
                        }
                    }
                }
            }
        }
    })
    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit)=> unit.lessons)
    .find((lesson)=>{
        return lesson.challenges.some((challenge)=>{
            return !challenge.challengeProgress || challenge.challengeProgress.length === 0; 
        })
    })
    return{
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    }
})

