"use client"
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CreateCard from "../component/Createcard";
import { CalendarIcon, ExpandIcon, FilterIcon, LayoutGridIcon, ListIcon, ListOrderedIcon, MenuIcon, SearchIcon, SettingsIcon, TimerIcon, UserIcon } from "lucide-react";

export default function Component() {
    const [showCreateCard, setShowCreateCard] = useState(false);

    const handleCreateClick = () => {
        setShowCreateCard(true);
    };

    const handleCloseCreateCard = () => {
        setShowCreateCard(false);
    };

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
                    {/* Sidebar links */}
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
                    <div className="relative flex-1">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search tasks..."
                            className="pl-10 pr-8 rounded-md bg-muted/20 focus:bg-background focus:border-primary focus:ring-primary"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <UserIcon className="w-6 h-6" />
                                <span className="sr-only">User Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button onClick={handleCreateClick}>Create</Button>
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
                                    <DropdownMenuCheckboxItem>Assignee</DropdownMenuCheckboxItem>
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
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assignee</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Finish the marketing report</div>
                                    <div className="text-muted-foreground text-sm">
                                        Prepare the quarterly marketing report for the executive team.
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground">2023-05-15</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">In Progress</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div>John Doe</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <ExpandIcon className="w-5 h-5" />
                                                <span className="sr-only">Task Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Redesign the company website</div>
                                    <div className="text-muted-foreground text-sm">
                                        Update the website with the new branding and design.
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground">2023-06-30</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">In Progress</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                                            <AvatarFallback>JS</AvatarFallback>
                                        </Avatar>
                                        <div>Jane Smith</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <ExpandIcon className="w-5 h-5" />
                                                <span className="sr-only">Task Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Prepare the quarterly financial report</div>
                                    <div className="text-muted-foreground text-sm">
                                        Gather and analyze the financial data for the quarterly report.
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground">2023-07-01</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">Pending</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src="/placeholder-user.jpg" alt="Michael Johnson" />
                                            <AvatarFallback>MJ</AvatarFallback>
                                        </Avatar>
                                        <div>Michael Johnson</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <ExpandIcon className="w-5 h-5" />
                                                <span className="sr-only">Task Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="font-medium">Implement the new CRM system</div>
                                    <div className="text-muted-foreground text-sm">
                                        Set up and configure the new CRM system for the sales team.
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-muted-foreground">2023-08-15</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">In Progress</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src="/placeholder-user.jpg" alt="Sarah Lee" />
                                            <AvatarFallback>SL</AvatarFallback>
                                        </Avatar>
                                        <div>Sarah Lee</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <ExpandIcon className="w-5 h-5" />
                                                <span className="sr-only">Task Actions</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </main>
            </div>
        </div>
    );
}
