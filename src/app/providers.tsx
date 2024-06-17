"use client"
import { ContextProvider } from '@/components/shared/context'
import React from 'react'
import { Toaster } from "react-hot-toast";

export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <ContextProvider>
            {children}
            <Toaster position="bottom-left" />
        </ContextProvider>

    )
}