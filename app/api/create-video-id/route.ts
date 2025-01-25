import prisma from "@/util/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {   
        const url = process.env.S3;
        const { courseId,
            s3,videoId}:{ courseId: string, s3: string[] ,videoId:string} = await req.json();

            const linksWithUrl = Object.keys(s3).reduce((acc, quality) => {
                //@ts-expect-error: s3[quality] is a string
                acc[quality] = `${url}/${s3[quality]}`; 
                return acc;
            }, {} as Record<string, string>);
    
            const videoLinksArray = {
                id:videoId,
                links: linksWithUrl
            };
            await prisma.course.update({
                where: {
                    id: courseId,
                },
                data: {
                   videoLinks:{
                    create:{
                        id:videoLinksArray.id,
                        links:videoLinksArray.links,
                    }
                   }
                },
            });

        return NextResponse.json({ message: "Course created successfully", status: 200 })
    } catch (error) {
        console.log(JSON.stringify(error))
        return NextResponse.json({ message: "Try again later", status: 400, error })
    }
}