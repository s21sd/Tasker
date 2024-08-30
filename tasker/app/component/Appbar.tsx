"use client"
import { Button } from '@/components/ui/button'
import { signIn, useSession, signOut } from 'next-auth/react'
import React from 'react'

const Appbar = () => {
    const session = useSession();
    // console.log(session.data?.user);
    return (
        <div className='flex  justify-between items-center'>
            <h1>Takser</h1>
            {session.data?.user ? <Button onClick={() => signOut()}>Logout</Button> : <Button onClick={() => signIn()}>Login</Button>

            }
        </div>
    )
}

export default Appbar
