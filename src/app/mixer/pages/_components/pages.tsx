"use client"
import AppContext from "@/components/shared/context";
import { Page } from "@/types/pagesFolder";
import { useContext, useState } from "react";

export default function MixerPages() {
    const Ctx = useContext(AppContext);
    const [pages, setPages] = useState<Page[]>([]);
    return (
        <div>
            <div>Pages</div>
        </div>
    )
}