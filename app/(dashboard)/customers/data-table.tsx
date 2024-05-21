'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import UserService from '@/services/users/user.service'
import { useQuery } from 'react-query'
import { DrawerDialogCreateUser } from '@/shared/users/create-user/create-user'
import { customerStore } from '@/store/customers/customer.store'
import toast from 'react-hot-toast'
export default function DataTable() {
    const useCustomerStore = customerStore()
    const { data} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await UserService.getAll().then((res) => res.data)
            useCustomerStore.initCusomer(response)
            return response
        },
    })

    const deleteUser = async (id: number) => {
        const response = await UserService.delete(id)
        if (response.status) {
            toast.success('Utilisateur supprimé')
            useCustomerStore.removeCustomer(id)
        } else {
            toast.error('Une erreur est survenue')
        }
    }
    return (
        <Card x-chunk="dashboard-06-chunk-0" className="h-full">
            <CardHeader>
                <CardTitle className='flex justify-between flex-col md:flex-row space-y-2'>
                    <p>Liste des utilisateurs</p>
                    <DrawerDialogCreateUser>
                        <Button>Ajouter un utilisateur</Button>
                    </DrawerDialogCreateUser>
                </CardTitle>
                <CardDescription>
                    Gérez vos utilisateurs
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Rôle</TableHead>
                            <TableHead>Date d'adhèrence</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            useCustomerStore.customers?.map((user) => (
                                <TableRow>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt="Product image"
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${user.email}`}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{user.role}</Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user.createdAt.toString()}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-haspopup="true"
                                                    size="icon"
                                                    variant="ghost"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => deleteUser(user.id)}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                </div>
            </CardFooter>
        </Card>
    )
}
