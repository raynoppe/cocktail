import AuthStatus from "@/components/shared/auth-status";
import { ModeToggle } from "@/components/shared/themeToggle";
import Link from "next/link";

export default function MixerNavBar() {
    return (
        <div className=" flex p-2 border-b items-center space-x-4 h-[60px]">
            <div className=" text-3xl font-mono px-5">Cocktail</div>
            <div className=" flex-grow space-x-3">
                <Link href="/mixer/pages">Pages</Link>
                <Link href="/mixer/users">Users</Link>
            </div>
            <div>
                <AuthStatus />
            </div>
            <div>
                <ModeToggle />
            </div>
        </div>
    )
}