import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const { title, desc, createdAt, reminder, userId, isCompleted } = await req.json();
        const createdAtDate = new Date(createdAt);
        const reminderDate = new Date(reminder);

        if (isNaN(createdAtDate.getTime()) || isNaN(reminderDate.getTime())) {
            throw new Error("Invalid date format");
        }
        const res = await prisma.tasks.create({
            data: {
                title,
                desc,
                createdAt: createdAtDate,
                reminder: reminderDate,
                isCompleted: false,
                userId
            }
        });

        console.log("Task Created:", res);

        return NextResponse.json({
            message: "Task Created Successfully"
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error in creating the task:", error);

        return NextResponse.json({
            message: "Error in creating the task"
        }, {
            status: 500
        });
    }
}

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    console.log("Called ALLL")
    if (!userId) {
        return NextResponse.json({
            message: "User ID is required"
        }, {
            status: 400
        });
    }

    try {
        const tasks = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                task: true
            }
        });

        return NextResponse.json({
            message: "All tasks fetched successfully",
            tasks
        }, {
            status: 200
        });

    } catch (error) {
        return NextResponse.json({
            message: "Error in fetching all the data"
        }, {
            status: 403
        });
    }
}

// Updating 
export async function PUT(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    const taskId = req.nextUrl.searchParams.get('taskId');
    console.log("Called ALLL 3")
    try {
        const task = await prisma.user.update({
            where: {
                id: userId ?? ""
            },
            data: {
                task: {
                    update: {
                        where: {
                            id: taskId ?? ""
                        },
                        data: {
                            isCompleted: true,
                        },
                    }
                }
            },
            include: {
                task: true
            }
        })

        return NextResponse.json({
            message: "This is my updated task", task
        }, {
            status: 200
        })


    } catch (error) {
        NextResponse.json({
            message: "Error in updating the task"
        }, {
            status: 502
        })
    }
}

// Deleting 
export async function DELETE(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    const taskId = req.nextUrl.searchParams.get('taskId');
    try {
        const tasks = await prisma.user.update({
            where: {
                id: userId ?? ""
            },
            data: {
                task: {
                    delete: {
                        id: taskId ?? ""
                    }
                }
            },
            include: {
                task: true
            }
        })
        return NextResponse.json({
            message: "Task Deleted", tasks
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in Deleting "
        }, {
            status: 504
        })
    }
}