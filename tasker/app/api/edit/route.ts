import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const { title, desc, createdAt, reminder, isCompleted } = await req.json();
    const userId = req.nextUrl.searchParams.get('userId');
    const taskId = req.nextUrl.searchParams.get('taskId');
    // const userId = "112785832293460884546";
    // const taskId="49efd309-b8de-48cf-874e-914edacf4bb6"
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
                            title: title,
                            desc: desc,
                            isCompleted: isCompleted,
                            createdAt: createdAt,
                            reminder: reminder
                        },
                    }
                }
            },
            include: {
                task: true
            }
        })
        return NextResponse.json({
            message: "Task Updated Successfully"
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in updating "
        }, {
            status: 504
        })
    }
}