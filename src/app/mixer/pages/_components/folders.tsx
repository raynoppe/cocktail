"use client"

import Kmodal from "@/components/shared/modal/modalContainer"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';
import { mxrFolderAdd, mxrFolderGetAll } from "../_lib/folders";
import { Folders } from "@/types/pagesFolder";
import MixerFolderCard from "./folderCard";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

export default function MixerPagesFolders() {
    const [showModalAddFolder, setShowModalAddFolder] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [folderParent, setFolderParent] = useState("")
    const [folderOrder, setFolderOrder] = useState(0)
    const [folders, setFolders] = useState<Folders[]>([]);

    const getFolders = async () => {
        const folders: Folders[] = await mxrFolderGetAll();
        setFolders(folders);
        console.log(folders);
    }

    const addFolder = (parent: string, order: number) => {
        setFolderParent(parent);
        setFolderOrder(order);
        setShowModalAddFolder(true);
    }

    const addFolderDo = async () => {
        console.log("addFolderDo")
        if (folderName === "") {
            toast.error("Name is required");
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
            <div className="flex flex-col w-full h-full space-y-1">
                <div className=" flex py-1 px-3">
                    <div className=" flex-grow ">Folders</div>
                    <div>
                        <button className=" btn btn-primary btn-sm" onClick={() => { addFolder("", 0) }}>
                            <FolderPlusIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                {folders.map((r: Folders, i: number) => {
                    return (
                        <>
                            <MixerFolderCard key={r.id} folder={r} parent="" />
                        </>
                    )
                })}
            </div>
            {showModalAddFolder && <Kmodal
                id="modalAddFolder"
                closeModal={() => { setShowModalAddFolder(false) }}
                body={<div>
                    <label className="input input-bordered flex items-center gap-2">
                        Name
                        <input type="text" className="grow input" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setFolderName((e.target as HTMLInputElement).value) }} />
                    </label>
                </div>}
                boxClass="w-[400px] h-[200px]"
                header={<div>Add Folder</div>}
                footer={
                    <div className=" flex">
                        <div className=" flex-grow"></div>
                        <div>
                            <button onClick={() => { setShowModalAddFolder(false) }} className=" btn btn-cancel p-2">Cancel</button>
                            <button onClick={() => { addFolderDo() }} className=" btn btn-primary p-2">Save</button>
                        </div>
                    </div>
                }
            />}
        </>
    )
}