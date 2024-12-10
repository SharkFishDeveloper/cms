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
        
        let courses;

        if(user?.role==="instructor"){
            courses = await prisma.course.findMany({
                where:{
                    instructorId:user?.id
                }
            })
            return NextResponse.json({message:"Verifed",status:"200",data:courses})
        }
        else if(user?.role==="instructor"){
            courses = await prisma.course.findMany({});
        }

        if(user){
            return NextResponse.json({message:"Verifed",status:"200",data:courses})
        }else{
            return NextResponse.json({message:"Invalid request",status:"500",error:null})
        }
    } catch (error) {
        return NextResponse.json({message:"Try after some time ",status:"400",error:error})
    }
}