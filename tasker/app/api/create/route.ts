import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    try {
        const { title, desc, createdAt, reminder } = await req.json();
        const res = await prisma.tasks.create({
            data: {
                title,
                desc,
                createdAt,
                reminder
            }
        })
        return NextResponse.json({
            message: "Task Created SuccessFully"
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            message: "Error in creating the task"
        }, {
            status: 404

        })
    }
}