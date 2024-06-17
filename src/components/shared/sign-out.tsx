"use client";
import { signOut } from "next-auth/react";

export default function SignOut() {
    return (
        <button
            className="text-slate-300 hover:text-stone-200 transition-all"
            onClick={() => signOut()}
        >
            Sign me out!
        </button>
    );
}
