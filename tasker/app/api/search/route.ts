import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");
    const { title } = await req.json();
    console.log(title);
    try {
        const tasks = await prisma.tasks.findMany({
            where: {
                OR: [
                    {
                        id: userId ?? "",
                    },
                    {
                        title: {
                            contains: title,
                            mode: "insensitive",
                        },
                    },
                ],
            },
            include: {
                User: true,
            },
        });

        return NextResponse.json(
            {
                message: "Searched value",
                tasks,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error in finding tasks:", error);

        return NextResponse.json(
            {
                message: "Error in finding tasks",
            },
            {
                status: 504,
            }
        );
    }
}
