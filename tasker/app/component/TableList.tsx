import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ExpandIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const TableList = ({ items }: any) => {
    const session = useSession();
    const userId = session.data?.user.id;
    const deleteTheTask = async (e: string) => {
        try {

            const res = await fetch(`/api/create?userId=${userId}&taskId=${e}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await res.json();
            toast('Task Deleted Successfully...')
            console.log(data);
        }
        catch (error) {
            console.log("Error in fetching:", error);
        }

    }

    const updateTheTask = async (e: string) => {
        try {

            const res = await fetch(`/api/create?userId=${userId}&taskId=${e}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await res.json();
            toast('Task Completed Successfully...')

            console.log(data);
        }
        catch (error) {
            console.log("Error in fetching:", error);
        }
    }
    // useEffect(() => {
    //     // updateTheTask();
    // }, [items])
    return (
        <TableBody>
            <TableRow>
                <TableCell>
                    <div className="font-medium">{items.title}</div>
                    <div className="text-muted-foreground text-sm">
                        {items.desc}
                    </div>
                </TableCell>
                <TableCell>
                    <div className="text-muted-foreground">{items.createdAt}</div>
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">{items.isCompleted === false ? "Not Completed" : "Completed"}</Badge>
                </TableCell>
                <TableCell>
                    <div className="text-muted-foreground">{items.reminder}</div>
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
                            <DropdownMenuItem onClick={() => deleteTheTask(items.id)}>Delete</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateTheTask(items.id)}>Mark as Complete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

        </TableBody>
    )
}

export default TableList
