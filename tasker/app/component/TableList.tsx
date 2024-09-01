import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ExpandIcon } from 'lucide-react'
import React from 'react'

const TableList = ({ items }: any) => {
    console.log(items)
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
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>

        </TableBody>
    )
}

export default TableList
