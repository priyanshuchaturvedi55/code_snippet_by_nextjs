import { deleteSnippeted } from '@/actions';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import React from 'react'

const SnippetDetailePage = async ({
    params,
}:{
    params: Promise<{id:string}>;
}) => {
    const id = parseInt((await params).id);


    await new Promise((r) => setTimeout(r, 2000));

    
    const snippet = await prisma.snippet.findUnique({
        where:{
            id
        }
    })
    
    if(!snippet){
       return <div>Snippet not found</div>
    }
    const deleteSnippet = deleteSnippeted.bind(null, snippet.id);

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
            <h1 className='font-bold text-xl'>{snippet.title}</h1>
            <div className='flex items-center gap-2'>
                <Link href={`/snippet/${snippet.id}/edit`}> <Button>Edit</Button> </Link>
                <form action={deleteSnippet}><Button variant={"destructive"} type='submit' >Delete</Button></form>
                
            </div>
        </div>
        <pre className='p-4 bg-gray-200 rounded border-gray-300'>
            <code>{snippet.code}</code>
        </pre>
    </div>
  )
}

export default SnippetDetailePage


export const generateStaticParams = async () => {
    const snippets = await prisma.snippet.findMany();
    return snippets.map((snippet)=>{
        return {id: snippet.id.toString()}
    })
}