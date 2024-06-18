"use client"
import AppContext from "@/components/shared/context";
import { Page } from "@/types/pagesFolder";
import { useContext, useEffect, useState } from "react";

export default function MixerPages() {
    const Ctx = useContext(AppContext);
    const [pages, setPages] = useState<Page[]>([]);
    const [showModalAddPage, setShowModalAddPage] = useState(false)

    useEffect(() => {
        console.log("Ctx.folderActive", Ctx.folderActive);
    }, [Ctx.folderActive]);
    return (
        <div className="flex flex-col w-full h-full space-y-1 border border-solid border-slate-200 dark:border-slate-500 rounded-lg">

        </div>
    )
}