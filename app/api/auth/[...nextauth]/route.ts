"use server"
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/util/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
        const userEmail = user.email as string;
        const userName = user.name as string;

        const existingUser = await prisma.user.findUnique({
            where:{
            email:userEmail
        }})

        if (!existingUser) {
          if (userEmail ) {
            const newUser = await prisma.user.create({
                data:{
                    email:userEmail,
                    name:userName
                }
            })
            user.id = newUser.id;
            user.role = newUser.role;
          }
        } else {
            user.id = existingUser.id;
            user.role = existingUser.role
        }
        // eslint-disable-next-line
      } catch (error) {
        return false;
      }
      return true;
    },

    jwt:({token,user})=>{
        if (user) {
            token.userId = user.id; 
            token.role = user.role;
          }
          return token;
    },  
    session:({session,token})=>{
          if (session.user && typeof token.userId === "string" && typeof token.role === "string") {
            session.user.id = token.userId; 
            session.user.role = token.role;
          }
          return session;
        }
   },
   pages:{
    signIn:"signin",
    error:"../../../autherror"
   }

})

export { handler as POST, handler as GET };