
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import Image from "next/image"; // left in for placing a logo instead of text
import Link from "next/link";
import { redirect } from 'next/navigation'
export default async function Protected() {
    const session = await getServerSession(authOptions);
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
                            <Link href="/">
                                My Startup
                            </Link>
                            <h3 className="text-xl font-semibold">Sign In</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                You are succesfully logged in as an {session?.user.user_type}
                            </p>
                        </div>
                        <div className=" grid grid-cols-2 gap-2 p-2">
                            <Button type="button">Go to User account</Button>
                            <Button type="button">Go to Admin</Button>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}