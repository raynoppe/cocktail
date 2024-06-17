import { Folders } from "@/types/pagesFolder";
import { mxrFolderAdd, mxrFolderDelete, mxrFolderGetChildren, mxrFolderUpdate } from "../_lib/folders";
import { use, useContext, useEffect, useState } from "react";
import { CheckCircleIcon, FolderIcon, FolderMinusIcon, FolderOpenIcon, FolderPlusIcon, PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import AppContext from "@/components/shared/context";

export default function MixerFolderCard(
    {
        folder,
        parent,
    }: {
        folder: Folders,
        parent: string,
    }) {
    const Ctx = useContext(AppContext);

    const [folderDisplayName, setFolderDisplayName] = useState(folder.name);
    const [isActiveFolder, setIsActiveFolder] = useState(false);

    const [showSubFolders, setShowSubFolders] = useState(false)
    const [folders, setFolders] = useState<Folders[]>([]);
    const getFolders = async () => {
        const folders: Folders[] = await mxrFolderGetChildren(folder.id);
        setFolders(folders);
    }

    // add / edit folder
    const [folderName, setFolderName] = useState("")
    const [showAddFolder, setShowAddFolder] = useState(false)
    const [upsertType, setUpsertType] = useState("add")
    const addFolder = async () => {
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
    const [showDeleteFolder, setShowDeleteFolder] = useState(false)
    const deleteFolder = async () => {
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
    const openFolder = () => {
        getFolders();
        setShowSubFolders(true);
    }

    const closeFolder = () => {
        setShowSubFolders(false);
    }

    const openFolderPages = () => {
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
        <>
            <div className={`${isActiveFolder ? "bg-yellow-100" : "bg-gray-50"} bg-gray-50 p-2 rounded`}>
                <div className=" flex items-center">
                    <div className="tooltip tooltip-right cursor-pointer" data-tip="Open or close a folder">
                        {!showSubFolders && <div onClick={() => { openFolder(); }}>
                            <FolderIcon className="h-5 w-6" />
                        </div>}

                        {showSubFolders && <div onClick={() => { closeFolder(); }}>
                            <FolderOpenIcon className="h-5 w-6" />
                        </div>}
                    </div>
                    <div className=" flex-grow px-3 cursor-pointer" onClick={() => { openFolderPages(); }}>{folderDisplayName}</div>
                    {showDeleteFolder && <div className=" space-x-1">
                        <button className=" btn btn-sm" onClick={() => { setShowDeleteFolder(false) }}>
                            <XCircleIcon className="h-5 w-6" />
                        </button>
                        <button className=" btn btn-sm btn-error" onClick={() => { deleteFolder() }}>
                            <CheckCircleIcon className="h-5 w-6" />
                        </button>
                    </div>}
                    {!showDeleteFolder && <div className=" space-x-1">
                        <button className=" btn btn-sm "
                            onClick={() => {
                                setUpsertType("edit");
                                setFolderName(folder.name)
                                setShowAddFolder(true);
                            }}>
                            <PencilSquareIcon className="h-5 w-6" />
                        </button>
                        <button className=" btn btn-sm " onClick={() => { setShowDeleteFolder(true) }}>
                            <FolderMinusIcon className="h-5 w-6" />
                        </button>
                        <button className=" btn btn-sm " onClick={() => { setUpsertType("add"); setShowAddFolder(true) }}>
                            <FolderPlusIcon className="h-5 w-6" />
                        </button>
                    </div>}
                </div>
            </div>
            {showAddFolder && <div className="flex p-2 bg-gray-100 space-x-2">
                <input type="text" className=" input input-sm input-bordered flex-grow" value={folderName} onChange={(e) => { setFolderName(e.target.value) }} />
                <button className=" btn btn-sm" onClick={() => { setShowAddFolder(false) }}>
                    <XCircleIcon className="h-5 w-6" />
                </button>
                <button className=" btn btn-primary btn-sm" onClick={addFolder}>
                    <CheckCircleIcon className="h-5 w-6" />
                </button>
            </div>}
            <div>
                {showSubFolders && folders.map((r: Folders, i: number) => {
                    return (
                        <div key={r.id} className=" pl-5 space-y-1">
                            <MixerFolderCard folder={r} parent="" />
                        </div>
                    )
                })}
            </div>
        </>
    )
}