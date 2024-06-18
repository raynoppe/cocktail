import { getServerSession } from "next-auth/next";
import SignOut from "./sign-out";
import { SessionData } from "@/types/account";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { User } from "lucide-react";
import Link from "next/link";


export default async function AuthStatus() {
    const session = await getServerSession() as SessionData;
    return (
        <div className="">
            {session && (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger>
                            <User className="mr-2 h-4 w-4" /> {session.user.name === "" ? session.user.email : session.user.name}</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                <Link href="/account">Switch to user view</Link>
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem><SignOut /></MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

            )}
        </div>
    );
}
