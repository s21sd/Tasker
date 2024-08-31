import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(req: NextRequest) {

    try {
        const { id, email, name } = await req.json();
        console.log(id, email, name);
        const user = await prisma.user.create({
            data: {
                id,
                email,
                name
            }
        })
        return NextResponse.json({
            message: "User Created Successfully"
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message: "Error in creating the user "
        }, {
            status: 404
        })
    }
}
