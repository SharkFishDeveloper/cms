import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
      
        const {courseName,thumbnailUrl,description,price,startDate,duration,instructorId}:
              {courseName:string,thumbnailUrl:string,description:string,price:number,startDate:string,duration:number,instructorId:string} = await req.json();

              const newCourse = await prisma.course.create({
                data: {
                  courseName,
                  description,
                  thumbnailUrl,
                  price,
                  startDate,
                  duration,
                  instructorId
                },
              });
          
              console.log(newCourse);
        return NextResponse.json({message:"Course created successfully",status:200})
    } catch (error) {
        return NextResponse.json({message:"Try again later",status:400,error})
    }
}