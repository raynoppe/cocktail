"use client"

import Kmodal from "@/components/shared/modal/modalContainer";
import { useState } from "react";
import MixerModalAdd from "../../_components/modalAdd";
import MixerToolBar from "../../_components/toolBar";

export default function PageBuilder() {
    const [modalAddShow, setModalAddShow] = useState(false);
    const ps = {
        "meta": {
            title: "Home",
            description: "This is the home page",
        },
        body: []
    };



    return (
        <>
            <div className="flex h-full w-full">
                <div className=" w-[300px]"><MixerToolBar /></div>
                <div className=" flex-grow">
                    <div className=" bg-slate-50 text-center" onClick={() => { setModalAddShow(true) }}>+</div>
                </div>
            </div>
            {modalAddShow && <Kmodal
                id="modalAdd"
                closeModal={() => { setModalAddShow(false) }}
                body={<MixerModalAdd />}
                header={<div>Add</div>}
                boxClass="w-[400px] h-[400px]"
            />}
        </>
    )
}