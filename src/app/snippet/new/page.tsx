"use client"
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import React, { useActionState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import * as actions from '@/actions'

const Createsnippetpage = () => {
    const [formStateData, xyz] = useActionState(actions.createSnippet, {message:""});
  return (
    <form action={xyz}>
     <div>
      <div>
        <Label>Title</Label>
        <Input type="text" name="title" id="title"/>
    </div>
    <div>
        <Label>Code</Label>
        <Textarea name="code" id="code"/>
    </div>
    {formStateData.message && <div className='p-2 bg-red-300 border-red-600 mt-4'>{formStateData.message}</div>}
    <Button className='my-4'>New</Button>
    </div>

    </form>
    
  )
}

export default Createsnippetpage