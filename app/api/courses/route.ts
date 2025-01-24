import prisma from "@/util/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const courses = await prisma.course.findMany({});
        const stringCourses = JSON.stringify(courses);
        return NextResponse.json({message:"Success",status:200,courses:stringCourses})
    } catch (error) {
        console.log(JSON.stringify(error))
        return NextResponse.json({message:"Try again later",status:400,error})
    }
}