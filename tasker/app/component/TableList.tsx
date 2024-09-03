import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ExpandIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import Updatecard from './Updatecard';
import { useRecoilState } from 'recoil';
import { updateTheVal } from '../recoil/atoms';

interface Item {
    id: string;
    title: string;
    desc: string;
    createdAt: string;
    isCompleted: boolean;
    reminder: string;
}

interface TableListProps {
    items: Item;
}

const TableList: React.FC<TableListProps> = ({ items }) => {
    const session = useSession();
    const userId = session.data?.user.id;
    const [showCreateCard, setShowCreateCard] = useState(false);
    const [val, setVal] = useRecoilState(updateTheVal);

    const incrementValue = () => {
        setVal((prevVal: any) => prevVal + 1);
    };
    const handleCreateClick = () => {
        setShowCreateCard(true);
    };

    const handleCloseCreateCard = () => {
        setShowCreateCard(false);
    };

    const deleteTheTask = async (taskId: string) => {
        try {
            const res = await fetch(`/api/create?userId=${userId}&taskId=${taskId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to delete the task');
            }

            const data = await res.json();
            toast('Task Deleted Successfully');
            incrementValue();
        } catch (error) {
            console.log('Error in deleting the task:', error);
        }
    };

    const updateTheTask = async (taskId: string) => {
        try {
            const res = await fetch(`/api/create?userId=${userId}&taskId=${taskId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to update the task');
            }

            const data = await res.json();
            toast('Task Completed Successfully');
            incrementValue()
        } catch (error) {
            console.log('Error in updating the task:', error);
        }
    };

    return (
        <>
            {showCreateCard && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <Updatecard items={items} onClose={handleCloseCreateCard} />
                </div>
            )}
            {!showCreateCard && (
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="font-medium">{items.title}</div>
                            <div className="text-muted-foreground text-sm">{items.desc}</div>
                        </TableCell>
                        <TableCell>
                            <div className="text-muted-foreground">
                                {new Date(items.createdAt).toLocaleString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge className={`${items.isCompleted ? 'bg-green-400' : ''}`} variant="secondary">
                                {items.isCompleted ? 'Completed' : 'Not Completed'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="text-muted-foreground">
                                {new Date(items.reminder).toLocaleString()}
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
                                    <DropdownMenuItem onClick={handleCreateClick}>Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => deleteTheTask(items.id)}>
                                        Delete
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTheTask(items.id)}>
                                        Mark as Complete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody >
            )}
        </>
    );
};

export default TableList;
