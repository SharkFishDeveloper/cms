import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
      
        const {courseName,thumbnailUrl,description,price,startDate,duration,instructorId}:
              {courseName:string,thumbnailUrl:string,description:string,price:string,startDate:string,duration:string,instructorId:string} = await req.json();

              await prisma.course.create({
                data: {
                  courseName,
                  description,
                  thumbnailUrl,
                  price:parseInt(price),
                  startDate,
                  duration:parseInt(duration),
                  instructorId
                },
              });
          
        return NextResponse.json({message:"Course created successfully",status:200})
    } catch (error) {
        console.log(JSON.stringify(error))
        return NextResponse.json({message:"Try again later",status:400,error})
    }
}