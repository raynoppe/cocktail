"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
    return (
        <Button
            className=" w-full"
            onClick={() => signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" />Sign out!
        </Button>
    );
}
