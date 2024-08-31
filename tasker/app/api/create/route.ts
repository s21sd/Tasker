import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

const prisma = new PrismaClient();
// export async function POST(req: NextRequest) {
//     try {
//         const { title, desc, createdAt, reminder, userId } = await req.json();
//         console.log("Received Data:", title, desc, createdAt, reminder);
//         const createdAtDate = new Date(createdAt);  // Attempt to convert to Date object
//         const reminderDate = new Date(reminder);

//         if (isNaN(createdAtDate.getTime()) || isNaN(reminderDate.getTime())) {
//             throw new Error("Invalid date format");
//         }
//         const res = await prisma.tasks.create({
//             data: {
//                 title,
//                 desc,
//                 createdAt: createdAtDate,
//                 reminder: reminderDate,
//                 userId
//             }
//         });

//         console.log("Task Created:", res);

//         return NextResponse.json({
//             message: "Task Created Successfully"
//         }, {
//             status: 200
//         });
//     } catch (error) {
//         console.error("Error in creating the task:", error);

//         return NextResponse.json({
//             message: "Error in creating the task"
//         }, {
//             status: 500
//         });
//     }
// }

// export async function GET(req: NextRequest) {
//     const { userId } = await req.json();
//     try {
//         const tasks = await prisma.user.findMany({
//             where: {
//                 id: userId
//             },
//             include: {
//                 task: true
//             }
//         })
//         return NextResponse.json({
//             message: "All the tasks fetched SuccessFully ", tasks
//         }, {
//             status: 200
//         })

//     } catch (error) {
//         return NextResponse.json({
//             message: "Error in fetching all the data"
//         }, {
//             status: 403
//         })
//     }
// }

// // Updating 
// export async function PUT(req: NextRequest) {
//     const { userId, taskId } = await req.json();
//     try {
//         const task = await prisma.user.update({
//             where: {
//                 id: userId
//             },
//             data: {
//                 task: {
//                     update: {
//                         where: {
//                             id: taskId
//                         },
//                         data: {
//                             title: 'My updated title',
//                         },
//                     }
//                 }
//             },
//             include: {
//                 task: true
//             }
//         })

//         return NextResponse.json({
//             message: "This is my updated task", task
//         }, {
//             status: 200
//         })


//     } catch (error) {
//         NextResponse.json({
//             message: "Error in updating the task"
//         }, {
//             status: 502
//         })
//     }
// }

// Deleting 
export async function DELETE(req: NextRequest) {
    // const { userId, taskId } = await req.json();
    // console.log(userId, "    ", taskId);
    try {
        const tasks = await prisma.user.update({
            where: {
                id: '103473812922276765854'
            },
            data: {
                task: {
                    delete: {
                        id: '077bc6ff-2cdc-472d-a779-b0d836c95a29'
                    }
                }
            },
            include: {
                task: true
            }
        })
        return NextResponse.json({
            message: "This is my updated task", tasks
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