"use client";
import { Button } from '@/components/ui/button';
import { signIn, useSession, signOut } from 'next-auth/react';
import React, { useEffect } from 'react';

const Appbar = () => {
    const { data: session, status } = useSession();

    const handleSubmit = async () => {
        await signIn();
    };

    const setTheUser = async () => {
        try {
            const res = await fetch('/api/operations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: session?.user.id,
                    email: session?.user.email,
                    name: session?.user.name,
                })
            });

            if (!res.ok) {
                console.error("Failed to set user:", await res.text());
            }
        } catch (error) {
            console.error("An error occurred while setting the user:", error);
        }
    };

    useEffect(() => {
        if (session?.user) {
            setTheUser();
        }
    }, [session?.user]);

    return (
        <div className='flex justify-between items-center'>
            <h1>Tasker</h1>
            {session?.user ? (
                <Button onClick={() => signOut()}>Logout</Button>
            ) : (
                <Button onClick={handleSubmit}>Login</Button>
            )}
        </div>
    );
};

export default Appbar;
