"use server"

import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const id:string  = await req.json();
        if (!id) {
            // Ensure that an id was provided
            return NextResponse.json({
                message: "Missing user id",
                status: "400",
                error: "User id is required"
            });
        }
        const data = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                role:true
            }
        })
        console.log(data)
        return NextResponse.json({message:data,status:"200",error:null})
    } catch (error) {
        console.log(JSON.stringify(error))
        return NextResponse.json({message:"Invalid request",status:"400",error:error});
    }
}