"use client"
import { ContextProvider } from '@/components/shared/context'
import React from 'react'
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from 'next-themes'

export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ContextProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>{children}</ThemeProvider>


            <Toaster position="bottom-left" />
        </ContextProvider>
    )
}