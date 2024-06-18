"use client"
import React from "react";
import Image from "next/image";
export default function Kmodal(props: React.PropsWithChildren<{
    id: string,
    boxClass?: string,
    bodyClass?: string,
    footerClass?: string,
    closeModal: Function,
    header?: any
    body: any
    footer?: any
    hideCloseButton?: boolean
}>) {
    const { id, closeModal } = props;
    let useClassBox = ""; if (props.boxClass) { useClassBox = props.boxClass }
    let useClassBody = ""; if (props.bodyClass) { useClassBody = props.bodyClass }
    let useClassFooter = ""; if (props.footerClass) { useClassFooter = props.footerClass }
    // h-[calc(100%-126px)]  sm:h-[calc(100%-102px)]
    return (
        <div id={id} className=" fixed z-50 top-0 bottom-0 left-0 right-0 bg-black bg-opacity-40 backdrop-blur-sm flex flex-col items-center justify-center p-5">
            <div className={`bg-white dark:bg-slate-900 text-gray-700 shadow-[0_35px_40px_15px_rgba(0,0,0,0.5)] rounded-lg animate-slide-top flex flex-col ${useClassBox}`}>
                {props.header && <div className="  dark:text-slate-300 border-b border-solid border-gray-200 dark:border-gray-700 py-2 px-4 rounded-t-lg flex items-center">
                    <div className="flex-grow">{props.header}</div>
                    {!props.hideCloseButton && <div>
                        <button onClick={() => { closeModal() }} className="p-0 m-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>}
                </div>}
                <div className={`py-2 px-4 flex-grow overflow-y-auto ${useClassBody}`}>{props.body}</div>
                {props.footer && <div className={`rounded-b-lg py-2 px-4 border-t border-solid border-gray-200 dark:border-gray-700  ${useClassFooter}`}>{props.footer}</div>}
            </div>
        </div>
    )
}