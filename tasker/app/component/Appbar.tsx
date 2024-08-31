"use client";
import { Button } from '@/components/ui/button';
import { ThermometerSnowflakeIcon } from 'lucide-react';
import { signIn, useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaTasks } from "react-icons/fa";
const Appbar = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSubmit = async () => {
        await signIn();

    };

    const setTheUser = async () => {
        try {
            const res = await fetch('/api/authentication', {
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

    // useEffect(() => {
    //     if (session?.user) {
    //         setTheUser();
    //         router.push('/dashboard');
    //     }
    // }, [session?.user]);

    return (
        <header className="bg-background w-full py-4 shadow-sm">

            <div className='container flex items-center justify-between px-4 md:px-6'>
                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                    <FaTasks className="h-6 w-6" />
                    <span className="text-lg font-semibold">Tasker</span>
                </Link>
                {session?.user ? (
                    <Button className='rounded-md px-4 py-2 text-sm font-medium' onClick={() => signOut()}>Logout</Button>
                ) : (
                    <Button className='rounded-md px-4 py-2 text-sm font-medium' onClick={handleSubmit}>Login</Button>
                )}
            </div>
        </header>
    );
};

export default Appbar;
