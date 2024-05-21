'use client'
import React from 'react'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
export default function QueryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // retry: false,
                // refetchOnWindowFocus: false,
            },
        },
    });
  return (
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
  )
}
