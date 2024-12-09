
import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try {
        const {id}:{id:string}  = await req.json();
        const data = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                role:true
            }
        })
        return NextResponse.json({message:data,status:"200",error:null})
    } catch (error) {
        console.log(JSON.stringify(error))
        return NextResponse.json({message:"Invalid request",status:"400",error:error});
    }
}