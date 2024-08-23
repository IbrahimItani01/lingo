import { pgTable,serial,text } from "drizzle-orm/pg-core";
// First table for courses
export const courses = pgTable("courses",{
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});