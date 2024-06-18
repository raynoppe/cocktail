"use client"
import { ContextProvider } from '@/components/shared/context'
import { ThemeProvider } from '@/components/shared/themeProvider';
import React from 'react'
import { Toaster } from "react-hot-toast";

export function Providers({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <ContextProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            <Toaster position="bottom-left" />
        </ContextProvider>

    )
}