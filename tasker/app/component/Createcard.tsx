"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { toast } from "sonner"

import { X } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useSession } from "next-auth/react";

export default function CreateCard({ onClose }: any) {
    const session = useSession();
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const userId = session.data?.user.id;
    // Get the current date and time in ISO format
    const createdDate = new Date().toISOString();

    // Handle task creation
    const createTask = async () => {
        if (!title || !desc || !selectedDate) {
            alert("Please fill in all fields before creating a task.");
            return;
        }
        try {
            const res = await fetch("/api/create", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    desc,
                    createdAt: createdDate,
                    reminder: selectedDate.toISOString(),
                    isCompleted: false,
                    userId,
                }),
            });

            if (res.ok) {
                toast("Task created successfully!");
                setTitle("");
                setDesc("");
                setSelectedDate(undefined);
                onClose();
            } else {
                console.log("Error creating task:", res.statusText);
            }
        } catch (error: any) {
            console.log("Error in creating the task", error.message);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto py-10 px-6 md:px-8">
            <div className="flex flex-col items-center gap-8">
                <Card className="w-full">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>New Task</CardTitle>
                                <CardDescription>Fill out the form to create a new task.</CardDescription>
                            </div>
                            <div className=" cursor-pointer" onClick={onClose}>
                                <X />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                value={title}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter task description"
                                className="min-h-[100px]"
                                value={desc}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="reminder">Reminder</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-start font-normal">
                                        {selectedDate ? selectedDate.toLocaleDateString() : "Pick a date and time"}
                                        <div className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button onClick={createTask}>Create Task</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
