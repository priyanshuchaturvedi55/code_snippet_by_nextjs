"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
export const saveSnippet = async (id: number, code: string) => {
    await prisma.snippet.update({
      where: { id },
      data: { code }
    })
    revalidatePath(`/snippet/${id}`);
    redirect(`/snippet/${id}`)  // ✅ Correct use of template literals
}

export const deleteSnippeted = async (id: number) => {
    await prisma.snippet.delete({
      where: { id}
    })
    revalidatePath("/");
    redirect(`/`);
}

export async function createSnippet(prevState:{message:string},formData: FormData) {
       try {
        const title = formData.get('title') ;
        const code = formData.get('code') ;

        if(typeof title != 'string'|| title.length < 3){
          return{message:"title is required and must be longer"}
        }
        if(typeof code != 'string' || code.length < 10){
          return{message:"code is required and must be longer"}
        }

        const snippet = await prisma.snippet.create({
          data:{
            title,
            code
          }
        })
        revalidatePath("/");
        // throw new Error("Oops! Something went wrong.");
        
        
       } catch (error: unknown) {
        if(error instanceof Error){
          return {message:error.message}
        }
        else{
          return {message:"Some internal server error"}
        }
       }
       
        
       
        // redirect
        redirect("/");
    }
