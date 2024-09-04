"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import CreateCard from "../component/Createcard";
import { CalendarIcon, FilterIcon, LayoutGridIcon, ListIcon, ListOrderedIcon, MenuIcon, SearchIcon, SettingsIcon, TimerIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import TableList from "../component/TableList";
import { useRecoilValue } from "recoil";
import { updateTheVal } from "../recoil/atoms";
export default function Component() {
    const session = useSession();
    const userId = session.data?.user.id;
    const [tasks, setTasks] = useState([]);
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [searchTask, setsearchMyTasks] = useState([]);
    const [searchtitle, setSearchTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const myval = useRecoilValue(updateTheVal);
    const handleCreateClick = () => {
        setShowCreateCard(true);
    };

    const handleCloseCreateCard = () => {
        setShowCreateCard(false);
    };
    const sendEmail = async () => {
        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const getAllTheTask = async () => {
        try {
            const res = await fetch(`/api/create?userId=${userId}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await res.json();
            setTasks(data.tasks[0].task);
            // console.log(data.tasks[0].task);
        } catch (error) {
            console.log("Error in fetching")
        }
    }

    const getSearchTask = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/search?userId=${userId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: searchtitle
                })
            })
            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }
            const data = await res.json();
            setsearchMyTasks(data.tasks);
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.log("Error in fetching", error)
        }
    }

    useEffect(() => {
        getAllTheTask();
    }, [userId])
    useEffect(() => {
        getAllTheTask();
    }, [myval])


    return (
        <div className={`flex min-h-screen w-full ${showCreateCard ? "backdrop-blur-sm" : ""}`}>
            {showCreateCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <CreateCard onClose={handleCloseCreateCard} />
                </div>
            )}
            <aside className="bg-background border-r border-muted-foreground/10 hidden md:flex flex-col w-64 p-6 gap-4">
                <Link href="#" className="flex items-center gap-2 font-bold text-lg" prefetch={false}>
                    <TimerIcon className="w-6 h-6" />
                    Task Manager
                </Link>
                <nav className="flex flex-col gap-2">

                    <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground" prefetch={false}>
                        <ListIcon className="w-5 h-5" />
                        Tasks
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground" prefetch={false}>
                        <LayoutGridIcon className="w-5 h-5" />
                        Projects
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground" prefetch={false}>
                        <CalendarIcon className="w-5 h-5" />
                        Calendar
                    </Link>
                    <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground" prefetch={false}>
                        <SettingsIcon className="w-5 h-5" />
                        Settings
                    </Link>
                </nav>
            </aside>
            <div className="flex-1 flex flex-col">
                <header className="bg-background border-b border-muted-foreground/10 p-4 md:p-6 flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <MenuIcon className="w-6 h-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    <div className="flex justify-between items-center w-[90%]">
                        <div className="flex justify-center items-center w-[90%]">

                            <Input
                                value={searchtitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                type="search"
                                placeholder="Search tasks..."
                                className="rounded-md bg-muted/20 focus:bg-background focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <Button onClick={getSearchTask} variant="default">Search</Button>
                    </div>
                    <Button onClick={handleCreateClick}>Create</Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <UserIcon className="w-6 h-6" />
                                <span className="sr-only">User Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Sunny</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold">Tasks</h1>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <FilterIcon className="w-4 h-4 mr-2" />
                                        Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>Due Date</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Status</DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>Reminder</DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <ListOrderedIcon className="w-4 h-4 mr-2" />
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value="dueDate">
                                        <DropdownMenuRadioItem value="dueDate">Due Date</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="status">Status</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="assignee">Assignee</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>


                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Reminder</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        {
                            searchTask.length > 0 && searchtitle ?

                                searchTask && searchTask.map((items: any, index: number) => {
                                    return <TableList key={index} items={items} />
                                }) :
                                tasks && tasks.map((items: any, index: number) => {
                                    return <TableList key={index} items={items} />
                                })

                        }

                    </Table>

                </main>
            </div>
        </div>
    );
}
