
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import Image from "next/image"; // left in for placing a logo instead of text
import Link from "next/link";
import { redirect } from 'next/navigation'
export default async function Protected() {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session) {
        redirect("/login")
        return
    }

    if (session.user.user_type === 'user') {
        redirect("/account")
        return
    }

    return (
        <>
            <>
                <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-6 pt-8 text-center sm:px-16">
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                You are succesfully logged in as an {session?.user.user_type}
                            </p>
                        </div>
                        <div className=" p-4 text-center space-y-4">
                            <p><Link href="/account">Go to User account</Link></p>
                            <p><Link href="/mixer">Go to Admin</Link></p>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}