'use client'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { setCookie, parseCookies } from 'nookies';
import authConfig  from '@/utils/auth';
import { Rotate3DIcon, RotateCcw } from 'lucide-react';
import { userStore } from '@/store/user/user.store';
import AccountService from '@/services/account/account.service';


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const useUserStore = userStore()
    const pathname = usePathname()
    const [load, setLoad ] = useState(true)
    useEffect(() => {
        const token = parseCookies()[authConfig.storageTokenKeyName]
        console.log('token', )
        if (!token) {
            router.push('/singup')
        } else {
            getProfile()
            setLoad(false)
        }
    }, [])

    const getProfile = async () => {
        const token = parseCookies()[authConfig.storageTokenKeyName]
        const response = await AccountService.getProfile()

        if (response.status) {
            useUserStore.setUser(response.data)
            router.refresh()
        } else {
            setCookie(null, authConfig.storageTokenKeyName, '', { path: '/' })
            router.push('/singup')
        }
    }
    if (load) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Rotate3DIcon className="h-10 w-10 animate-spin" />
            </div>
        )
    }
    return (
        <div>
            {children}
        </div>
    )
}
