import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from 'usehooks-ts'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Controller, useForm } from "react-hook-form"
import { CreateUserDto } from "@/services/users/dto/create-user.dto"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import UserService from "@/services/users/user.service"
import toast from "react-hot-toast"
import { RotateCcw } from "lucide-react"
import { Alert } from "@/components/ui/alert"
import { useState } from "react"
import { customerStore } from "@/store/customers/customer.store"
import { UserType } from "@/services/users/types/response.type"

export function DrawerDialogCreateUser({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")



    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ajouter un utilisateur</DialogTitle>
                        <DialogDescription>
                            Ajoutez un utilisateur a votre base de donnée
                        </DialogDescription>
                    </DialogHeader>
                    <CreateUserForm setOpen={setOpen} className="" />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Ajouter un utilisateur</DrawerTitle>
                    <DrawerDescription>
                        Ajoutez un utilisateur a votre base de donnée
                    </DrawerDescription>
                </DrawerHeader>
                <CreateUserForm className="px-4" setOpen={setOpen} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function CreateUserForm({ className, setOpen, values }: { className: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, values?: UserType }) {
    const [response, setResponse] = useState('')
    const useCustomerStore = customerStore()
    // zod validation with useForm
    const defaultValues: CreateUserDto = {
        email: values?.email ?? "",
        name: values?.name ?? "",
    }

    const schema = z.object({
        email: z.string().email({ message: "Email invalide" }),
        name: z.string().min(1, { message: "Ce champ est requis" }),
    })

    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserDto>({
        defaultValues,
        resolver: zodResolver(schema),
    });

    async function onSubmit(data: CreateUserDto) {
        await UserService.create(data).then((res) => {
            if (res.status) {
                toast.success("Utilisateur creé avec succès")
                useCustomerStore.addCustomer(res.data!)
                setOpen(false)
            } else {
                setResponse(res.message)
            }

        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("grid items-start gap-4", className)}>
            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            {...field}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                )}
            />
            <Controller
                control={control}
                name="name"
                render={({ field }) => (
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" defaultValue="@shadcn"
                            {...field}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                    </div>
                )}
            />
            {response ?? <Alert>{response}</Alert>}
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <RotateCcw size={16} /> : null}
                Enregistrer</Button>
        </form>
    )
}
