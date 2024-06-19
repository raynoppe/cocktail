import { Folders } from "@/types/pagesFolder";
import { mxrFolderAdd, mxrFolderDelete, mxrFolderGetChildren, mxrFolderUpdate } from "../_lib/folders";
import { use, useContext, useEffect, useState } from "react";
import { Folder, FolderOpen, FolderMinus, FolderPlus, FolderPen, FolderCheck, X, Check } from "lucide-react"
import toast from "react-hot-toast";
import AppContext from "@/components/shared/context";
import { Input } from "@/components/ui/input";

export default function MixerFolderCard(
    {
        folder,
        parent,
    }: {
        folder: Folders,
        parent: string,
    }) {
    const Ctx = useContext(AppContext);

    const [folderDisplayName, setFolderDisplayName] = useState<string>(folder.name);
    const [isActiveFolder, setIsActiveFolder] = useState<boolean>(false);

    const [showSubFolders, setShowSubFolders] = useState<boolean>(false)
    const [folders, setFolders] = useState<Folders[]>([]);
    const getFolders = async (): Promise<void> => {
        const folders: Folders[] = await mxrFolderGetChildren(folder.id);
        setFolders(folders);
    }

    // add / edit folder
    const [folderName, setFolderName] = useState<string>("");
    const [showAddFolder, setShowAddFolder] = useState<boolean>(false);
    const [upsertType, setUpsertType] = useState<string>("add");

    const addFolder = async (): Promise<void> => {
        if (folderName === "") {
            toast.error("Folder Name is required");
            return;
        }
        try {
            if (upsertType === "add") {
                await mxrFolderAdd(folderName, folder.id, 0);
                getFolders();
            } else {
                console.log("addFolderDo", upsertType);
                await mxrFolderUpdate(folder.id, folderName, 0);
                setFolderDisplayName(folderName);
            }
            setFolderName("");
            setShowAddFolder(false);
            toast.success("Folder added");
        } catch (error) {
            toast.error("Error saving folder");
        }

    }

    // delete folder
    const [showDeleteFolder, setShowDeleteFolder] = useState<boolean>(false)
    const deleteFolder = async (): Promise<void> => {
        try {
            await mxrFolderDelete(folder.id);
            setShowDeleteFolder(false);
            Ctx.setReloadFolder(folder.id);
            toast.success("Folder deleted");
        } catch (error) {
            toast.error("Error deleting folder");
        }
    }

    // open folder
    const openFolder = (): void => {
        getFolders();
        setShowSubFolders(true);
    }

    const closeFolder = (): void => {
        setShowSubFolders(false);
    }

    const openFolderPages = (): void => {
        Ctx.setFolderActive(folder.id);
        setIsActiveFolder(true);
        getFolders();
        setShowSubFolders(true);
    }

    useEffect(() => {
        if (Ctx.reloadFolder === folder.id) {
            getFolders();
        }
        if (Ctx.folderActive !== folder.id) {
            setIsActiveFolder(false);
        }
    }, [Ctx.reloadFolder, Ctx.folderActive]);
    return (
        <div className=" my-1">
            <div className={`${isActiveFolder ? "bg-red-100 dark:bg-red-950" : "bg-slate-100 dark:bg-slate-800"} bg-gray-50 p-2 rounded`}>
                <div className=" flex items-center">
                    <div className="tooltip tooltip-right cursor-pointer" data-tip="Open or close a folder">
                        {!showSubFolders && <div onClick={() => { openFolder(); }}>
                            <Folder className="h-6 w-6" />
                        </div>}

                        {showSubFolders && <div onClick={() => { closeFolder(); }}>
                            <FolderOpen className="h-6 w-6" />
                        </div>}
                    </div>
                    <div className=" flex-grow px-3 cursor-pointer" onClick={() => { openFolderPages(); }}>{folderDisplayName}</div>
                    {showDeleteFolder && <div className=" space-x-1">
                        <button onClick={() => { setShowDeleteFolder(false) }}>
                            <X className="h-6 w-6" />
                        </button>
                        <button className=" btn btn-sm btn-error" onClick={() => { deleteFolder() }}>
                            <Check className="h-6 w-6" />
                        </button>
                    </div>}
                    {!showDeleteFolder && <div className=" space-x-1">
                        <button
                            onClick={() => {
                                setUpsertType("edit");
                                setFolderName(folder.name)
                                setShowAddFolder(true);
                            }}>
                            <FolderPen className="h-6 w-6" />
                        </button>
                        <button onClick={() => { setShowDeleteFolder(true) }}>
                            <FolderMinus className="h-6 w-6" />
                        </button>
                        <button onClick={() => { setUpsertType("add"); setShowAddFolder(true) }}>
                            <FolderPlus className="h-6 w-6" />
                        </button>
                    </div>}
                </div>
            </div>
            {showAddFolder && <div className="flex p-2 mx-3 bg-gray-100 dark:bg-slate-800 space-x-2 rounded-b-lg">
                <Input type="text" className=" input input-sm input-bordered flex-grow" value={folderName} onChange={(e) => { setFolderName(e.target.value) }} />
                <button onClick={() => { setShowAddFolder(false); setFolderName(""); }}>
                    <X className="h-6 w-6" />
                </button>
                <button className=" btn btn-primary btn-sm" onClick={addFolder}>
                    <Check className="h-6 w-6" />
                </button>
            </div>}
            <div>
                {showSubFolders && folders.map((r: Folders, i: number) => {
                    return (
                        <div key={r.id} className=" pl-2 space-y-1">
                            <MixerFolderCard folder={r} parent="" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}