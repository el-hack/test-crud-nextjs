import AuthLayout from '@/layouts/auth.layout';
import DashboardLayout from '@/layouts/dashboard.layout';
import QueryLayout from '@/layouts/query.layout';
import React from 'react'

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryLayout>
            <AuthLayout>
                <DashboardLayout>{children}</DashboardLayout>
            </AuthLayout>
        </QueryLayout>
    ) 
}
