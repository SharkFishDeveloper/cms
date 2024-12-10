import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {userId,password,role} = await req.json(); 
        const user = await prisma.user.findUnique({
            where:{
                id:userId,
                password,
                role
            }
        })

        if (!user) {
            return NextResponse.json({
                message: "Invalid credentials",
                status: "401",
                role: null,
                data: null,
            });
        }

        let courses;

        if (role === "admin") {
            // Admin: Fetch all courses
            courses = await prisma.course.findMany({
                select:{
                    id:true,
                    instructor:{
                        select:{
                            name:true
                        }
                    },
                    instructorId:true,
                    thumbnailUrl:true,
                    courseName:true,
                    description:true,
                    price:true,
                    duration:true,
                    startDate:true,
                    
                }
            });
        } else if (role === "instructor") {
            // Instructor: Fetch only their courses
            courses = await prisma.course.findMany({
                where: {
                    instructorId: user.id,
                },
                select:{
                    id:true,
                    instructor:{
                        select:{
                            name:true
                        }
                    },
                    instructorId:true,
                    thumbnailUrl:true,
                    courseName:true,
                    description:true,  
                    price:true,
                    duration:true,
                    startDate:true,
                }
            });
        } else {
            return NextResponse.json({
                message: "Unauthorized",
                status: "403",
                role: null,
                data: null,
            });
        }

        return NextResponse.json({
            message: "Verified",
            status: "200",
            role: user.role,
            data: courses,
        });

    } catch (error) {
        return NextResponse.json({message:"Try after some time ",status:"400",error:error})
    }
}