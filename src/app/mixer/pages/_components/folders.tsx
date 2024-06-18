"use client"

import Kmodal from "@/components/shared/modal/modalContainer"
import { useEffect, useState } from "react"
import { mxrFolderAdd, mxrFolderGetAll } from "../_lib/folders";
import { Folders } from "@/types/pagesFolder";
import MixerFolderCard from "./folderCard";
import { FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"

export default function MixerPagesFolders() {
    const [showModalAddFolder, setShowModalAddFolder] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [folderParent, setFolderParent] = useState("")
    const [folderOrder, setFolderOrder] = useState(0)
    const [folders, setFolders] = useState<Folders[]>([]);
    const { toast } = useToast()

    const getFolders = async () => {
        const folders: Folders[] = await mxrFolderGetAll();
        setFolders(folders);
        console.log(folders);
    }

    const addFolder = (parent: string, order: number) => {
        setFolderParent(parent);
        setFolderOrder(order);
        setShowModalAddFolder(true);
        toast({
            description: "Folder added",
        })
    }

    const addFolderDo = async () => {
        console.log("addFolderDo")
        if (folderName === "") {
            toast({
                variant: "destructive",
                description: "Name is required",
            })
            return;
        }
        const newFolder = await mxrFolderAdd(folderName, folderParent, folderOrder);
        getFolders();
        setShowModalAddFolder(false);
    }

    useEffect(() => {
        getFolders();
    }, []);
    return (
        <>
            <div className="flex flex-col w-full h-full space-y-1 border border-solid border-slate-200 dark:border-slate-500 rounded-lg">
                <div className=" flex py-2 px-3 bg-slate-100 dark:bg-slate-900 rounded-t-lg items-center">
                    <div className=" flex-grow ">Folders</div>
                    <div>
                        <Button variant={'outline'} size={'sm'} onClick={() => { addFolder("", 0) }}>
                            <FolderPlus className="h-5 w-5 mr-2" /> Add
                        </Button>
                    </div>
                </div>
                {folders.length === 0 && <div className=" p-5">
                    No folders found
                </div>}
                <div className=" h-full flex-grow rounded-b-lg p-2">
                    {folders.map((r: Folders, i: number) => {
                        return (
                            <>
                                <MixerFolderCard key={r.id} folder={r} parent="" />
                            </>
                        )
                    })}
                </div>

            </div>
            {showModalAddFolder && <Kmodal
                id="modalAddFolder"
                closeModal={() => { setShowModalAddFolder(false) }}
                body={<div>
                    <label className="flex items-center gap-2 dark:text-slate-300">
                        Name
                        <Input type="text" className="grow" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFolderName((e.target as HTMLInputElement).value) }} />
                    </label>
                </div>}
                boxClass="w-[400px] h-[200px]"
                header={<div className=" ">Add Folder</div>}
                footer={
                    <div className=" flex ">
                        <div className=" flex-grow"></div>
                        <div className=" space-x-3">
                            <Button variant={'outline'} size={'sm'} onClick={() => { setShowModalAddFolder(false) }} className=" p-2 w-[100px]">Cancel</Button>
                            <Button variant={'secondary'} size={'sm'} onClick={() => { addFolderDo() }} className=" p-2 w-[100px]">Save</Button>
                        </div>
                    </div>
                }
            />}
        </>
    )
}